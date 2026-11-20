'use strict';
const test=require('node:test'), assert=require('node:assert/strict');
const {crossRate,convert,variation}=require('../public/fx-engine');
test('USD to yuan uses real base-USD cross mechanics, not inverted',()=>{
 const rates={USD:1,CNY:7.24,EUR:.86,PLN:3.67};
 assert.equal(crossRate(rates,'USD','CNY'),7.24);
 assert.equal(convert(100,rates,'USD','CNY'),724);
 assert.ok(Math.abs(crossRate(rates,'CNY','USD')-1/7.24)<1e-12);
 assert.ok(Math.abs(crossRate(rates,'EUR','CNY')-7.24/.86)<1e-12);
});
test('Data quality: no phantom rates, negative values or invalid amounts',()=>{
 const rates={USD:1,CNY:7.24,PLN:0};
 assert.equal(crossRate(rates,'USD','GBP'),null);
 assert.equal(crossRate(rates,'USD','PLN'),null);
 assert.equal(convert(-12,rates,'USD','CNY'),null);
 assert.equal(convert(1e15,rates,'USD','CNY'),null);
});
test('Reference-rate direction change uses prior date snapshot',()=>{
 const a={USD:1,CNY:7.24};const b={USD:1,CNY:7.2};
 assert.ok(variation(a,b,'USD','CNY')>0);
 assert.ok(variation(a,b,'CNY','USD')<0);
 assert.equal(variation(a,null,'USD','CNY'),null);
});
