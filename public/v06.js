/* v0.6 — home-only Exchange Lab + bilingual 23-currency cross converter + FX watchlist */
(() => {
 'use strict';
 const $=id=>document.getElementById(id);
 const ru=()=>state.lang==='ru';
 const copy={
  ru:{compareShortcut:'Лаборатория бирж',compareShortcutDesc:'Выбирайте две биржи, проверяйте bid/ask, расходы и возможный результат.',openCompare:'Открыть расчёт',closeCompare:'Свернуть расчёт',currencyLab:'КОНВЕРТЕР · 23 ВАЛЮТЫ',fxConverter:'Конвертер валют',fxConverterLead:'Любая пара из основных мировых валют, включая доллар и китайский юань.',amountLabel:'Сумма',fromLabel:'Из валюты',toLabel:'В валюту',conversionResult:'Расчёт по справочному курсу',quickPairs:'Быстрый выбор',addFavoritePair:'☆ Сохранить пару',removeFavoritePair:'★ Убрать из избранного',refRates:'Справочный курс',referenceChange:'Изменение за последние торговые дни',noRates:'Нет данных по этой валютной паре. Обновите котировки или выберите другую пару.',referenceNotLive:'Справочный межбанковский ориентир, не котировка для сделки.',demoRates:'ДЕМО: вымышленные курсы, не для обмена и торговли',showFxMore:'Показать все валютные пары ↓',showFxLess:'Свернуть список ↑'},
  en:{compareShortcut:'Exchange Lab',compareShortcutDesc:'Select two exchanges and check bid/ask prices, fees and estimated outcome.',openCompare:'Open calculator',closeCompare:'Collapse calculator',currencyLab:'FX CONVERTER · 23 CURRENCIES',fxConverter:'Currency converter',fxConverterLead:'Any pair among major currencies, including USD and Chinese yuan.',amountLabel:'Amount',fromLabel:'From',toLabel:'To',conversionResult:'Reference-rate conversion',quickPairs:'Quick pairs',addFavoritePair:'☆ Save pair',removeFavoritePair:'★ Remove favorite',refRates:'Reference rate',referenceChange:'Change across recent trading days',noRates:'No reference data for this currency pair. Refresh or select another pair.',referenceNotLive:'Daily reference midpoint; not an executable trade quote.',demoRates:'DEMO: fictional rates, not for exchange or trading',showFxMore:'Show all currency pairs ↓',showFxLess:'Show fewer ↑'}
 };
 const say=k=>copy[state.lang]?.[k]||copy.ru[k]||k;
 const items=[['USD','🇺🇸','US Dollar','Доллар США'],['EUR','🇪🇺','Euro','Евро'],['PLN','🇵🇱','Polish Zloty','Злотый'],['CNY','🇨🇳','Chinese Yuan','Китайский юань'],['GBP','🇬🇧','British Pound','Фунт'],['JPY','🇯🇵','Japanese Yen','Иена'],['CHF','🇨🇭','Swiss Franc','Франк'],['UAH','🇺🇦','Ukrainian Hryvnia','Гривна'],['CAD','🇨🇦','Canadian Dollar','Канадский доллар'],['AUD','🇦🇺','Australian Dollar','Австралийский доллар'],['HKD','🇭🇰','Hong Kong Dollar','Гонконгский доллар'],['SGD','🇸🇬','Singapore Dollar','Сингапурский доллар'],['SEK','🇸🇪','Swedish Krona','Шведская крона'],['NOK','🇳🇴','Norwegian Krone','Норвежская крона'],['DKK','🇩🇰','Danish Krone','Датская крона'],['CZK','🇨🇿','Czech Koruna','Чешская крона'],['HUF','🇭🇺','Hungarian Forint','Венгерский форинт'],['NZD','🇳🇿','New Zealand Dollar','Новозеландский доллар'],['INR','🇮🇳','Indian Rupee','Индийская рупия'],['KRW','🇰🇷','South Korean Won','Южнокорейская вона'],['TRY','🇹🇷','Turkish Lira','Турецкая лира'],['BRL','🇧🇷','Brazilian Real','Бразильский реал'],['MXN','🇲🇽','Mexican Peso','Мексиканский песо']];
 const dict=Object.fromEntries(items.map(row=>[row[0],row]));
 const KEY='cs-fx-v06';
 function restore(){try{const val=JSON.parse(localStorage.getItem(KEY)||'{}');return {from:dict[val.from]?val.from:'USD',to:dict[val.to]?val.to:'CNY',amount:Number.isFinite(val.amount)&&val.amount>=0&&val.amount<=1e9?val.amount:100,saved:Array.isArray(val.saved)?val.saved.filter(p=>typeof p==='string'&&/^[A-Z]{3}\/[A-Z]{3}$/.test(p)&&dict[p.split('/')[0]]&&dict[p.split('/')[1]]).slice(0,12):[]};}catch{return {from:'USD',to:'CNY',amount:100,saved:[]};}}
 const prefs=restore();let showAll=false;
 window.v6CompareOpen=false;
 function persist(){try{localStorage.setItem(KEY,JSON.stringify(prefs));}catch{}}
 function optLabel(code){const row=dict[code];return `${row[1]} ${row[0]} · ${ru()?row[3]:row[2]}`;}
 function setInputs(){for(const id of ['v6From','v6To']){
  const sel=$(id);const current=id==='v6From'?prefs.from:prefs.to;
  const previous=sel.value;
  sel.innerHTML=items.map(row=>{const opt=document.createElement('option');opt.value=row[0];opt.textContent=optLabel(row[0]);return opt.outerHTML;}).join('');
  sel.value=current;
 } if(document.activeElement!==$('v6Amount'))$('v6Amount').value=prefs.amount;
 }
 function format(v,digits=2){return Number(v).toLocaleString(ru()?'ru-RU':'en-US',{maximumFractionDigits:digits,minimumFractionDigits:digits});}
 function currentFx(){
  if(state.demo)return {rates:V6_DEMO_RATES,previousRates:null,date:'DEMO',source:'SYNTHETIC DEMO'};
  return assetState.data?.fxRates||null;
 }
 const quick=[['USD','CNY'],['USD','PLN'],['EUR','USD'],['EUR','PLN'],['GBP','USD']];
 function quickButtons(){
  const list=[...quick,...prefs.saved.map(p=>p.split('/'))].filter(([a,b],i,all)=>all.findIndex(([x,y])=>x===a&&y===b)===i);
  const wrap=$('v6CommonPairs');wrap.replaceChildren();
  for(const [a,b] of list){
   const btn=document.createElement('button');btn.type='button';btn.className='v6-pair-chip';btn.textContent=`${a}/${b}`;
   const active=a===prefs.from&&b===prefs.to;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
   btn.addEventListener('click',()=>{prefs.from=a;prefs.to=b;persist();renderFx();$('v6Amount').focus({preventScroll:true});});wrap.append(btn);
  }
 }
 function renderFx(){
  document.querySelectorAll('[data-v6]').forEach(el=>{if(copy[state.lang]?.[el.dataset.v6]&&el.id!=='v6SaveFx'&&el.id!=='v6ShowFx')el.textContent=say(el.dataset.v6);});
  setInputs();quickButtons();
  const mode=currentFx();const now=mode?.rates;const rate=CryptoFxEngine.crossRate(now,prefs.from,prefs.to);
  const converted=CryptoFxEngine.convert(prefs.amount,now,prefs.from,prefs.to);
  const variation=CryptoFxEngine.variation(now,mode?.previousRates,prefs.from,prefs.to);
  $('v6Converted').textContent=converted===null?'—':`${format(converted,converted>=10?2:4)} ${prefs.to}`;
  $('v6UnitRate').textContent=rate===null?'—':`1 ${prefs.from} ≈ ${format(rate,rate>=100?2:rate<.01?7:4)} ${prefs.to}`;
  const movement=$('v6RateChange');movement.className='';movement.textContent=variation===null?'—':`${variation>=0?'↗':'↘'} ${variation>=0?'+':''}${format(variation,2)}%`;
  if(variation!==null)movement.classList.add(variation>=0?'v6-positive':'v6-negative');
  $('v6RateDate').textContent=variation===null?'':say('referenceChange');
  const dateFrom=mode?.observedAt?.[prefs.from]||mode?.date;const dateTo=mode?.observedAt?.[prefs.to]||mode?.date;
  const range=[dateFrom,dateTo].filter(Boolean).filter((d,i,a)=>a.indexOf(d)===i).join(' / ');
  $('v6FxSource').textContent=state.demo?say('demoRates'):mode?.date?`${say('refRates')} · ${range} · ${mode.source} · ${say('referenceNotLive')}`:say('noRates');
  const selected=`${prefs.from}/${prefs.to}`,saved=prefs.saved.includes(selected);$('v6SaveFx').textContent=say(saved?'removeFavoritePair':'addFavoritePair');$('v6SaveFx').setAttribute('aria-pressed',String(saved));
  $('v6ShowFx').textContent=say(showAll?'showFxLess':'showFxMore');
 }
 function renderGridLimit(){
  const cards=[...$('fxGrid').querySelectorAll('.asset-tile')];cards.forEach((el,i)=>el.hidden=!showAll&&i>=9);
  $('v6ShowFx').hidden=cards.length<=9;
  $('v6ShowFx').textContent=say(showAll?'showFxLess':'showFxMore');
 }
 function updateCompare(){
  const active=state.page==='home'&&state.tab==='scanner';
  $('quickCompare').hidden=!active||!window.v6CompareOpen;
  $('v6CompareLauncher').hidden=!active;
  $('v6CompareToggle').setAttribute('aria-expanded',String(active&&window.v6CompareOpen));
  $('v6CompareToggle').querySelector('[data-v6]').textContent=say(window.v6CompareOpen?'closeCompare':'openCompare');
 }
 // Core rendering and asynchronous FX updates are connected separately.
 const prevRender=render;render=function(){prevRender();renderFx();renderGridLimit();updateCompare();};
 const prevAssets=renderAssetMarkets;renderAssetMarkets=function(){prevAssets();renderFx();renderGridLimit();};
 $('v6CompareToggle').addEventListener('click',()=>{window.v6CompareOpen=!window.v6CompareOpen;updateCompare();if(window.v6CompareOpen)$('quickCompare').scrollIntoView({behavior:'smooth',block:'nearest'});});
 $('v6From').addEventListener('change',e=>{prefs.from=e.target.value;persist();renderFx();});
 $('v6To').addEventListener('change',e=>{prefs.to=e.target.value;persist();renderFx();});
 $('v6Swap').addEventListener('click',()=>{[prefs.from,prefs.to]=[prefs.to,prefs.from];persist();renderFx();});
 $('v6Amount').addEventListener('input',e=>{const n=Number(e.target.value);if(!Number.isFinite(n)||n<0||n>1e9){$('v6Converted').textContent='—';$('v6UnitRate').textContent='—';return;}prefs.amount=n;persist();renderFx();});
 $('v6SaveFx').addEventListener('click',()=>{const pair=`${prefs.from}/${prefs.to}`,i=prefs.saved.indexOf(pair);if(i>=0)prefs.saved.splice(i,1);else prefs.saved.unshift(pair);prefs.saved=prefs.saved.slice(0,12);persist();renderFx();});
 $('v6ShowFx').addEventListener('click',()=>{showAll=!showAll;renderGridLimit();});
 // Profile and nav remain isolated from exchange comparison.
 renderFx();renderGridLimit();updateCompare();
})();
