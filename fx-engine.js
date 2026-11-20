/* Currency conversion helpers. Single USD-base reference-rate snapshot. */
(function(root,factory){
  const helpers=factory();
  if(typeof module==='object'&&module.exports)module.exports=helpers;
  if(root)root.CryptoFxEngine=helpers;
})(typeof window!=='undefined'?window:null,function(){
  'use strict';
  function crossRate(rates,from,to){
    if(!rates||typeof rates!=='object')return null;
    const a=from==='USD'?1:rates[from],b=to==='USD'?1:rates[to];
    return Number.isFinite(a)&&Number.isFinite(b)&&a>0&&b>0?b/a:null;
  }
  function convert(amount,rates,from,to){
    const rate=crossRate(rates,from,to);
    return Number.isFinite(amount)&&amount>=0&&amount<=1e9&&rate!==null?amount*rate:null;
  }
  function variation(rates,previousRates,from,to){
    const now=crossRate(rates,from,to),before=crossRate(previousRates,from,to);
    return now!==null&&before!==null&&before>0?(now/before-1)*100:null;
  }
  return {crossRate,convert,variation};
});
