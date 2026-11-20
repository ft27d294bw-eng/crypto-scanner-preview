'use strict';
const FX_LIST = [
 ['USD/PLN','USD','PLN'],['USD/CNY','USD','CNY'],['EUR/USD','EUR','USD'],['EUR/PLN','EUR','PLN'],
 ['GBP/USD','GBP','USD'],['USD/JPY','USD','JPY'],['USD/CHF','USD','CHF'],['USD/UAH','USD','UAH'],
 ['USD/CAD','USD','CAD'],['AUD/USD','AUD','USD'],['USD/TRY','USD','TRY'],['USD/SGD','USD','SGD'],
 ['USD/HKD','USD','HKD'],['EUR/CNY','EUR','CNY'],['EUR/GBP','EUR','GBP'],['EUR/CZK','EUR','CZK'],
 ['EUR/SEK','EUR','SEK'],['EUR/NOK','EUR','NOK'],['EUR/HUF','EUR','HUF'],['USD/INR','USD','INR'],
 ['USD/KRW','USD','KRW'],['USD/BRL','USD','BRL'],['USD/MXN','USD','MXN'],['NZD/USD','NZD','USD']
];
const PRICED = [...new Set(FX_LIST.flatMap(x=>[x[1],x[2]]))].filter(x=>x!=='USD');
let cache=null,expiry=0,pending=null;
async function getJSON(url){const r=await fetch(url,{signal:AbortSignal.timeout(8000),headers:{Accept:'application/json'}});if(!r.ok)throw Error('Upstream HTTP '+r.status);return r.json();}
function quote(rate,from,to){const a=from==='USD'?1:rate[from];const b=to==='USD'?1:rate[to];return Number.isFinite(a)&&Number.isFinite(b)&&a>0&&b>0?b/a:null;}
// Normalize Frankfurter v2 flat time-series rows into consistent daily USD snapshots.
// Each currency keeps its last available reference observation; older dates are never
// presented as intraday FX ticks or executable quotes.
function normalizeV2History(rows){
 if(!Array.isArray(rows)||!rows.length)throw Error('No FX rows');
 const daily=new Map(),asOfByCurrency={};
 for(const row of rows){
  const code=String(row?.quote||'').toUpperCase(),date=String(row?.date||'');
  if(!PRICED.includes(code)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||row?.base?.toUpperCase()!=='USD'||!Number.isFinite(row.rate)||row.rate<=0)continue;
  if(!daily.has(date))daily.set(date,{});
  daily.get(date)[code]=row.rate;
 }
 const dates=[...daily.keys()].sort();if(!dates.length)throw Error('No usable FX rows');
 const history={},running={};
 for(const date of dates){
  for(const [currency,rate] of Object.entries(daily.get(date))){running[currency]=rate;asOfByCurrency[currency]=date;}
  history[date]={...running};
 }
 return {rates:history,asOfByCurrency};
}
function buildFx(data){
  const dates=Object.keys(data?.rates||{}).sort();if(!dates.length)throw Error('No FX data');
  const latest=dates[dates.length-1], prev=dates[Math.max(0,dates.length-6)];
  return FX_LIST.map(([pair,from,to])=>{
    const price=quote(data.rates[latest],from,to),old=quote(data.rates[prev],from,to);
    const fromDate=from==='USD'?latest:data.asOfByCurrency?.[from]||latest, toDate=to==='USD'?latest:data.asOfByCurrency?.[to]||latest;
    return {symbol:pair,from,to,price,change:old&&price?((price/old)-1)*100:null,points:dates.slice(-10).map(d=>quote(data.rates[d],from,to)).filter(v=>v!==null),date:fromDate<toDate?fromDate:toDate,comparisonDate:prev,source:'Frankfurter',unit:'reference'};
  }).filter(x=>Number.isFinite(x.price)&&x.price>0);
}
function buildFxUniverse(data){
 const dates=Object.keys(data?.rates||{}).sort();if(!dates.length)throw Error('No FX data');
 const date=dates[dates.length-1],previousDate=dates[Math.max(0,dates.length-6)];
 const clean=raw=>Object.fromEntries([['USD',1],...Object.entries(raw||{}).filter(([code,val])=>/^[A-Z]{3}$/.test(code)&&Number.isFinite(val)&&val>0)]);
 return {base:'USD',rates:clean(data.rates[date]),previousRates:clean(data.rates[previousDate]),date,comparisonDate:previousDate,observedAt:data.asOfByCurrency||{},source:'Frankfurter (daily reference)'};
}
function normalizeMetals(data){const rows=(data?.symbols||[]).filter(x=>['XAU','XAG'].includes(x.symbol));return rows.map(x=>({symbol:x.symbol,name:x.symbol==='XAU'?'Gold':'Silver',price:Number(x.price),currency:x.quote_currency,unit:'troy ounce',asOf:x.computed_at,stale:!!x.is_stale,source:'goldprice.dev',change:null})).filter(x=>Number.isFinite(x.price)&&x.price>0);}
async function load(){
  const since=new Date(Date.now()-12*86400_000).toISOString().slice(0,10);
  const fxUrl=`https://api.frankfurter.dev/v2/rates?from=${since}&base=usd&quotes=${PRICED.join(',').toLowerCase()}`;
  const metalsStart=new Date(Date.now()-11*86400_000).toISOString().slice(0,10);
  const metalsEnd=new Date().toISOString().slice(0,10);
  const barUrl=symbol=>`https://api.goldprice.dev/v1/bars?symbol=${symbol}-USD-SPOT&interval=1d&from=${metalsStart}&to=${metalsEnd}&limit=15`;
  const results=await Promise.allSettled([getJSON(fxUrl),getJSON('https://api.goldprice.dev/v1/prices'),getJSON(barUrl('XAU')),getJSON(barUrl('XAG'))]);
  let fx=[],fxRates=null;
  if(results[0].status==='fulfilled'){
    try{const normalized=normalizeV2History(results[0].value);fx=buildFx(normalized);fxRates=buildFxUniverse(normalized);}catch{fx=[];fxRates=null;}
  }
  const metals=results[1].status==='fulfilled'?normalizeMetals(results[1].value):[];
  for (const metal of metals){
    const ix=metal.symbol==='XAU'?2:3;
    if(results[ix].status!=='fulfilled')continue;
    const bars=(results[ix].value?.bars||[]).filter(x=>x.is_closed!==false).sort((a,b)=>a.bar_start.localeCompare(b.bar_start));
    const history=bars.map(b=>Number(b.close)).filter(n=>Number.isFinite(n)&&n>0);
    metal.points=history;
    if(history.length>1)metal.change=(metal.price/history[0]-1)*100;
    metal.comparisonDate=bars[0]?.bar_start||null;
  }
  return {status:fx.length||metals.length?'ok':'unavailable',asOf:new Date().toISOString(),fx,fxRates,metals,errors:{fx:fx.length?null:'FX source unavailable',metals:results[1].status==='rejected'?'Metals source unavailable':null},sources:{fx:'Frankfurter (daily reference)',metals:'goldprice.dev (free prices delayed ~15 min)'}};
}
async function getMarkets(){if(cache&&Date.now()<expiry)return cache;if(pending)return pending;
  pending=load().then(data=>{cache=data;expiry=Date.now()+(data.status==='ok'?15*60_000:60_000);return data;}).finally(()=>pending=null);return pending;}
module.exports={FX_LIST,PRICED,quote,buildFx,buildFxUniverse,normalizeV2History,normalizeMetals,getMarkets};
