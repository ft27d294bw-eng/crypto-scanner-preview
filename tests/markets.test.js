'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {quote,buildFx,buildFxUniverse,normalizeV2History,normalizeMetals,FX_LIST}=require('../lib/markets');
test('FX cross rates are correctly constructed from USD base',()=>{
 const rates={EUR:.86,PLN:3.65,GBP:.75,JPY:151,CHF:.81,UAH:42,TRY:43,CAD:1.36,AUD:1.5};
 assert.equal(quote(rates,'USD','PLN'),3.65);
 assert.ok(Math.abs(quote(rates,'EUR','USD')-1/.86)<1e-12);
 assert.ok(Math.abs(quote(rates,'EUR','PLN')-3.65/.86)<1e-12);
 assert.equal(quote(rates,'GBP','CHF'),.81/.75);
 assert.equal(quote(rates,'USD','NODATA'),null);
});
test('Reference rate changes compare actual observation dates, not pretend live change',()=>{
 const rates={EUR:.86,PLN:3.65,GBP:.75,JPY:151,CHF:.81,UAH:42,TRY:43,CAD:1.36,AUD:1.5};
 const later={...rates,PLN:3.75};
 const data={rates:{'2026-11-10':rates,'2026-11-12':later}};
 const fx=buildFx(data);
 assert.ok(fx.length>=8);assert.ok(fx.length<=FX_LIST.length);
 const usdpln=fx.find(x=>x.symbol==='USD/PLN');
 assert.equal(usdpln.price,3.75);assert.ok(usdpln.change>0);assert.equal(usdpln.date,'2026-11-12');
});
test('Metal spot data respect source stale flags and omit invalid values',()=>{
 const metals=normalizeMetals({symbols:[
 {symbol:'XAU',quote_currency:'USD',price:'4023.11',is_stale:false,computed_at:'2026-11-20T10:00:00Z'},
 {symbol:'XAG',quote_currency:'USD',price:'43.2',is_stale:true},
 {symbol:'HG',price:'1.11'},
 ]});
 assert.equal(metals.length,2);assert.equal(metals[0].price,4023.11);assert.equal(metals[1].stale,true);
});

test('Currency universe enables USD/CNY and dynamic crosses',()=>{
 const rates={EUR:.86,PLN:3.65,CNY:7.24,GBP:.75};
 const data={rates:{'2026-11-18':rates,'2026-11-19':{...rates,CNY:7.25}}};
 const universe=buildFxUniverse(data);
 assert.equal(universe.rates.CNY,7.25);
 assert.equal(universe.previousRates.CNY,7.24);
 assert.equal(quote(universe.rates,'USD','CNY'),7.25);
 const fx=buildFx(data);assert.ok(fx.some(row=>row.symbol==='USD/CNY'));
});

test('Frankfurter v2 history handles asynchronous source observation dates without fabricated prices',()=>{
 const rows=[
 {date:'2026-11-18',base:'USD',quote:'CNY',rate:7.21},
 {date:'2026-11-18',base:'USD',quote:'EUR',rate:.86},
 {date:'2026-11-19',base:'USD',quote:'CNY',rate:7.22},
 {date:'2026-11-19',base:'USD',quote:'EUR',rate:.861},
 {date:'2026-11-20',base:'USD',quote:'CNY',rate:7.24},
 {date:'2026-11-20',base:'USD',quote:'INVALID',rate:999},
 ];
 const data=normalizeV2History(rows);
 assert.equal(data.rates['2026-11-20'].EUR,.861);
 assert.equal(data.asOfByCurrency.EUR,'2026-11-19');
 assert.equal(data.rates['2026-11-20'].CNY,7.24);
 assert.equal(buildFxUniverse(data).rates.CNY,7.24);
 assert.ok(buildFx(data).find(x=>x.symbol==='EUR/CNY'));
});
