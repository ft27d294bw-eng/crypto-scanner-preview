'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {setTimeout:delay}=require('node:timers/promises');
const net=require('node:net');
const path=require('node:path');
const root=path.join(__dirname,'..');
const getPort=()=>new Promise((resolve,reject)=>{
 const s=net.createServer();s.once('error',reject);s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});
});
test('staging preview serves screens while closing account endpoints',async()=>{
 const port=await getPort();
 const proc=spawn(process.execPath,['server.js'],{cwd:root,env:{...process.env,PORT:String(port),NODE_ENV:'production',PUBLIC_PREVIEW:'1',AUTH_DEV_VERIFY:'0'},stdio:'pipe'});
 try{
  let ready=false;
  for(let i=0;i<50;i++){
    if(proc.exitCode!==null)throw Error('server exited early');
    try{const r=await fetch(`http://127.0.0.1:${port}/healthz`);if(r.ok){ready=true;break;}}catch{}
    await delay(60);
  }
  assert.ok(ready,'server must become healthy');
  const base=`http://127.0.0.1:${port}`;
  const cfg=await fetch(base+'/api/config').then(r=>r.json());
  assert.equal(cfg.publicPreview,true);assert.equal(cfg.accountsEnabled,false);
  const home=await fetch(base+'/');assert.equal(home.status,200);assert.match(await home.text(),/Crypto Scanner/);
  assert.match(home.headers.get('content-security-policy'),/default-src/);
  const js=await fetch(base+'/preview-banner.js');assert.equal(js.status,200);
  const register=await fetch(base+'/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'someone@example.com',password:'somepassword123'})});
  assert.equal(register.status,503);
  const me=await fetch(base+'/api/auth/me');assert.equal(me.status,503);
  const postIndex=await fetch(base+'/',{method:'POST'});assert.equal(postIndex.status,405);
 }finally{proc.kill('SIGTERM');}
});
