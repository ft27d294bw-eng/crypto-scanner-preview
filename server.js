'use strict';
// Zero-dependency development / local server. Run: npm start
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const api = require('./api/scan');
// A public preview deliberately does NOT initialize the account database.
const PUBLIC_PREVIEW = process.env.PUBLIC_PREVIEW === '1';
if (process.env.NODE_ENV === 'production' && !PUBLIC_PREVIEW) {
  const required = ['APP_ORIGIN', 'RESEND_API_KEY', 'AUTH_FROM_EMAIL', 'AUTH_DATA_DIR'];
  const missing = required.filter(key => !process.env[key]);
  if (process.env.ACCOUNTS_ENABLED !== '1' || missing.length ||
      !process.env.APP_ORIGIN?.startsWith('https://') ||
      !path.isAbsolute(process.env.AUTH_DATA_DIR || '') ||
      process.env.AUTH_DEV_VERIFY === '1') {
    throw new Error('Production account backend is disabled until HTTPS, persistent storage, verified email, and explicit opt-in are configured. Use PUBLIC_PREVIEW=1 for a public read-only preview.');
  }
}
const auth = PUBLIC_PREVIEW ? null : require('./lib/auth');
const {getMarkets}=require('./lib/markets');
const PORT = Number(process.env.PORT || 3000);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png'
};
http.createServer(async (req, res) => {
  const parsed=new URL(req.url,'http://localhost');
  const pathname=parsed.pathname;
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; font-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
  if (process.env.NODE_ENV === 'production') res.setHeader('Strict-Transport-Security','max-age=31536000');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(pathname === '/healthz') {
    res.writeHead(200, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
    return res.end(JSON.stringify({ok:true,app:'crypto-scanner',mode:PUBLIC_PREVIEW?'public-preview':'local-or-production'}));
  }
  if(pathname === '/api/config') {
    res.writeHead(200, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
    return res.end(JSON.stringify({publicPreview:PUBLIC_PREVIEW,accountsEnabled:!PUBLIC_PREVIEW}));
  }
  if(pathname.startsWith('/api/auth/')) {
    if (PUBLIC_PREVIEW) {
      res.writeHead(503, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
      return res.end(JSON.stringify({error:'Email accounts are disabled in the public preview. Profiles remain on your device.'}));
    }
    return auth.handle(req,res,pathname,parsed.searchParams);
  }
  if(pathname==='/api/markets'){
    if(req.method!=='GET'){res.writeHead(405);return res.end();}
    try{const data=await getMarkets();res.writeHead(data.status==='ok'?200:503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});return res.end(JSON.stringify(data));}
    catch{res.writeHead(503,{'Content-Type':'application/json'});return res.end(JSON.stringify({status:'unavailable',fx:[],metals:[]}));}
  }
  if (pathname === '/api/scan') {
    res.status = code => { res.statusCode = code; return res; };
    res.json = value => { res.end(JSON.stringify(value)); return res; };
    return api(req, res);
  }
  if(req.method !== 'GET' && req.method !== 'HEAD') {res.setHeader('Allow','GET, HEAD');res.writeHead(405);return res.end();}
  const target = pathname === '/' ? '/index.html' : pathname;
  const full = path.resolve(__dirname, 'public', '.' + target);
  const base = path.resolve(__dirname, 'public');
  if (!full.startsWith(base + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.setHeader('Content-Type', MIME[path.extname(full)] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if(req.method==='HEAD')return res.end();
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`Crypto Scanner: http://localhost:${PORT}`));
