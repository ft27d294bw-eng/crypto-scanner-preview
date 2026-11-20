'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {aggregate, normalizeQuote, ASSETS, numberOrNull}=require('../lib/scanner');

test('only tracked spot USDT quotes are accepted',()=>{
  const good=normalizeQuote('Binance',{bid:'90',ask:'91',bidQty:'12',askQty:'13'},'BTCUSDT');
  assert.deepEqual(good,{exchange:'Binance',bid:90,ask:91,bidQty:12,askQty:13});
  assert.equal(normalizeQuote('Binance',{bid:'90',ask:'91'},'BTCBTC'),null);
  assert.equal(normalizeQuote('Binance',{bid:'92',ask:'91'},'BTCUSDT'),null);
});
test('zero or absent book sizes are handled without pretending liquidity',()=>{
  assert.equal(numberOrNull(''),null);
  assert.equal(numberOrNull('0'),0);
  assert.equal(numberOrNull('negative'),null);
  const quote=normalizeQuote('OKX',{bid:'1',ask:'1.01'},'XRPUSDT');
  assert.equal(quote.askQty,null);
});
test('aggregation reports partial sources and only valid pairs',()=>{
  const q=normalizeQuote('Bybit',{bid:'100',ask:'101',bidQty:'1',askQty:'2'},'BTCUSDT');
  const snap=aggregate([{name:'Binance',quotes:null,error:'HTTP 403'},{name:'Bybit',quotes:[{symbol:'BTCUSDT',quote:q}]},{name:'OKX',quotes:[]},{name:'MEXC',quotes:[]}],'2026-11-20T00:00:00.000Z');
  assert.equal(snap.status,'partial');
  assert.equal(snap.availableCount,1);
  assert.equal(snap.pairs.length,1);
  assert.equal(snap.pairs[0].symbol,'BTC');
  assert.equal(snap.sources[0].error,'HTTP 403');
  assert.ok(ASSETS.length>=20);
});
test('aggregation reports unavailable for failed exchange feeds',()=>{
  const snap=aggregate([{name:'Binance',quotes:null},{name:'Bybit',quotes:null},{name:'OKX',quotes:null},{name:'MEXC',quotes:null}]);
  assert.equal(snap.status,'unavailable');
  assert.equal(snap.availableCount,0);
  assert.equal(snap.pairs.length,0);
});
