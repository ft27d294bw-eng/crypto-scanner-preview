'use strict';

const COPY = {
  ru: {
    workspace:'РАБОЧАЯ ОБЛАСТЬ',scanner:'Сканер',markets:'Рынки',favorites:'Избранное',information:'ИНФОРМАЦИЯ',howItWorks:'Как это работает',
    sideTitle:'Меньше шума. Больше данных.',sideDesc:'Сравнивайте биржи в одном месте, без аккаунта и API-ключей.',language:'ЯЗЫК',
    platform:'ПЛАТФОРМА',overview:'Обзор рынка',connecting:'ПОДКЛЮЧЕНИЕ...',live:'LIVE / SPOT',partial:'ЧАСТИЧНО LIVE',demo:'ДЕМО-ДАННЫЕ',offline:'НЕТ ДАННЫХ',
    heroEyebrow:'КРИПТОВАЛЮТЫ · ЧЕТЫРЕ БИРЖИ',heroLine1:'Ваш рынок.',heroLine2:'В одном месте.',heroText:'Курсы монет, сравнение бирж и ваш портфель — всё просто и наглядно.',poweredBy:'ИСТОЧНИКИ',
    trackedPairs:'АКТИВНЫЕ ПАРЫ',trackedDesc:'Спотовые пары к USDT',positiveSpreads:'ПОЛОЖИТЕЛЬНЫЙ РАСЧЁТ',positiveDesc:'Без расходов на перевод',bestGap:'ЛУЧШИЙ СПРЕД',exchangesOnline:'БИРЖИ В СЕТИ',autoUpdate:'Автообновление 45 сек.',
    moreCoins:'Показать ещё 12 монет ↓',realTimeData:'РЫНОЧНЫЕ ДАННЫЕ',opportunities:'Поиск расхождений',tableDesc:'Сравнение лучших цен bid / ask между биржами',exportCsv:'Экспорт CSV',
    searchPlaceholder:'Поиск: BTC, ETH, SOL...',allPairs:'Все пары',profitOnly:'Плюс после комиссий',watchlist:'★ Избранное',sortBy:'Сортировка:',sortProfit:'Доходность',sortGap:'Спред',sortName:'Название',compare:'СРАВНИВАТЬ',
    asset:'АКТИВ',buyOn:'КУПИТЬ НА',sellOn:'ПРОДАТЬ НА',grossSpread:'СПРЕД',netProfit:'РАСЧЁТ P/L',action:'ДЕТАЛИ',marketQuotes:'КОТИРОВКИ',
    loading:'Загрузка котировок...',waitingSync:'Ожидаем данные',showing:'Показано',of:'из',pairs:'пар',updated:'Обновлено',ago:'назад',sec:'сек.',
    simulator:'СИМУЛЯТОР',tradeSettings:'Параметры расчёта',tradeAmount:'Сумма сделки',tradeAmountHint:'Виртуальный бюджет, USDT',feeEach:'Комиссия за операцию',feeHint:'Учитывается при покупке и продаже',
    calcDisclaimer:'Расчёт ориентировочный. Не включены комиссии вывода, стоимость перевода, проскальзывание и задержки. Учитывается только лучшая заявка книги ордеров.',
    topSignal:'ЛУЧШЕЕ СЕЙЧАС',featuredOpportunity:'Лидирующее расхождение',buy:'ПОКУПКА',sell:'ПРОДАЖА',viewCalculation:'Открыть расчёт',
    footerText:'Аналитика для ознакомления. Не финансовый совет. Без подключения кошельков и исполнения сделок.',
    spreadBreakdown:'ПОДРОБНЫЙ РАСЧЁТ',bid:'ЛУЧШИЙ BID',ask:'ЛУЧШИЙ ASK',exchange:'БИРЖА',route:'МАРШРУТ СДЕЛКИ',estimatedProfit:'Ориентировочный результат',limitedDepth:'Недостаточно объёма на первой заявке',unknownDepth:'Объём первой заявки не подтверждён',
    enoughDepth:'Объём первой заявки достаточен',notEnoughExchanges:'Для сравнения нужны котировки как минимум двух бирж.',noneTitle:'Ничего не найдено',noneText:'Измените фильтр, поиск или список бирж.',
    noPositiveTitle:'Пока нет положительного расчёта',noPositiveText:'На выбранных парах не найден положительный результат после заданных торговых комиссий.',
    noDataTitle:'Котировки не загружены',noDataText:'Попробуйте обновить данные или откройте демонстрационный режим.',
    unavailNotice:'Не удалось получить живые котировки с бирж. Сеть или API могут быть временно недоступны.',partialNotice:'Некоторые биржи недоступны. Показаны только реально полученные котировки.',
    demoNotice:'ДЕМО-РЕЖИМ: цены вымышленные, только для проверки интерфейса. Не используйте их для торговли.',demoLink:'Открыть демо',liveLink:'Вернуться к LIVE',
    profitNote:'Это теоретический результат при мгновенном исполнении по лучшим котировкам. Не учтены перевод актива между биржами, ввод/вывод, ликвидность следующих уровней, проскальзывание и изменение цены.',
    noSetup:'Для этих условий нет положительного расчёта. Ни один спред не гарантирует прибыль.',insufficient:'НЕДОСТАТОЧНО ОБЪЁМА',depthUnknown:'ОБЪЁМ НЕИЗВЕСТЕН',detail:'Открыть детали',
    favEmpty:'Избранное пока пустое',favEmptyText:'Нажмите на звёздочку рядом с монетой, чтобы сохранить её здесь.',
    guideTitle:'Как устроен сканер',guideDesc:'Четыре простых принципа, которые важно знать перед использованием.',guide1Title:'Берём bid / ask',guide1Text:'Для покупки используется лучшая цена ask, для продажи — лучшая цена bid. Последняя сделка (last price) не подходит для оценки спреда.',
    guide2Title:'Сравниваем спот',guide2Text:'Сравниваются одинаковые валютные пары вида BTC/USDT на спотовых рынках разных бирж.',
    guide3Title:'Вычитаем торговые комиссии',guide3Text:'Калькулятор считает две операции: покупку и продажу. Размер комиссии можно изменить, но расходы на перевод не учитываются.',
    guide4Title:'Проверяем ограничения',guide4Text:'Объём лучшей заявки, вывод и ввод монеты, сеть перевода, KYC, регион, задержки и реальные комиссии могут сделать такую сделку убыточной.',
    guideWarning:'Сканер не совершает сделки, не работает с API-ключами и не является инвестиционной рекомендацией.',
    exportEmpty:'Нет данных для экспорта',exportFilename:'crypto-scanner',
    price:'ЦЕНА',noUpdates:'Нет обновлений',estimated:'Примерно',connected:'Подключено',unavailable:'Недоступна',
    smallTrade:'Укажите сумму от 10 до 100 000 USDT.',invalidFee:'Укажите комиссию от 0 до 3%.',topLevel:'ЛУЧШАЯ ЗАЯВКА',favoriteAdded:'Добавлено в избранное',favoriteRemoved:'Удалено из избранного'
  },
  en: {
    workspace:'WORKSPACE',scanner:'Scanner',markets:'Markets',favorites:'Watchlist',information:'RESOURCES',howItWorks:'How it works',
    sideTitle:'Less noise. More signal.',sideDesc:'Compare exchanges in one place. No account or API keys needed.',language:'LANGUAGE',
    platform:'PLATFORM',overview:'Market overview',connecting:'CONNECTING...',live:'LIVE / SPOT',partial:'PARTIALLY LIVE',demo:'DEMO DATA',offline:'NO DATA',
    heroEyebrow:'CRYPTO · FOUR EXCHANGES',heroLine1:'Your markets.',heroLine2:'One clear view.',heroText:'Coin prices, exchange comparisons and your portfolio — without the clutter.',poweredBy:'SOURCES',
    trackedPairs:'TRACKED PAIRS',trackedDesc:'Spot markets quoted in USDT',positiveSpreads:'POSITIVE ESTIMATES',positiveDesc:'Excludes transfer costs',bestGap:'BEST GROSS SPREAD',exchangesOnline:'EXCHANGES ONLINE',autoUpdate:'Auto refresh every 45 sec.',
    moreCoins:'Show 12 more coins ↓',realTimeData:'MARKET DATA',opportunities:'Spread opportunities',tableDesc:'Comparing best bid / ask prices across exchanges',exportCsv:'Export CSV',
    searchPlaceholder:'Search: BTC, ETH, SOL...',allPairs:'All pairs',profitOnly:'Positive after fees',watchlist:'★ Watchlist',sortBy:'Sort:',sortProfit:'Net return',sortGap:'Spread',sortName:'Name',compare:'COMPARE',
    asset:'ASSET',buyOn:'BUY ON',sellOn:'SELL ON',grossSpread:'SPREAD',netProfit:'EST. P/L',action:'DETAILS',marketQuotes:'QUOTES',
    loading:'Loading quotes...',waitingSync:'Waiting for data',showing:'Showing',of:'of',pairs:'pairs',updated:'Updated',ago:'ago',sec:'sec.',
    simulator:'SIMULATOR',tradeSettings:'Calculation settings',tradeAmount:'Trade size',tradeAmountHint:'Simulated budget in USDT',feeEach:'Trading fee per side',feeHint:'Applied on both buy and sell',
    calcDisclaimer:'Indicative only. Excludes withdrawal fees, transfer costs, slippage and delays. Based solely on the best order-book level.',
    topSignal:'BEST RIGHT NOW',featuredOpportunity:'Leading price gap',buy:'BUY',sell:'SELL',viewCalculation:'View calculation',
    footerText:'For informational purposes only, not financial advice. No wallets connected or trades placed.',
    spreadBreakdown:'DETAILED BREAKDOWN',bid:'BEST BID',ask:'BEST ASK',exchange:'EXCHANGE',route:'TRADE ROUTE',estimatedProfit:'Estimated outcome',limitedDepth:'Insufficient quantity at the top of the book',unknownDepth:'Top-of-book quantity not confirmed',
    enoughDepth:'Top-of-book quantity appears sufficient',notEnoughExchanges:'Quotes from at least two exchanges are required for comparison.',noneTitle:'No matches found',noneText:'Try changing the filter, search or selected exchanges.',
    noPositiveTitle:'No positive estimates yet',noPositiveText:'No positive result after the selected trading fees for the tracked pairs.',
    noDataTitle:'Quotes unavailable',noDataText:'Try refreshing or explore the demo mode.',
    unavailNotice:'Live exchange quotes are unavailable. Your network or exchange APIs may be temporarily unreachable.',partialNotice:'Some exchanges are unavailable. Only quotes actually received are shown.',
    demoNotice:'DEMO MODE: all prices are made up for UI testing. Never trade based on demo prices.',demoLink:'Open demo',liveLink:'Return to LIVE',
    profitNote:'Theoretical outcome assuming instant fills at the best quotes. Excludes cross-exchange asset transfer, deposits/withdrawals, deeper order-book liquidity, slippage and price changes.',
    noSetup:'No positive estimates with the current settings. A price gap is never guaranteed profit.',insufficient:'LOW TOP DEPTH',depthUnknown:'DEPTH UNKNOWN',detail:'Open details',
    favEmpty:'Your watchlist is empty',favEmptyText:'Tap the star by a coin to save it here.',
    guideTitle:'How the scanner works',guideDesc:'Four simple principles to understand before using this tool.',guide1Title:'Use bid and ask',guide1Text:'Buy calculations use the best ask. Sell calculations use the best bid. Last traded prices are not suitable for estimating this spread.',
    guide2Title:'Compare spot markets',guide2Text:'The scanner compares identical symbols such as BTC/USDT across different exchanges’ spot markets.',
    guide3Title:'Subtract trading fees',guide3Text:'The calculator includes one buy and one sell fee. Adjust the fee to your account tier; transfer costs are not included.',
    guide4Title:'Verify all constraints',guide4Text:'Top-of-book size, withdrawal/deposit support, transfer network, KYC, region, delays and real fees can make a trade unprofitable.',
    guideWarning:'This scanner does not place trades or request API keys and is not investment advice.',
    exportEmpty:'Nothing to export',exportFilename:'crypto-scanner',
    price:'PRICE',noUpdates:'No updates',estimated:'Estimated',connected:'Connected',unavailable:'Unavailable',
    smallTrade:'Enter an amount between 10 and 100,000 USDT.',invalidFee:'Enter a fee between 0 and 3%.',topLevel:'TOP OF BOOK',favoriteAdded:'Added to watchlist',favoriteRemoved:'Removed from watchlist'
  }
};

// v0.2 navigation, profile and appearance copy
Object.assign(COPY.ru, {
  home:'Главная',profile:'Профиль',settings:'Настройки',personalSpace:'ВАШЕ ПРОСТРАНСТВО',profileTitle:'Ваш профиль',profileLead:'Настройте, как вы будете выглядеть в Crypto Scanner.',localProfile:'Профиль на устройстве',memberBadge:'С вами с 2026',savedCoins:'Избранных монет',trackedExchanges:'Биржи',editDetails:'ЛИЧНЫЕ ДАННЫЕ',editProfile:'Редактировать профиль',displayName:'Имя',username:'Никнейм',aboutYou:'О себе',bioPlaceholder:'Пара слов о себе...',avatarColor:'Цвет аватара',saveChanges:'Сохранить изменения',localOnly:'Данные хранятся только в этом браузере. Это не онлайн-аккаунт.',saved:'Изменения сохранены ✓',invalidHandle:'Никнейм: 3–24 символа, только латиница, цифры и _.',preferences:'ПЕРСОНАЛИЗАЦИЯ',settingsTitle:'Настройки',settingsLead:'Crypto Scanner под ваши привычки.',appearanceTitle:'Внешний вид',appearanceDescription:'Выберите оформление интерфейса.',darkMode:'Тёмная',lightMode:'Светлая',systemMode:'Как в системе',interfaceLanguage:'Язык приложения',languageDescription:'Вы можете изменить язык в любой момент.',accentTitle:'Акцентный цвет',accentDescription:'Небольшая деталь, которая делает интерфейс вашим.',settingsNote:'Язык, тема и профиль сохраняются локально на этом устройстве.'
});
Object.assign(COPY.en, {
  home:'Home',profile:'Profile',settings:'Settings',personalSpace:'YOUR SPACE',profileTitle:'Your profile',profileLead:'Personalize how you appear in Crypto Scanner.',localProfile:'On-device profile',memberBadge:'Here since 2026',savedCoins:'Saved coins',trackedExchanges:'Exchanges',editDetails:'PERSONAL DETAILS',editProfile:'Edit your profile',displayName:'Display name',username:'Username',aboutYou:'About you',bioPlaceholder:'A few words about you...',avatarColor:'Avatar color',saveChanges:'Save changes',localOnly:'Saved only in this browser. This is not an online account.',saved:'Changes saved ✓',invalidHandle:'Username: 3–24 characters, letters, digits and _ only.',preferences:'PERSONALIZATION',settingsTitle:'Settings',settingsLead:'Make Crypto Scanner feel like yours.',appearanceTitle:'Appearance',appearanceDescription:'Choose your preferred interface style.',darkMode:'Dark',lightMode:'Light',systemMode:'System',interfaceLanguage:'App language',languageDescription:'Switch between languages at any time.',accentTitle:'Accent color',accentDescription:'A personal touch for your workspace.',settingsNote:'Your language, theme and profile are saved locally on this device.'
});

const COINS = [["BTC","Bitcoin","#f0ba69"],["ETH","Ethereum","#adbfff"],["SOL","Solana","#a7f3d0"],["XRP","XRP","#c9d0d7"],["BNB","BNB","#ffe180"],["DOGE","Dogecoin","#e5c98a"],["ADA","Cardano","#a5c3ed"],["TRX","TRON","#ffaaa0"],["LINK","Chainlink","#8db2f6"],["AVAX","Avalanche","#faa29f"],["LTC","Litecoin","#c5d0e5"],["DOT","Polkadot","#f2a7d2"],["BCH","Bitcoin Cash","#b3e5a9"],["SUI","Sui","#a8e3ff"],["TON","Toncoin","#9ad5f6"],["APT","Aptos","#d4f1e7"],["NEAR","NEAR","#c2eea7"],["UNI","Uniswap","#f3add8"],["ETC","Ethereum Classic","#b1e3a2"],["XLM","Stellar","#c5cfdd"],["HBAR","Hedera","#ccc9f8"],["PEPE","Pepe","#b8d976"],["SHIB","Shiba Inu","#f6bf90"],["ARB","Arbitrum","#a7d4e9"],["OP","Optimism","#ffada8"],["WIF","dogwifhat","#f1c9a0"],["INJ","Injective","#b5d6ff"],["RENDER","Render","#ffb3a6"],["FIL","Filecoin","#b7ceff"],["ATOM","Cosmos","#a3a6e6"],["ALGO","Algorand","#d6e9fc"],["VET","VeChain","#a3e5f0"],["ICP","Internet Computer","#ecc8fa"],["AAVE","Aave","#b5ccff"],["MKR","Maker","#a3e5ca"],["GRT","The Graph","#c6adfd"],["SEI","Sei","#faada6"],["FET","Fetch.ai","#c7d4ff"],["WLD","Worldcoin","#e7e9ed"],["JUP","Jupiter","#c2f8b3"],["JTO","Jito","#c7fcdf"],["PYTH","Pyth Network","#decbfa"],["BONK","Bonk","#f8cc8a"],["FLOKI","Floki","#f9d5a4"],["STX","Stacks","#d1d0f9"],["TIA","Celestia","#cfb2ff"],["TAO","Bittensor","#d8d9ea"],["RUNE","THORChain","#91e1d1"],["EGLD","MultiversX","#a6d8e2"],["ENA","Ethena","#d2dcf5"],["ONDO","Ondo","#a1bdff"],["LDO","Lido DAO","#bed9ff"],["CRV","Curve DAO","#e9c28b"],["SAND","The Sandbox","#a6daf9"],["MANA","Decentraland","#e8b5bb"],["IMX","Immutable","#b7c9ff"],["XTZ","Tezos","#c7d8fc"],["KAVA","Kava","#e5b9bd"],["COMP","Compound","#b5eed6"],["ZEC","Zcash","#ead4a1"],["DASH","Dash","#aad6f9"],["XMR","Monero","#f2c49d"],["USDC","USD Coin","#a5d1fd"],["FDUSD","First Digital USD","#b6dcf0"]];
const COIN_META = Object.fromEntries(COINS.map(([sym,name,color])=>[sym,{name,color}]));
const EXCHANGES = ['Binance','Bybit','OKX','MEXC'];
const DEMO_PRICES = { BTC:91240,ETH:3118,SOL:147.83,XRP:2.14,BNB:654,DOGE:.202,ADA:.692,TRX:.284,LINK:17.89,AVAX:32.45,LTC:98.5,DOT:5.45,BCH:488,SUI:3.12,TON:5.63,APT:8.44,NEAR:4.55,UNI:11.48,ETC:27.15,XLM:.317,HBAR:.272,PEPE:.00001423,SHIB:.0000203,ARB:1.13,OP:1.58,WIF:1.78};
const storage = {
  getItem(key) { try { return localStorage.getItem(key); } catch { return null; } },
  setItem(key, value) { try { localStorage.setItem(key, value); } catch { /* file preview or private browsing */ } }
};
const state = {
  lang: storage.getItem('cs-lang') === 'en' ? 'en' : 'ru', page:'home', theme:['dark','light','system'].includes(storage.getItem('cs-theme')) ? storage.getItem('cs-theme') : 'dark', accent:['violet','mint','blue'].includes(storage.getItem('cs-accent')) ? storage.getItem('cs-accent') : 'violet', tab:'scanner', filter:'all', sort:'net', search:'',
  favorites:new Set(safeJson('cs-favorites',[])), exchanges:new Set(EXCHANGES), amount:500, fee:.1, visibleLimit:12,
  data:null, error:null, fetching:false, demo:new URLSearchParams(location.search).get('demo') === '1'||location.protocol==='file:', selected:null, lastSyncTimer:null,
  profile:(()=>{try {const p=JSON.parse(storage.getItem('cs-profile')||'null'); if (p && typeof p==='object') return {name:String(p.name||'Crypto Explorer').slice(0,32),handle:String(p.handle||'explorer').slice(0,24),bio:String(p.bio||'').slice(0,160),avatar:['violet','mint','blue','amber','rose'].includes(p.avatar)?p.avatar:'violet'};}catch{} return {name:'Crypto Explorer',handle:'explorer',bio:'',avatar:'violet'};})()
};
function safeJson(key, fallback) { try { const v=JSON.parse(storage.getItem(key)); return Array.isArray(v)?v:fallback; } catch { return fallback; } }
const $ = id => document.getElementById(id);
const t = key => COPY[state.lang][key] || key;
const money = (v, digits=2) => Number(v).toLocaleString(state.lang==='ru'?'ru-RU':'en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits});
const escapeHtml = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function formatPrice(v) { if (!Number.isFinite(v)) return '—'; return '$'+money(v, v<.0001?9:v<.01?7:v<1?5:v<100?3:2); }
function formatPct(v) { return !Number.isFinite(v) ? '—' : `${v>0?'+':''}${money(v,2)}%`; }
function formatPnl(v) { return !Number.isFinite(v) ? '—' : `${v>0?'+':''}$${money(v,2)}`; }
function coinIcon(symbol, small=false) { const c=COIN_META[symbol]?.color||'#b9ff72'; const src=window.__inlineCoins?.[symbol]||`/assets/coins/${encodeURIComponent(symbol.toLowerCase())}.svg`; return `<span class="coin-avatar coin-art${small?' small':''}" style="--coin-color:${c}"><img src="${src}" alt="" loading="lazy" onerror="this.hidden=true"></span>`; }

function buildDemo() {
  const pairs=COINS.map(([symbol,name],i)=>({symbol,name,pair:`${symbol}/USDT`,quotes:EXCHANGES.map((exchange,j)=>{
    const base=DEMO_PRICES[symbol] || Math.pow(10, ((i*17)%53)/10-2);
    const diff=[0,.0036,-.0015,.0054][j]*(i%4===0?1:i%4===1?-.6:i%4===2?.4:.13);
    const mid=base*(1+diff), spread=.00015;
    return {exchange,bid:mid*(1-spread/2),ask:mid*(1+spread/2),bidQty: Math.max(.001,30000/base),askQty: Math.max(.001,30000/base)};
  })}));
  return {status:'ok',asOf:new Date().toISOString(),pairs,availableCount:4,totalTracked:pairs.length,sources:EXCHANGES.map(name=>({name,available:true,count:pairs.length})),demo:true};
}
function calculate(buy,sell,amount=state.amount,fee=state.fee) {
  const buyFee=fee/100, sellFee=fee/100;
  const units=amount/(buy.ask*(1+buyFee));
  const revenue=units*sell.bid*(1-sellFee);
  const profit=revenue-amount;
  const gross=(sell.bid/buy.ask-1)*100;
  const usableBuy=buy.askQty===null?null:buy.askQty>=units;
  const usableSell=sell.bidQty===null?null:sell.bidQty>=units;
  const depth=usableBuy===false||usableSell===false?'limited':usableBuy===null||usableSell===null?'unknown':'enough';
  return {buy,sell,profit,net:profit/amount*100,gross,units,depth};
}
function opportunity(pair) {
  const quotes=pair.quotes.filter(q=>state.exchanges.has(q.exchange));
  if(quotes.length<2) return null;
  let best=null;
  for(const buy of quotes) for(const sell of quotes) {
    if(buy.exchange===sell.exchange) continue;
    const calculation=calculate(buy,sell);
    if (!best || calculation.net>best.net) best=calculation;
  }
  return best;
}
function opportunities() { return (state.data?.pairs||[]).map(pair=>({pair,op:opportunity(pair)})); }
function filteredRows() {
  let rows=opportunities();
  if (state.tab==='favorites'||state.filter==='watchlist') rows=rows.filter(x=>state.favorites.has(x.pair.symbol));
  if (state.filter==='positive'&&state.tab!=='markets') rows=rows.filter(x=>x.op && x.op.profit>0 && x.op.depth!=='limited');
  const term=state.search.toLowerCase().trim();
  if(term) rows=rows.filter(x=>`${x.pair.symbol} ${x.pair.name}`.toLowerCase().includes(term));
  rows.sort((a,b)=>state.sort==='symbol'?a.pair.symbol.localeCompare(b.pair.symbol):
    (state.sort==='gross'?(b.op?.gross??-Infinity)-(a.op?.gross??-Infinity):(b.op?.net??-Infinity)-(a.op?.net??-Infinity)));
  return rows;
}
function applyLanguage() {
  document.documentElement.lang=state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{ if(el.dataset.i18n==='profileTitle'||el.dataset.i18n==='settingsTitle'){el.innerHTML=`${t(el.dataset.i18n)}<span class="title-dot">.</span>`;} else el.textContent=t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder);});
  document.querySelectorAll('[data-lang]').forEach(el=>{el.classList.toggle('active',el.dataset.lang===state.lang);el.setAttribute('aria-pressed',String(el.dataset.lang===state.lang));});
  Array.from($('sortSelect').options).forEach(o=>{o.textContent=t(o.dataset.i18n);});
  $('modalClose').setAttribute('aria-label',state.lang==='ru'?'Закрыть':'Close');
  document.querySelectorAll('[data-page]').forEach(el=>{const selected=el.dataset.page===state.page; el.classList.toggle('active',selected); if(el.classList.contains('dock-button')){ if(selected)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current'); }});
}
function renderNav() {
  document.querySelectorAll('[data-tab]').forEach(el=>el.classList.toggle('active',state.page==='home'&&el.dataset.tab===state.tab));
  $('favoritesCount').textContent=state.favorites.size;
  $('profileFavCount').textContent=state.favorites.size;
  const home=state.page==='home';
  const fiat=state.page==='fiat', investments=state.page==='investments';
  $('fiatPage').hidden=!fiat; $('investmentsPage').hidden=!investments; $('portfolioPage').hidden=state.page!=='portfolio';
  document.querySelectorAll('[data-nav-target]').forEach(el=>el.classList.toggle('active',el.dataset.navTarget===state.page));
  $('pageCrumb').textContent=home?t(({scanner:'overview',markets:'markets',favorites:'favorites',guide:'howItWorks'})[state.tab]):t(state.page);
  $('profilePage').hidden=state.page!=='profile';
  $('settingsPage').hidden=state.page!=='settings';
  if(!home||state.tab!=='scanner')window.v6CompareOpen=false;
  // v0.6: Exchange Lab must never leak onto Profile, Settings or FX pages.
  const comparePanel=document.getElementById('quickCompare');
  if(comparePanel)comparePanel.hidden=!(home && state.tab==='scanner' && window.v6CompareOpen);
  const compareLauncher=document.getElementById('v6CompareLauncher');
  if(compareLauncher)compareLauncher.hidden=!(home && state.tab==='scanner');
  $('homeSubnav').hidden=!home;
  $('refreshButton').hidden=!home;
  $('topStatus').hidden=!home;
  const guide=home&&state.tab==='guide';
  ['hero','metrics','terminal','coinPulse'].forEach(id=>$(id).hidden=!home||guide);
  document.querySelector('.bottom-grid').hidden=!home||guide;
  document.querySelector('.footer').hidden=!home;
  $('notice').dataset.pageHidden=String(!home);
  $('guidePanel').hidden=!guide;
  if(home&&!guide){
    $('tableHeading').textContent=t(state.tab==='markets'?'markets':state.tab==='favorites'?'favorites':'opportunities');
    $('tableSubtitle').textContent=t('tableDesc');
    document.querySelector('.filter-pills').hidden=state.tab==='favorites';
  }
  if(guide) renderGuide();
  if((fiat||investments)&&typeof renderAssetMarkets==='function')renderAssetMarkets();
}
function applyAppearance(){
  const light=state.theme==='light'||(state.theme==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches);
  document.documentElement.dataset.theme=light?'light':'dark';
  document.documentElement.dataset.accent=state.accent;
  document.documentElement.style.colorScheme=light?'light':'dark';
  document.querySelector('meta[name="theme-color"]').content=light?'#edf0f8':'#080c12';
  document.querySelectorAll('[data-theme-choice]').forEach(el=>{const active=el.dataset.themeChoice===state.theme;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('button[data-accent]').forEach(el=>{const active=el.dataset.accent===state.accent;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
}
function profileInitials(){return state.profile.name.trim().split(/\s+/).slice(0,2).map(part=>part[0]||'').join('').toLocaleUpperCase()||'CS';}
function renderProfile(){
  $('profileAvatar').textContent=profileInitials();
  $('topAvatar').textContent=profileInitials();
  $('profileAvatar').dataset.avatar=state.profile.avatar;
  if(typeof updateAvatarImages==='function') updateAvatarImages();
  $('topAvatar').dataset.avatar=state.profile.avatar;
  $('profileDisplayName').textContent=state.profile.name;
  $('profileDisplayHandle').textContent='@'+state.profile.handle;
  $('profileDisplayBio').textContent=state.profile.bio||'✦ Crypto Scanner';
  document.querySelectorAll('[data-avatar]').forEach(el=>{const active=el.dataset.avatar===state.profile.avatar;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
}
function populateProfileForm(){
  $('profileName').value=state.profile.name;
  $('profileHandle').value=state.profile.handle;
  $('profileBio').value=state.profile.bio;
  $('profileSaved').textContent='';
}
function changePage(next){
  if(!['home','fiat','investments','portfolio','profile','settings'].includes(next))return;
  state.page=next;
  if(next==='profile')populateProfileForm();
  if(next==='portfolio'&&typeof fetchAssetMarkets==='function')fetchAssetMarkets();
  if((next==='fiat'||next==='investments')&&typeof fetchAssetMarkets==='function') fetchAssetMarkets();
  render();
  window.scrollTo(0,0);
}
function renderGuide() {
  $('guidePanel').innerHTML=`<div class="terminal-head"><div><div class="section-eyebrow"><span class="accent-line"></span>${t('information')}</div><h2>${t('guideTitle')}</h2><p class="section-subtitle">${t('guideDesc')}</p></div></div><div class="guide-grid">${[1,2,3,4].map(n=>`<article class="guide-item"><span class="guide-no">0${n} / 04</span><h4>${t('guide'+n+'Title')}</h4><p>${t('guide'+n+'Text')}</p></article>`).join('')}</div><div class="calc-note" style="margin:0 26px 26px"><span>ⓘ</span><p>${t('guideWarning')}</p></div>`;
}
function renderStatus(){
  const el=$('topStatus');
  const active=state.data?.availableCount||0;
  const type=state.demo?'demo':state.error||active===0?'error':active===4?'live':'live';
  el.className=`top-status ${type}`;
  const label=state.demo?'demo':state.error||active===0?'offline':active<4?'partial':'live';
  el.innerHTML=`<span class="status-dot"></span><span>${t(label)}</span>`;
  $('refreshButton').classList.toggle('spinning',state.fetching);
  const notice=$('notice');
  const liveLink=state.demo?` <a href="/" data-go-live="1">${t('liveLink')}</a>`:` <a href="/?demo=1" data-demo="1">${t('demoLink')}</a>`;
  if(state.demo){notice.hidden=false;notice.innerHTML=`${t('demoNotice')}${liveLink}`;}
  else if(state.error||active===0) {notice.hidden=false;notice.innerHTML=`${t('unavailNotice')}${liveLink}`;}
  else if(active<4) {notice.hidden=false;notice.textContent=t('partialNotice');}
  else notice.hidden=true;
  if(state.page!=='home')notice.hidden=true;
  const time=state.data?.asOf?new Date(state.data.asOf):null;
  $('lastSyncText').textContent=time?`${t('updated')} ${time.toLocaleTimeString(state.lang==='ru'?'ru-RU':'en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}`:t('waitingSync');
  document.querySelector('.small-live-dot').classList.toggle('live',!!state.data&&active>0);
}
function renderMetrics(){
  const eligible=opportunities().filter(x=>x.op);
  const positive=eligible.filter(x=>x.op.profit>0&&x.op.depth!=='limited');
  const best=eligible.reduce((a,b)=>(!a||b.op.gross>a.op.gross)?b:a,null);
  $('metricPairs').textContent=state.data?.pairs?.length??'—';
  $('metricPositive').textContent=state.data?positive.length:'—';
  $('metricSpread').textContent=best?formatPct(best.op.gross):'—';
  $('metricBestCoin').textContent=best?best.pair.pair:'—';
  $('metricExchanges').textContent=state.data?`${state.data.availableCount}/4`:'—';
}
function renderExchangeControls(){
  $('exchangeControls').innerHTML=EXCHANGES.map(name=>{
    const source=state.data?.sources?.find(s=>s.name===name);
    return `<button type="button" data-exchange="${name}" aria-pressed="${state.exchanges.has(name)}" class="exchange-toggle ${state.exchanges.has(name)?'active':''} ${source&&!source.available?'offline':''}" title="${source&&!source.available?t('unavailable'):t('connected')}"><i></i>${name}</button>`;
  }).join('');
}
function renderHeader(){
  $('tableHeader').innerHTML=`<tr><th>${t('asset')}</th><th>${t('buyOn')}</th><th>${t('sellOn')}</th><th>${t('grossSpread')}</th><th>${t('netProfit')}</th><th>${t('action')}</th></tr>`;
}
function renderRows(){
  const rows=filteredRows();
  const fullList=state.search.trim()||state.tab==='favorites'||state.filter==='watchlist';
  const visible=fullList?rows:rows.slice(0,state.visibleLimit);
  $('showMoreWrap').hidden=visible.length>=rows.length;
  const tbody=$('tableRows');
  if (!state.data) {
    tbody.innerHTML=`<tr><td colspan="6" class="empty-state"><strong>${t('noDataTitle')}</strong>${t('noDataText')}</td></tr>`;
  } else if (!rows.length) {
    const fav=state.tab==='favorites'||state.filter==='watchlist';
    tbody.innerHTML=`<tr><td colspan="6" class="empty-state"><strong>${t(fav&&state.favorites.size===0?'favEmpty':state.filter==='positive'?'noPositiveTitle':'noneTitle')}</strong>${t(fav&&state.favorites.size===0?'favEmptyText':state.filter==='positive'?'noPositiveText':'noneText')}</td></tr>`;
  } else {
    tbody.innerHTML=visible.map(({pair,op})=>{
      const favorite=state.favorites.has(pair.symbol);
      return `<tr class="data-row" data-coin="${pair.symbol}" tabindex="0" aria-label="${escapeHtml(pair.pair)} ${t('detail')}">
        <td><div class="coin-cell"><button type="button" class="star-btn ${favorite?'active':''}" data-star="${pair.symbol}" aria-label="${favorite?t('favoriteRemoved'):t('favoriteAdded')}" aria-pressed="${favorite}">${favorite?'★':'☆'}</button>${coinIcon(pair.symbol)}<div><span class="coin-main">${pair.symbol}<span style="font-weight:500;color:#71808b"> / USDT</span></span><span class="coin-desc">${escapeHtml(pair.name)}</span></div></div></td>
        <td data-label="${t('buyOn')}">${op?`<span class="exchange-name">${op.buy.exchange}</span><span class="exchange-value">${formatPrice(op.buy.ask)}</span>`:'—'}</td>
        <td data-label="${t('sellOn')}">${op?`<span class="exchange-name">${op.sell.exchange}</span><span class="exchange-value">${formatPrice(op.sell.bid)}</span>`:'—'}</td>
        <td data-label="${t('grossSpread')}"><strong class="${op?.gross>0?'spread-positive':op?.gross<0?'spread-negative':'spread-neutral'}">${op?formatPct(op.gross):'—'}</strong></td>
        <td data-label="${t('netProfit')}">${op?`<span class="pill-result ${op.profit<0?'loss':''}">${formatPnl(op.profit)}</span>${op.depth==='limited'?`<span class="depth-flag">${t('insufficient')}</span>`:op.depth==='unknown'?`<span class="depth-flag">${t('depthUnknown')}</span>`:''}`:'—'}</td>
        <td>${op?'<span class="row-detail">›</span>':'—'}</td>
      </tr>`;
    }).join('');
  }
  $('resultCount').textContent=`${t('showing')} ${visible.length} ${t('of')} ${rows.length} ${t('pairs')}`;
}
function renderFeatured(){
  const candidates=opportunities().filter(x=>x.op);
  candidates.sort((a,b)=>b.op.net-a.op.net);
  const best=candidates[0];
  if(!best){ $('featuredSignal').innerHTML=`<div class="muted-message"><strong>${t('noDataTitle')}</strong>${t('notEnoughExchanges')}</div>`;return; }
  $('featuredSignal').innerHTML=`<div class="featured-coin">${coinIcon(best.pair.symbol)}<div><strong>${best.pair.symbol} / USDT</strong><small>${escapeHtml(best.pair.name)}</small></div><div class="featured-right"><strong>${formatPct(best.op.net)}</strong><small>${t('estimated')}</small></div></div>
    <div class="featured-route"><div><span>${t('buy')}</span><strong>${best.op.buy.exchange}</strong></div><span class="arrow">⟶</span><div><span>${t('sell')}</span><strong>${best.op.sell.exchange}</strong></div></div>
    <button type="button" class="featured-cta" data-open="${best.pair.symbol}">${t('viewCalculation')} <span>↗</span></button>`;
}
function renderFilters(){
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===state.filter));
  $('sortSelect').value=state.sort;
  $('searchInput').value=state.search;
  $('tradeSize').value=state.amount;
  $('feeInput').value=state.fee;
}
function renderModal(){
  if(!state.selected||!state.data) return;
  const pair=state.data.pairs.find(x=>x.symbol===state.selected);
  if(!pair){closeModal();return;}
  const op=opportunity(pair);
  $('modalTitle').textContent=pair.pair;
  let content='';
  if(op){
    content=`<div class="modal-route"><div><small>${t('buy')} · ASK</small><strong>${op.buy.exchange}</strong></div><span style="color:#b9ff72">→</span><div><small>${t('sell')} · BID</small><strong>${op.sell.exchange}</strong></div></div>`;
  }
  content+=`<table class="modal-table"><thead><tr><th>${t('exchange')}</th><th>${t('bid')}</th><th>${t('ask')}</th></tr></thead><tbody>${pair.quotes.map(q=>`<tr><td>${q.exchange}</td><td>${formatPrice(q.bid)}</td><td>${formatPrice(q.ask)}</td></tr>`).join('')}</tbody></table>`;
  if(op){
    content+=`<div class="modal-summary"><div><small>${t('grossSpread')}</small><strong>${formatPct(op.gross)}</strong></div><div style="text-align:right"><small>${t('estimatedProfit')} (${money(state.amount,0)} USDT)</small><strong style="color:${op.profit>=0?'var(--accent)':'#ff8f85'}">${formatPnl(op.profit)}</strong></div></div>`;
    content+=`<p class="modal-note ${op.depth!=='enough'?'warning':''}">ⓘ ${t(op.depth==='limited'?'limitedDepth':op.depth==='unknown'?'unknownDepth':'enoughDepth')}</p>`;
  } else content+=`<p class="modal-note warning">${t('notEnoughExchanges')}</p>`;
  content+=`<p class="modal-note">${t('profitNote')}</p>`;
  $('modalBody').innerHTML=content;
}
function closeModal(){ state.selected=null; $('overlay').hidden=true; document.body.style.overflow=''; }
function openModal(symbol){state.selected=symbol;$('overlay').hidden=false;document.body.style.overflow='hidden';renderModal();}
function render(){
  applyLanguage();applyAppearance();renderNav();renderStatus();renderMetrics();renderExchangeControls();renderHeader();renderRows();renderFeatured();renderFilters();renderModal();renderProfile();
}
async function fetchData(){
  if(state.demo){state.data=buildDemo();state.error=null;render();return;}
  if(state.fetching)return;
  state.fetching=true; renderStatus();
  try {
    const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),14000);
    try{
      const response=await fetch('/api/scan',{cache:'no-store',signal:controller.signal});
      const value=await response.json();
      if(!response.ok || !value.availableCount) throw new Error('No live quotes');
      state.data=value;state.error=null;
    } finally {clearTimeout(timer);}
  }catch(err){state.error=err.message;state.data=null;}
  finally{state.fetching=false;render();}
}
function downloadCsv(){
  const rows=filteredRows(); if(!rows.length){alert(t('exportEmpty'));return;}
  const cols=['pair','buy_exchange','buy_ask','sell_exchange','sell_bid','gross_spread_pct','net_profit_usdt','net_return_pct','depth_status','simulation_amount_usdt','fee_per_side_pct','mode'];
  const csv=[cols.join(','),...rows.map(({pair,op})=>[pair.pair,op?.buy.exchange||'',op?.buy.ask||'',op?.sell.exchange||'',op?.sell.bid||'',op?.gross??'',op?.profit??'',op?.net??'',op?.depth||'',state.amount,state.fee,state.demo?'DEMO':'LIVE'].join(','))].join('\r\n');
  const url=URL.createObjectURL(new Blob(['\ufeff',csv],{type:'text/csv;charset=utf-8;'}));
  const a=document.createElement('a');a.href=url;a.download=`crypto-scanner-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
}
function changeParam(type,value){
  const num=Number(value);
  if(type==='amount'&&Number.isFinite(num)&&num>=10&&num<=100000){state.amount=num;renderMetrics();renderRows();renderFeatured();renderModal();return;}
  if(type==='fee'&&Number.isFinite(num)&&num>=0&&num<=3){state.fee=num;renderMetrics();renderRows();renderFeatured();renderModal();return;}
}
function bind(){
  document.addEventListener('click',event=>{
    const page=event.target.closest('[data-page]'); if(page){changePage(page.dataset.page);return;}
    const go=event.target.closest('[data-nav-target]'); if(go){changePage(go.dataset.navTarget);return;}
    const theme=event.target.closest('[data-theme-choice]'); if(theme){state.theme=theme.dataset.themeChoice;storage.setItem('cs-theme',state.theme);applyAppearance();return;}
    const accent=event.target.closest('button[data-accent]'); if(accent){state.accent=accent.dataset.accent;storage.setItem('cs-accent',state.accent);applyAppearance();return;}
    const avatar=event.target.closest('[data-avatar]'); if(avatar){state.profile.avatar=avatar.dataset.avatar;document.querySelectorAll('[data-avatar]').forEach(el=>el.classList.toggle('active',el===avatar));renderProfile();return;}
    const star=event.target.closest('[data-star]');
    if(star){event.stopPropagation();const s=star.dataset.star;state.favorites.has(s)?state.favorites.delete(s):state.favorites.add(s);storage.setItem('cs-favorites',JSON.stringify([...state.favorites]));render();return;}
    const tab=event.target.closest('[data-tab]');if(tab){state.page='home';state.tab=tab.dataset.tab;state.filter='all';state.search='';state.visibleLimit=12;render();return;}
    const lang=event.target.closest('[data-lang]');if(lang){state.lang=lang.dataset.lang;storage.setItem('cs-lang',state.lang);render();return;}
    const filter=event.target.closest('[data-filter]');if(filter){state.filter=filter.dataset.filter;state.visibleLimit=12;render();return;}
    const exchange=event.target.closest('[data-exchange]');if(exchange){const v=exchange.dataset.exchange;state.exchanges.has(v)?state.exchanges.delete(v):state.exchanges.add(v);renderMetrics();renderExchangeControls();renderRows();renderFeatured();renderModal();return;}
    const opener=event.target.closest('[data-open]');if(opener){openModal(opener.dataset.open);return;}
    const dataRow=event.target.closest('tr[data-coin]');if(dataRow){openModal(dataRow.dataset.coin);return;}
    if(event.target.id==='overlay')closeModal();
  });
  $('profileForm').addEventListener('submit',event=>{
    event.preventDefault();
    const name=$('profileName').value.trim().slice(0,32);
    const handle=$('profileHandle').value.trim().replace(/^@/,'').slice(0,24);
    if(!name||!(/^[a-zA-Z0-9_]{3,24}$/).test(handle)){$('profileSaved').textContent=t('invalidHandle');return;}
    state.profile={name,handle,bio:$('profileBio').value.trim().slice(0,160),avatar:state.profile.avatar};
    storage.setItem('cs-profile',JSON.stringify(state.profile));renderProfile();$('profileSaved').textContent=t('saved');
    if(typeof syncOnlineProfile==='function')syncOnlineProfile();
  });
  if(window.matchMedia)window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',()=>{if(state.theme==='system')applyAppearance();});
  $('refreshButton').addEventListener('click' ,()=>{if(state.demo){state.data=buildDemo();render();}else fetchData();});
  $('searchInput').addEventListener('input',event=>{state.search=event.target.value;state.visibleLimit=12;renderRows();});
  $('showMoreButton').addEventListener('click',()=>{state.visibleLimit+=12;renderRows();});
  $('sortSelect').addEventListener('change',event=>{state.sort=event.target.value;renderRows();});
  $('tradeSize').addEventListener('change',event=>{changeParam('amount',event.target.value);event.target.value=state.amount;});
  $('feeInput').addEventListener('change',event=>{changeParam('fee',event.target.value);event.target.value=state.fee;});
  $('exportButton').addEventListener('click',downloadCsv);
  $('modalClose').addEventListener('click',closeModal);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&state.selected)closeModal();
    if((event.key==='Enter'||event.key===' ')&&event.target.matches('tr[data-coin]')){event.preventDefault();openModal(event.target.dataset.coin);}
  });
}
function init(){
  const guide=document.createElement('section');guide.id='guidePanel';guide.className='terminal';guide.hidden=true;
  document.querySelector('.bottom-grid').before(guide);
  bind();render();fetchData();
  setInterval(()=>{if(!document.hidden&&!state.demo)fetchData();},45_000);
}
init();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
