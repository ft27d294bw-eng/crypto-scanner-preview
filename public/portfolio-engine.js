/* Pure portfolio arithmetic, shared by browser and Node test runner.
   USD price per unit and USD/PLN are supplied externally; none are fabricated here. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.PortfolioEngine=factory();
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const CRYPTO=new Set(['BTC','ETH','SOL','XRP','BNB','DOGE','ADA','AVAX','DOT','LINK','LTC','SUI','TON','NEAR','TRX','PEPE','SHIB','HBAR','XLM','AAVE']);
 const METALS=new Set(['XAU','XAG']);
 const FIAT=new Set(['USD','EUR','PLN','GBP','UAH','USDT','USDC']);
 const ALLOWED=new Set([...CRYPTO,...METALS,...FIAT]);
 const validNumber=x=>typeof x==='number'&&Number.isFinite(x);
 function isHolding(h){return h&&ALLOWED.has(h.asset)&&validNumber(h.qty)&&h.qty>0&&h.qty<=1e11&&validNumber(h.buyUsd)&&h.buyUsd>=0&&h.buyUsd<=1e10;}
 function assetType(symbol){return METALS.has(symbol)?'metal':CRYPTO.has(symbol)?'crypto':'fiat';}
 function summarize(holdings,prices,usdPln,scenario={}){
   if(!validNumber(usdPln)||usdPln<=0) return {ready:false,reason:'fx-unavailable',positions:[],missing:[],totalUsd:null,totalPln:null};
   const factors={crypto:Number(scenario.crypto||0),metals:Number(scenario.metals||0),usdPln:Number(scenario.usdPln||0)};
   if(Object.values(factors).some(v=>!Number.isFinite(v)||v<=-100||v>200))throw Error('Invalid scenario');
   const positions=[],missing=[];let totalUsd=0,totalPln=0,costUsd=0,scenarioPln=0,knownCost=true;
   for(const h of holdings){
     if(!isHolding(h))continue;
     const price=h.asset==='PLN'?1/usdPln:prices[h.asset];
     if(!validNumber(price)||price<=0){missing.push(h.asset);continue;}
     const valueUsd=h.qty*price;
     const valuePln=h.asset==='PLN'?h.qty:valueUsd*usdPln;
     const type=assetType(h.asset);
     const change=type==='crypto'?factors.crypto:type==='metal'?factors.metals:0;
     const after=h.asset==='PLN'?h.qty:valuePln*(1+change/100)*(1+factors.usdPln/100);
     const investedUsd=h.buyUsd>0?h.qty*h.buyUsd:null;
     if(investedUsd===null)knownCost=false; else costUsd+=investedUsd;
     totalUsd+=valueUsd;totalPln+=valuePln;scenarioPln+=after;
     positions.push({...h,type,price,valueUsd,valuePln,scenarioPln:after,investedUsd,pnlUsd:investedUsd===null?null:valueUsd-investedUsd});
   }
   return {ready:positions.length>0,positions,missing,totalUsd,totalPln,scenarioPln,deltaPln:scenarioPln-totalPln,costUsd:knownCost&&positions.length?costUsd:null,pnlUsd:knownCost&&positions.length?totalUsd-costUsd:null,partial:missing.length>0};
 }
 function goalCheck(summary,goalPln,goalPriceChange=0,reservePln=0){
   if(!summary.ready||!validNumber(goalPln)||goalPln<=0||!validNumber(goalPriceChange)||goalPriceChange<0||goalPriceChange>100||!validNumber(reservePln)||reservePln<0||reservePln>1e11)return null;
   const adjustedGoal=goalPln*(1+goalPriceChange/100);
   const spendable=Math.max(0,summary.scenarioPln-reservePln);
   return {cost:adjustedGoal,reserve:reservePln,spendable,remaining:spendable-adjustedGoal,progress:spendable/adjustedGoal*100,reached:spendable>=adjustedGoal};
 }
 return {CRYPTO,METALS,FIAT,ALLOWED,isHolding,assetType,summarize,goalCheck};
});
