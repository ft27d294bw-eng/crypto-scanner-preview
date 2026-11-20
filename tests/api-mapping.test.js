'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {getSnapshot}=require('../lib/scanner');

test('normalize four public spot API response shapes into comparable quotes', async()=>{
  const original=global.fetch;
  const fixture={
    binance:[{symbol:'BTCUSDT',bidPrice:'99.8',bidQty:'2',askPrice:'100',askQty:'3'}],
    bybit:{retCode:0,result:{list:[{symbol:'BTCUSDT',bid1Price:'100.3',bid1Size:'4',ask1Price:'100.5',ask1Size:'5'}]}},
    okx:{code:'0',data:[{instId:'BTC-USDT',bidPx:'100.4',bidSz:'6',askPx:'100.6',askSz:'7'}]},
    mexc:[{symbol:'BTCUSDT',bidPrice:'100.7',bidQty:'8',askPrice:'100.9',askQty:'9'}]
  };
  global.fetch=async url=>{
    let key=url.includes('binance')?'binance':url.includes('bybit')?'bybit':url.includes('okx')?'okx':'mexc';
    return {ok:true,json:async()=>fixture[key]};
  };
  try {
    const snap=await getSnapshot(true);
    assert.equal(snap.status,'ok');
    assert.equal(snap.availableCount,4);
    assert.equal(snap.pairs.length,1);
    assert.equal(snap.pairs[0].quotes.length,4);
    assert.deepEqual(snap.pairs[0].quotes.map(q=>q.exchange),['Binance','Bybit','OKX','MEXC']);
    assert.deepEqual(snap.pairs[0].quotes.map(q=>q.ask),[100,100.5,100.6,100.9]);
    assert.deepEqual(snap.pairs[0].quotes.map(q=>q.bidQty),[2,4,6,8]);
  } finally {global.fetch=original;}
});
