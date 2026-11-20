'use strict';
// Self-hosted email/password accounts. Node.js 22+ built-in SQLite, scrypt and HTTP-only cookies.
const { DatabaseSync } = require('node:sqlite');
const { randomBytes, createHash, scryptSync, timingSafeEqual } = require('node:crypto');
const path = require('node:path');
const fs = require('node:fs');
const dataDir = process.env.AUTH_DATA_DIR || path.resolve(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive:true, mode:0o700 });
const db = new DatabaseSync(path.join(dataDir,'users.sqlite'));
db.exec(`PRAGMA journal_mode=WAL;
  CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, verified INTEGER NOT NULL DEFAULT 0, name TEXT NOT NULL, handle TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', avatar_color TEXT NOT NULL DEFAULT 'violet', avatar_image TEXT, created_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS verifications (user_id TEXT PRIMARY KEY REFERENCES users(id), hash TEXT UNIQUE NOT NULL, expires_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL);
  CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);`);
const sha = s => createHash('sha256').update(s).digest('hex');
const now = () => Date.now();
const limits = new Map();
function checkLimit(req, bucket, max=12, windowMs=15*60_000){
  const ip = req.socket.remoteAddress || 'unknown'; // behind a trusted proxy use validated client IP instead
  const key = `${bucket}:${ip}`; const v = limits.get(key)||{until:now()+windowMs,count:0};
  if (now()>v.until){v.until=now()+windowMs;v.count=0;}
  v.count++;limits.set(key,v);return v.count<=max;
}
function json(res, status, obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(obj));}
async function body(req){
  if(!req.headers['content-type']?.startsWith('application/json')) throw Object.assign(new Error('JSON required'),{status:415});
  let s='';for await(const chunk of req){s+=chunk;if(s.length>500_000)throw Object.assign(new Error('Body too large'),{status:413});}
  try{return JSON.parse(s);}catch{throw Object.assign(new Error('Invalid JSON'),{status:400});}
}
function hashPass(pass, salt=randomBytes(16).toString('hex')){return `${salt}:${scryptSync(pass,salt,64).toString('hex')}`;}
function verifyPass(pass, stored){try{const [salt,key]=stored.split(':');const a=Buffer.from(key,'hex');const b=scryptSync(pass,salt,a.length);return timingSafeEqual(a,b);}catch{return false;}}
function publicUser(row){return row?{id:row.id,email:row.email,name:row.name,handle:row.handle,bio:row.bio,avatar:row.avatar_color,avatarImage:row.avatar_image||null,verified:!!row.verified}:null;}
function currentUser(req){const token=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('cs_session='))?.slice('cs_session='.length);
  if(!token||!/^[a-f0-9]{64}$/.test(token))return null;
  const row=db.prepare('SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE sessions.hash=? AND sessions.expires_at>?').get(sha(token),now());
  return row||null;
}
function validAvatar(data){if(data===null || data===undefined||data==='')return null;
  if(typeof data!=='string'||data.length>290_000)throw Object.assign(new Error('Avatar is too large'),{status:400});
  const m=data.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
  if(!m)throw Object.assign(new Error('Invalid image format'),{status:400});
  const b=Buffer.from(m[2],'base64');if(b.length>210_000||b.length<100)throw Object.assign(new Error('Invalid image size'),{status:400});
  const png=b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpg=b[0]===255&&b[1]===216&&b[2]===255;
  const webp=b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP';
  if(!(m[1]==='png'&&png||m[1]==='jpeg'&&jpg||m[1]==='webp'&&webp))throw Object.assign(new Error('Invalid image data'),{status:400});
  return data;
}
async function sendVerification(email,token,req){
  const origin=process.env.APP_ORIGIN || `http://localhost:${process.env.PORT||3000}`;
  const url=`${origin.replace(/\/$/,'')}/api/auth/verify?token=${token}`;
  if(process.env.AUTH_DEV_VERIFY==='1' && process.env.NODE_ENV!=='production'){
    console.log(`\n[DEV ONLY] Verification for ${email}: ${url}\n`);return;
  }
  if(!process.env.RESEND_API_KEY||!process.env.AUTH_FROM_EMAIL) throw Object.assign(new Error('Email delivery is not configured. Set RESEND_API_KEY and AUTH_FROM_EMAIL.'),{status:503});
  const r=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(9000),headers:{'Authorization':`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.AUTH_FROM_EMAIL,to:[email],subject:'Verify your Crypto Scanner account',html:`<p>Confirm your email address:</p><p><a href="${url}">Verify my email</a></p><p>Link expires in 24 hours.</p>`})});
  if(!r.ok)throw Object.assign(new Error('Email could not be delivered. Check email provider configuration.'),{status:503});
}
function cookie(res,token,req){const isSecure=(process.env.APP_ORIGIN||'').startsWith('https://') || process.env.NODE_ENV==='production';
  res.setHeader('Set-Cookie',`cs_session=${token||''}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${token?1209600:0}${isSecure?'; Secure':''}`);
}
async function handle(req,res,pathname,search){
  res.setHeader('X-Frame-Options','DENY');
  if(req.method==='GET'&&pathname==='/api/auth/me')return json(res,200,{user:publicUser(currentUser(req))});
  if(req.method==='GET'&&pathname==='/api/auth/verify'){
    const token=search.get('token')||'';
    if(!/^[a-f0-9]{64}$/.test(token)){res.writeHead(302,{Location:'/?verification=invalid'});return res.end();}
    const row=db.prepare('SELECT user_id FROM verifications WHERE hash=? AND expires_at>?').get(sha(token),now());
    if(!row){res.writeHead(302,{Location:'/?verification=expired'});return res.end();}
    db.prepare('UPDATE users SET verified=1 WHERE id=?').run(row.user_id);
    db.prepare('DELETE FROM verifications WHERE user_id=?').run(row.user_id);
    res.writeHead(302,{Location:'/?verification=success'});return res.end();
  }
  if(req.method!=='POST')return json(res,405,{error:'Method not allowed'});
  // Same-origin JSON request + SameSite cookies prevent common cross-site writes.
  const origin=req.headers.origin;
  if(origin){const host=req.headers.host;let originHost;try{originHost=new URL(origin).host;}catch{}if(originHost!==host)return json(res,403,{error:'Origin mismatch'});}
  if(!checkLimit(req,pathname,pathname==='/api/auth/login'?24:12))return json(res,429,{error:'Too many requests. Try again later.'});
  try{
    if(pathname==='/api/auth/logout'){
      const token=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('cs_session='))?.slice(11);
      if(token)db.prepare('DELETE FROM sessions WHERE hash=?').run(sha(token));
      cookie(res,null,req);return json(res,200,{ok:true});
    }
    const p=await body(req);
    if(pathname==='/api/auth/register'){
      const email=String(p.email||'').trim().toLowerCase(),password=String(p.password||'');
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return json(res,400,{error:'Enter a valid email address.'});
      if(password.length<10||Buffer.byteLength(password)>256)return json(res,400,{error:'Password must be at least 10 characters.'});
      if(!process.env.RESEND_API_KEY&&process.env.AUTH_DEV_VERIFY!=='1')return json(res,503,{error:'Email service is not configured on this server.'});
      if(db.prepare('SELECT id FROM users WHERE email=?').get(email))return json(res,409,{error:'This email is already registered.'});
      const id=randomBytes(16).toString('hex'),token=randomBytes(32).toString('hex');
      db.prepare('INSERT INTO users (id,email,password_hash,name,handle,created_at) VALUES (?,?,?,?,?,?)').run(id,email,hashPass(password),'Crypto Explorer','explorer_'+id.slice(0,6),now());
      db.prepare('INSERT INTO verifications (user_id,hash,expires_at) VALUES(?,?,?)').run(id,sha(token),now()+24*3600_000);
      try{await sendVerification(email,token,req);}catch(e){db.prepare('DELETE FROM verifications WHERE user_id=?').run(id);db.prepare('DELETE FROM users WHERE id=?').run(id);throw e;}
      return json(res,201,{ok:true,message:'Check your email to verify the account before logging in.'});
    }
    if(pathname==='/api/auth/login'){
      const email=String(p.email||'').trim().toLowerCase(),pass=String(p.password||'');
      const row=db.prepare('SELECT * FROM users WHERE email=?').get(email);
      // Equalize work for unknown emails.
      if(!verifyPass(pass,row?.password_hash||'00000000000000000000000000000000:'+Buffer.alloc(64).toString('hex'))||!row)return json(res,401,{error:'Invalid email or password.'});
      if(!row.verified)return json(res,403,{error:'Verify your email first.'});
      const token=randomBytes(32).toString('hex');
      db.prepare('INSERT INTO sessions(hash,user_id,expires_at) VALUES(?,?,?)').run(sha(token),row.id,now()+14*86400_000);
      cookie(res,token,req);return json(res,200,{user:publicUser(row)});
    }
    if(pathname==='/api/auth/profile'){
      const row=currentUser(req);if(!row)return json(res,401,{error:'Please sign in.'});
      const name=String(p.name||'').trim().slice(0,32),handle=String(p.handle||'').trim(),bio=String(p.bio||'').trim().slice(0,160);
      if(!name||!/^[a-zA-Z0-9_]{3,24}$/.test(handle))return json(res,400,{error:'Invalid name or username.'});
      const avatarColor=['violet','mint','blue','amber','rose'].includes(p.avatar)?p.avatar:'violet';
      let avatarImage=row.avatar_image;
      if(Object.hasOwn(p,'avatarImage'))avatarImage=validAvatar(p.avatarImage);
      db.prepare('UPDATE users SET name=?,handle=?,bio=?,avatar_color=?,avatar_image=? WHERE id=?').run(name,handle,bio,avatarColor,avatarImage,row.id);
      return json(res,200,{user:publicUser(currentUser(req))});
    }
    return json(res,404,{error:'Unknown endpoint'});
  }catch(e){return json(res,e.status||500,{error:e.status?e.message:'Server error'});}
}
module.exports={handle,verifyPass,hashPass,validAvatar,db};
