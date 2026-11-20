/* v0.5 — accessible, localized profile/settings and explicit cross-exchange estimate. */
(() => {
'use strict';
const dict={
 ru:{compareBadge:'ЛАБОРАТОРИЯ БИРЖ · КОТИРОВКИ',compareTitle:'Сравнение бирж',compareLead:'Выберите монету и две биржи. Сравниваем покупку по ask и продажу по bid.',coinSelect:'Монета',buyWhere:'Купить на',sellWhere:'Продать на',bestAsk:'Цена покупки (ask)',bestBid:'Цена продажи (bid)',netResult:'Оценка результата',grossSpread:'Разница до расходов',compareWarning:'Это расчёт, не гарантированный арбитраж. Учтите глубину стакана, ввод/вывод, сети, лимиты, KYC, задержки и движение рынка.',quickProfile:'БЫСТРАЯ НАСТРОЙКА',profileAssistant:'Профиль за минуту',profileAssistantDesc:'Заполните основные данные без лишних шагов.',suggestNickname:'Предложить никнейм',addBio:'Описание в один клик',choosePhoto:'Загрузить фото',profileFilled:'Профиль заполнен',scannerSettings:'Сканер и расчёты',scannerSettingsDesc:'Ваши параметры, которые применяются на главной.',defaultTrade:'Сумма сделки · USDT',defaultFee:'Комиссия одной операции · %',withdrawFee:'Перевод и вывод · USDT',slippage:'Проскальзывание на сторону · %',feeDetails:'Дополнительные расходы применяются в блоке сравнения бирж. Основная таблица по-прежнему показывает результат без перевода и проскальзывания.',resetTrade:'Восстановить значения',comfort:'Удобство просмотра',comfortDesc:'Настройте отображение под себя.',compact:'Компактные таблицы',compactDesc:'Больше информации на одном экране',hideLosses:'Скрывать убыточные пары',hideLossesDesc:'По умолчанию показывать только плюс после торговых комиссий',defaultDemo:'Показывать пометку DEMO',demoDesc:'Всегда отмечать демонстрационные данные',yourData:'Локальные настройки',yourDataDesc:'Сохраните параметры или вернитесь к стандартным.',backupPrefs:'Скачать настройки',resetPrefs:'Сбросить параметры v0.5',dataWarning:'Файл не содержит паролей, фотографий и портфеля.',noQuotes:'Нет котировок выбранных бирж',sameExchange:'Для сравнения нужны две разные биржи',unknownDepth:'Глубина стакана неизвестна',limitedDepth:'Недостаточная глубина на лучшей цене',sufficientDepth:'Глубина на верхнем уровне достаточная',expenses:'Торговые комиссии, проскальзывание и перевод учтены',demoLabel:'ТЕСТОВЫЕ ЦЕНЫ · НЕ РЕАЛЬНЫЙ РЫНОК',savedPrefs:'Настройки обновлены',resetConfirm:'Сбросить дополнительные параметры?',scenarioBio:'Отслеживаю рынки, сравниваю биржи и инвестирую с планом.'},
 en:{compareBadge:'EXCHANGE LAB · QUOTES',compareTitle:'Compare exchanges',compareLead:'Choose a coin and two exchanges. Compare buy ask with sell bid.',coinSelect:'Coin',buyWhere:'Buy on',sellWhere:'Sell on',bestAsk:'Buy price (ask)',bestBid:'Sell price (bid)',netResult:'Estimated result',grossSpread:'Spread before costs',compareWarning:'An estimate, not guaranteed arbitrage. Check order-book depth, deposits/withdrawals, networks, limits, KYC, delays and price movement.',quickProfile:'QUICK SETUP',profileAssistant:'Your profile in a minute',profileAssistantDesc:'Complete the essentials without extra steps.',suggestNickname:'Suggest username',addBio:'Add quick bio',choosePhoto:'Upload photo',profileFilled:'Profile complete',scannerSettings:'Scanner & calculations',scannerSettingsDesc:'Your default trading parameters on Home.',defaultTrade:'Trade size · USDT',defaultFee:'Trading fee per side · %',withdrawFee:'Withdrawal & transfer · USDT',slippage:'Slippage per side · %',feeDetails:'Additional costs apply in exchange comparison. The main scanner table still excludes transfers and slippage.',resetTrade:'Restore defaults',comfort:'Viewing preferences',comfortDesc:'Make your workspace comfortable.',compact:'Compact tables',compactDesc:'See more rows at once',hideLosses:'Hide negative opportunities',hideLossesDesc:'Default to positive results after trading fees',defaultDemo:'Show DEMO indicator',demoDesc:'Clearly mark simulated market prices',yourData:'Local preferences',yourDataDesc:'Export preferences or restore defaults.',backupPrefs:'Download preferences',resetPrefs:'Reset v0.5 preferences',dataWarning:'Export excludes passwords, photos and portfolio holdings.',noQuotes:'No quotes available for selected exchanges',sameExchange:'Pick two different exchanges',unknownDepth:'Order-book depth unknown',limitedDepth:'Insufficient top-of-book depth',sufficientDepth:'Top-of-book depth sufficient',expenses:'Includes trading fees, slippage and transfer',demoLabel:'DEMO PRICES · NOT LIVE MARKET DATA',savedPrefs:'Preferences updated',resetConfirm:'Reset extra preferences?',scenarioBio:'Tracking markets, comparing exchanges and investing with a plan.'}
};
const $=id=>document.getElementById(id), getLang=()=>window.state?.lang || (document.documentElement.lang==='en'?'en':'ru');
const L=k=>(dict[getLang()]||dict.ru)[k]||k;
const prefsKey='cs-v05-settings';
const safeLoad=()=>{try{return JSON.parse(localStorage.getItem(prefsKey)||'{}')||{};}catch{return {};}};
let prefs=Object.assign({transfer:2,slippage:0.1,compact:false,positive:false,demoNotice:true},safeLoad());
let selectedCoin='BTC', buyExchange='auto',sellExchange='auto';
function save(){try{localStorage.setItem(prefsKey,JSON.stringify(prefs));}catch{}}
function currentPairs(){return typeof state!=='undefined'&&state.data?.pairs||[];}
function format(v){return Number.isFinite(v)?Number(v).toLocaleString(getLang()==='en'?'en-US':'ru-RU',{maximumFractionDigits:6}):'—';}
function messages(){document.querySelectorAll('[data-v5]').forEach(el=>{const key=el.dataset.v5;if(dict[getLang()]?.[key])el.textContent=L(key);});}
function choices(){
 const coin=$('v5Coin');const pairs=currentPairs();const list=pairs.length?pairs.map(p=>p.symbol):['BTC','ETH','SOL','XRP'];
 const prior=coin.value||selectedCoin;if(coin.options.length!==list.length||list.some((x,i)=>coin.options[i]?.value!==x))coin.innerHTML=list.map(s=>`<option value="${s}">${s} / USDT</option>`).join('');
 selectedCoin=list.includes(prior)?prior:list[0];coin.value=selectedCoin;
 const ex=typeof EXCHANGES!=='undefined'?EXCHANGES:['Binance','Bybit','OKX','MEXC'];
 for(const [id,priorValue] of [['v5BuyExchange',buyExchange],['v5SellExchange',sellExchange]]){
  const el=$(id);if(!el.options.length){el.add(new Option(getLang()==='en'?'Best buy':'Лучшая покупка','auto'));for(const name of ex)el.add(new Option(name,name));}el.options[0].text=getLang()==='en'?(id==='v5BuyExchange'?'Best buy':'Best sell'):(id==='v5BuyExchange'?'Лучшая покупка':'Лучшая продажа');el.value=priorValue;
 }
}
function estimate(){
 const pair=currentPairs().find(p=>p.symbol===selectedCoin),quotes=(pair?.quotes||[]).filter(q=>state.exchanges.has(q.exchange)&&Number.isFinite(q.ask)&&Number.isFinite(q.bid)&&q.ask>0&&q.bid>0);
 let results=[];
 for(const buy of quotes){if(buyExchange!=='auto'&&buy.exchange!==buyExchange)continue;
  for(const sell of quotes){if(buy.exchange===sell.exchange||sellExchange!=='auto'&&sell.exchange!==sellExchange)continue;
   const amount=Number(state.amount),fee=Number(state.fee)/100,slippage=prefs.slippage/100;
   const buyPrice=buy.ask*(1+slippage), sellPrice=sell.bid*(1-slippage);
   const units=amount/(buyPrice*(1+fee));const revenue=units*sellPrice*(1-fee);
   const profit=revenue-amount-prefs.transfer;
   const depth=buy.askQty==null||sell.bidQty==null?'unknown':Math.min(buy.askQty,sell.bidQty)<units?'limited':'enough';
   results.push({buy,sell,profit,percent:profit/amount*100,gross:(sell.bid/buy.ask-1)*100,units,depth});
  }
 }
 results.sort((a,b)=>b.profit-a.profit);return results[0]||null;
}
function renderCompare(){
 choices();messages();const result=estimate();
 $('v5Ask').textContent=result?'$'+format(result.buy.ask):'—';$('v5Bid').textContent=result?'$'+format(result.sell.bid):'—';
 $('v5AskVenue').textContent=result?.buy.exchange||'—';$('v5BidVenue').textContent=result?.sell.exchange||'—';
 const net=$('v5Net');net.textContent=result?(result.profit>=0?'+':'')+format(result.profit)+' USDT':'—';net.classList.toggle('v5-up',!!result&&result.profit>=0);net.classList.toggle('v5-down',!!result&&result.profit<0);
 $('v5NetPct').textContent=result?(result.percent>=0?'+':'')+format(result.percent)+'%':'—';$('v5Gross').textContent=result?(result.gross>=0?'+':'')+format(result.gross)+'%':'—';
 $('v5Depth').textContent=result?L(result.depth==='enough'?'sufficientDepth':result.depth==='limited'?'limitedDepth':'unknownDepth'):L('noQuotes');
 $('v5Charges').textContent=`${L('expenses')} · ${format(state.amount)} USDT · ${format(state.fee)}% × 2 · ${format(prefs.slippage)}% × 2 · ${format(prefs.transfer)} USDT`;
 const original=L('compareWarning');$('quickCompare').querySelector('.v5-compare-note').textContent=state.demo?`${L('demoLabel')} · ${original}`:original;
 $('quickCompare').dataset.quoteMode=state.demo?'demo':'live';
}
function renderProfileProgress(){
 const name=$('profileName').value.trim(),handle=$('profileHandle').value.trim(),bio=$('profileBio').value.trim();
 let filled=0;if(name&&name!=='Crypto Explorer')filled++;if(handle&&handle!=='explorer')filled++;if(bio)filled++;if(typeof assetState!=='undefined'&&assetState.avatarImage)filled++;
 const percent=filled*25;$('v5ProfilePercent').textContent=percent+'%';$('v5ProfileTrack').style.width=percent+'%';
}
function renderSettings(){
 for(const [id,val] of [['v5DefaultAmount',state.amount],['v5DefaultFee',state.fee],['v5Transfer',prefs.transfer],['v5Slippage',prefs.slippage]]){if(document.activeElement!==$(id))$(id).value=val;}
 $('v5Compact').checked=!!prefs.compact;$('v5OnlyPositive').checked=!!prefs.positive;$('v5DemoNotice').checked=!!prefs.demoNotice;
 document.documentElement.classList.toggle('v5-compact',!!prefs.compact);document.documentElement.classList.toggle('v5-no-demo-hint',!prefs.demoNotice);
}
function rerender(){renderSettings();renderProfileProgress();renderCompare();}
function syncPrefs(){
 const amount=Number($('v5DefaultAmount').value),fee=Number($('v5DefaultFee').value),transfer=Number($('v5Transfer').value),slip=Number($('v5Slippage').value);
 if(!Number.isFinite(amount)||amount<10||amount>100000||!Number.isFinite(fee)||fee<0||fee>3||!Number.isFinite(transfer)||transfer<0||transfer>1000||!Number.isFinite(slip)||slip<0||slip>5){$('v5SettingsFeedback').textContent=getLang()==='en'?'Check the input ranges.':'Проверьте допустимые значения.';return;}
 state.amount=amount;state.fee=fee;prefs.transfer=transfer;prefs.slippage=slip;prefs.compact=$('v5Compact').checked;prefs.positive=$('v5OnlyPositive').checked;prefs.demoNotice=$('v5DemoNotice').checked;
 try{localStorage.setItem('cs-v05-amount',String(amount));localStorage.setItem('cs-v05-fee',String(fee));}catch{}
 if(prefs.positive){state.filter='positive';state.tab='scanner';}else if(state.filter==='positive')state.filter='all';
 $('tradeSize').value=amount;$('feeInput').value=fee;save();$('v5SettingsFeedback').textContent=L('savedPrefs');render();rerender();
}
// Mirror the renderer so updated exchange quotes and RU/EN are reflected immediately.
const oldRender=render;
render=function(){oldRender();rerender();};
for(const id of ['v5Coin','v5BuyExchange','v5SellExchange'])$(id).addEventListener('change',()=>{selectedCoin=$('v5Coin').value;buyExchange=$('v5BuyExchange').value;sellExchange=$('v5SellExchange').value;renderCompare();});
for(const id of ['v5DefaultAmount','v5DefaultFee','v5Transfer','v5Slippage','v5Compact','v5OnlyPositive','v5DemoNotice'])$(id).addEventListener('change',syncPrefs);
$('v5ResetTrade').addEventListener('click',()=>{$('v5DefaultAmount').value=500;$('v5DefaultFee').value=.1;$('v5Transfer').value=2;$('v5Slippage').value=.1;syncPrefs();});
$('v5ResetPrefs').addEventListener('click',()=>{if(!confirm(L('resetConfirm')))return;prefs={transfer:2,slippage:.1,compact:false,positive:false,demoNotice:true};save();$('v5DefaultAmount').value=500;$('v5DefaultFee').value=.1;$('v5Transfer').value=2;$('v5Slippage').value=.1;$('v5Compact').checked=false;$('v5OnlyPositive').checked=false;$('v5DemoNotice').checked=true;syncPrefs();});
$('v5ExportPrefs').addEventListener('click',()=>{const safe={version:'0.5',language:state.lang,theme:state.theme,accent:state.accent,trade:{amount:state.amount,fee:state.fee,transfer:prefs.transfer,slippage:prefs.slippage},view:{compact:prefs.compact,positive:prefs.positive,demoNotice:prefs.demoNotice}};const url=URL.createObjectURL(new Blob([JSON.stringify(safe,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='cryptoscanner-settings.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);});
$('v5SuggestHandle').addEventListener('click',()=>{const source=$('profileName').value.trim().toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_ ]/g,'').replace(/ +/g,'_').slice(0,15);$('profileHandle').value=(source||'crypto_user')+'_'+String(Math.floor(Math.random()*900)+100);renderProfileProgress();});
$('v5BioPreset').addEventListener('click',()=>{$('profileBio').value=L('scenarioBio');renderProfileProgress();});
$('v5FocusAvatar').addEventListener('click',()=>$('avatarFile').click());
for(const id of ['profileName','profileHandle','profileBio'])$(id).addEventListener('input',renderProfileProgress);
// Allow avatar uploads to update completion score after async thumbnail conversion.
$('avatarFile').addEventListener('change',()=>setTimeout(renderProfileProgress,600));
const priorAmountValue=(()=>{try{return localStorage.getItem('cs-v05-amount');}catch{return null;}})();
const priorAmount=Number(priorAmountValue);if(priorAmountValue!==null&&priorAmount>=10&&priorAmount<=100000){state.amount=priorAmount;$('tradeSize').value=priorAmount;}
const priorFeeValue=(()=>{try{return localStorage.getItem('cs-v05-fee');}catch{return null;}})();
const priorFee=Number(priorFeeValue);if(priorFeeValue!==null&&priorFee>=0&&priorFee<=3){state.fee=priorFee;$('feeInput').value=priorFee;}
if(prefs.positive)state.filter='positive';
rerender();
})();
