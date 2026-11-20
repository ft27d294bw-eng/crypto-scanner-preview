'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {mkdtempSync,rmSync}=require('node:fs');
const os=require('node:os');
const path=require('node:path');
process.env.AUTH_DATA_DIR=mkdtempSync(path.join(os.tmpdir(),'scanner-auth-test-'));
const auth=require('../lib/auth');
test('account passwords are salted and hashed with scrypt',()=>{
 const p='AsecurePassword2026';const h1=auth.hashPass(p);const h2=auth.hashPass(p);
 assert.notEqual(h1,h2);assert.ok(auth.verifyPass(p,h1));assert.ok(!auth.verifyPass('wrong',h1));
 assert.ok(!h1.includes(p));
});
test('avatar rejects script data, incorrect magic bytes and oversized images',()=>{
 assert.equal(auth.validAvatar(null),null);
 assert.throws(()=>auth.validAvatar('data:image/svg+xml;base64,PHN2Zz4='));
 assert.throws(()=>auth.validAvatar('data:image/png;base64,'+Buffer.alloc(123).toString('base64')));
 assert.throws(()=>auth.validAvatar('data:image/jpeg;base64,'+Buffer.alloc(220_000).toString('base64')));
});
test.after(()=>{auth.db.close();rmSync(process.env.AUTH_DATA_DIR,{recursive:true,force:true});});
