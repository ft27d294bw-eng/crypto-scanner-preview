'use strict';
// v0.3 extra navigation pages, account UI and local profile image enhancements.
Object.assign(COPY.ru,{
  assetNavigation:'ДРУГИЕ РЫНКИ',fiat:'Валюты',investments:'Инвестиции',globalMarkets:'ГЛОБАЛЬНЫЕ РЫНКИ',fiatTitle:'Валютный рынок',fiatLead:'Движение мировых валют и тренды за последние торговые дни.',fxOverview:'CURRENCY INTELLIGENCE',fxHeroTitle:'Весь валютный рынок. Один экран.',fxHeroDesc:'Сравнивайте валютные пары и динамику без лишнего шума.',fxPairs:'ОБЗОР ВАЛЮТ',fiatWatch:'Курсы валют',refreshMarkets:'Обновить',fxDisclaimer:'Справочные курсы по рабочим дням. Не являются котировками для мгновенного обмена.',investmentResearch:'МЕТАЛЛЫ И ИНВЕСТИЦИИ',investmentsTitle:'Инвестиции',investmentsLead:'Золото и серебро — данные с источником и временем обновления.',preciousMetals:'PRECIOUS METALS',goldHeroTitle:'Классика инвестиций.',goldHeroDesc:'Следите за драгоценными металлами в одном красивом пространстве.',metalsTitle:'ДРАГОЦЕННЫЕ МЕТАЛЛЫ',metalsWatch:'Золото и серебро',metalDisclaimer:'Доллары США за тройскую унцию. Бесплатные котировки задерживаются примерно на 15 минут.',metalProvided:'Источник:',dataLoading:'Загрузка рыночных данных…',dataError:'Нет связи с поставщиком данных. Попробуйте обновить.',sampleMarket:'ДЕМО-ПРИМЕР · ЦЕНЫ НЕ РЕАЛЬНЫЕ',refDate:'Справочный курс',priceDate:'Данные на',weeklyChange:'Изменение за несколько торговых дней',priceUnverified:'Изменение не предоставлено',gold:'Золото',silver:'Серебро',account:'Аккаунт по email',authEyebrow:'ВАШ АККАУНТ',authLead:'Подтвердите email, чтобы войти и синхронизировать профиль.',emailVerified:'Email подтверждён',logout:'Выйти',register:'Регистрация',signIn:'Войти',password:'Пароль',createAccount:'Создать аккаунт',authHelper:'После регистрации подтвердите адрес по ссылке из письма.',signInButton:'Войти в аккаунт',authOffline:'Регистрация работает на запущенном сервере. В отдельном демо-файле она недоступна.',authSuccess:'Проверьте почту и подтвердите email. После этого войдите.',authFailed:'Не удалось связаться с сервером.',loggedOut:'Вы вышли из аккаунта.',profileSynced:'Профиль синхронизирован ✓',authVerified:'Email подтверждён. Теперь войдите в аккаунт.',authInvalid:'Ссылка для подтверждения истекла или неверна.',uploadAvatar:'Своё фото профиля',uploadAvatarHint:'JPG, PNG, WebP · до 3 МБ',choosePhoto:'Выбрать',removePhoto:'Убрать',photoTooLarge:'Изображение должно быть меньше 3 МБ.',photoInvalid:'Не удалось обработать изображение.',localOnly:'Если вы не вошли, профиль хранится только на этом устройстве.'
});
Object.assign(COPY.en,{
  assetNavigation:'OTHER MARKETS',fiat:'Currencies',investments:'Investments',globalMarkets:'GLOBAL MARKETS',fiatTitle:'Currency markets',fiatLead:'Worldwide FX rates and trends across recent trading days.',fxOverview:'CURRENCY INTELLIGENCE',fxHeroTitle:'All currencies. One screen.',fxHeroDesc:'Compare global currency pairs and price direction at a glance.',fxPairs:'FX OVERVIEW',fiatWatch:'Currency rates',refreshMarkets:'Refresh',fxDisclaimer:'Daily reference rates on business days, not executable forex quotes.',investmentResearch:'METALS & INVESTMENTS',investmentsTitle:'Investments',investmentsLead:'Gold and silver, with clear timestamps and data sources.',preciousMetals:'PRECIOUS METALS',goldHeroTitle:'The timeless assets.',goldHeroDesc:'Explore precious metals in a beautiful, focused workspace.',metalsTitle:'PRECIOUS METALS',metalsWatch:'Gold & silver',metalDisclaimer:'USD per troy ounce. Free metal quotes are delayed about 15 minutes.',metalProvided:'Data provider:',dataLoading:'Loading market data…',dataError:'Market source unavailable. Try refreshing.',sampleMarket:'DEMO SAMPLE · NOT REAL PRICES',refDate:'Reference rate',priceDate:'Last observation',weeklyChange:'Change over recent trading days',priceUnverified:'Change unavailable',gold:'Gold',silver:'Silver',account:'Email account',authEyebrow:'YOUR ACCOUNT',authLead:'Verify email to sign in and sync your profile.',emailVerified:'Email verified',logout:'Sign out',register:'Sign up',signIn:'Log in',password:'Password',createAccount:'Create account',authHelper:'Verify your address with the email link after registration.',signInButton:'Sign in',authOffline:'Registration requires the running server. It is unavailable in the standalone demo file.',authSuccess:'Check your inbox to verify your email, then log in.',authFailed:'Could not reach the server.',loggedOut:'Signed out.',profileSynced:'Profile synced ✓',authVerified:'Email verified. You can now sign in.',authInvalid:'The verification link is invalid or expired.',uploadAvatar:'Your profile picture',uploadAvatarHint:'JPG, PNG, WebP · up to 3 MB',choosePhoto:'Choose',removePhoto:'Remove',photoTooLarge:'Image must be under 3 MB.',photoInvalid:'Could not process this image.',localOnly:'If signed out, the profile is saved on this device only.'
});

const assetState={data:null,loading:false,error:null,authUser:null,authMode:'register',avatarImage:storage.getItem('cs-avatar-image')||null};
const DEMO_FX=[
 {symbol:'USD/PLN',price:3.67,change:.42,points:[3.58,3.60,3.59,3.62,3.61,3.64,3.67]},
 {symbol:'EUR/USD',price:1.16,change:-.33,points:[1.18,1.17,1.18,1.175,1.17,1.165,1.16]},
 {symbol:'EUR/PLN',price:4.26,change:.21,points:[4.21,4.22,4.23,4.22,4.25,4.24,4.26]},
 {symbol:'GBP/USD',price:1.31,change:.16,points:[1.29,1.30,1.29,1.30,1.31]},
 {symbol:'USD/JPY',price:154.8,change:-.18,points:[155.5,155.1,155.6,155.3,154.8]},
 {symbol:'USD/CHF',price:.81,change:.24,points:[.803,.805,.808,.806,.81]},
 {symbol:'USD/UAH',price:41.8,change:.11,points:[41.6,41.7,41.6,41.75,41.8]},
 {symbol:'USD/TRY',price:43.1,change:.32,points:[42.8,42.9,43,43.05,43.1]},
 {symbol:'USD/CAD',price:1.38,change:.06,points:[1.37,1.376,1.375,1.379,1.38]},
 {symbol:'AUD/USD',price:.65,change:.35,points:[.645,.646,.648,.647,.65]}
];
// Synthetic demo-only extra currency pairs, generated from synthetic cross rates.
const V6_DEMO_RATES={USD:1,EUR:.86,PLN:3.67,GBP:.75,JPY:154.8,CHF:.81,UAH:41.8,TRY:43.1,CAD:1.38,AUD:1.54,CNY:7.24,HKD:7.77,SGD:1.29,SEK:9.6,NOK:10.2,DKK:6.39,CZK:20.6,HUF:329,NZD:1.7,INR:89.2,KRW:1430,BRL:5.25,MXN:18.2};
for(const [a,b] of [['USD','CNY'],['USD','SGD'],['USD','HKD'],['EUR','CNY'],['EUR','GBP'],['EUR','CZK'],['EUR','SEK'],['EUR','NOK'],['EUR','HUF'],['USD','INR'],['USD','KRW'],['USD','BRL'],['USD','MXN'],['NZD','USD']]){
 const price=V6_DEMO_RATES[b]/V6_DEMO_RATES[a];
 DEMO_FX.push({symbol:`${a}/${b}`,price,change:null,points:[price*.985,price*.992,price*1.008,price],date:'DEMO'});
}
const DEMO_METALS=[{symbol:'XAU',name:'Gold',price:4050.20,currency:'USD',unit:'troy ounce',change:null,asOf:null,source:'DEMO'}, {symbol:'XAG',name:'Silver',price:48.30,currency:'USD',unit:'troy ounce',change:null,asOf:null,source:'DEMO'}];

function sparkline(points,up){
 if(!points||points.length<2)return '<div class="no-chart">—</div>';
 const min=Math.min(...points),max=Math.max(...points),range=Math.max(max-min,Math.abs(max)*.0001);
 const coords=points.map((p,i)=>`${(i/(points.length-1)*140).toFixed(1)},${(44-(p-min)/range*34).toFixed(1)}`);
 return `<svg class="spark-chart ${up?'up':'down'}" viewBox="0 0 140 50" preserveAspectRatio="none" aria-hidden="true"><polyline points="${coords.join(' ')}"/></svg>`;
}
function priceDisplay(v){if(!Number.isFinite(v))return '—';return Number(v).toLocaleString(state.lang==='ru'?'ru-RU':'en-US',{minimumFractionDigits:2,maximumFractionDigits:v>=100?2:4});}
function assetTrend(change){if(change===null||!Number.isFinite(change))return `<span class="asset-flat">—</span>`;const up=change>=0;return `<span class="asset-trend ${up?'positive':'negative'}">${up?'↗':'↘'} ${change>=0?'+':''}${change.toFixed(2)}%</span>`;}
const CURRENCIES={USD:['US dollar','🇺🇸'],EUR:['Euro','🇪🇺'],PLN:['Polish złoty','🇵🇱'],GBP:['British pound','🇬🇧'],JPY:['Japanese yen','🇯🇵'],CHF:['Swiss franc','🇨🇭'],UAH:['Ukrainian hryvnia','🇺🇦'],TRY:['Turkish lira','🇹🇷'],CAD:['Canadian dollar','🇨🇦'],AUD:['Australian dollar','🇦🇺'],CNY:['Chinese yuan','🇨🇳'],HKD:['Hong Kong dollar','🇭🇰'],SGD:['Singapore dollar','🇸🇬'],SEK:['Swedish krona','🇸🇪'],NOK:['Norwegian krone','🇳🇴'],DKK:['Danish krone','🇩🇰'],CZK:['Czech koruna','🇨🇿'],HUF:['Hungarian forint','🇭🇺'],NZD:['New Zealand dollar','🇳🇿'],INR:['Indian rupee','🇮🇳'],KRW:['South Korean won','🇰🇷'],BRL:['Brazilian real','🇧🇷'],MXN:['Mexican peso','🇲🇽']};
function marketCard(item,metal=false){
 const sym=item.symbol, parts=sym.split('/');const icon=metal?(sym==='XAU'?'Au':'Ag'):CURRENCIES[parts[0]]?.[1]||'◈';
 const name=metal?t(sym==='XAU'?'gold':'silver'):(CURRENCIES[parts[0]]?.[0]||parts[0]);
 const change=metal?item.change??null:item.change;
 const isUp=change>=0;
 const points=item.points||null;
 const note=metal?`${escapeHtml(item.source||'')}${item.asOf?' · '+new Date(item.asOf).toLocaleString(state.lang==='ru'?'ru-RU':'en-US',{dateStyle:'short',timeStyle:'short'}):''}`:`${t('refDate')}${item.date?' · '+escapeHtml(item.date):''}`;
 return `<article class="asset-tile glass-panel"><div class="asset-card-top"><div class="asset-round-icon ${metal?(sym==='XAU'?'gold':'silver'):'fx'}">${icon}</div><div class="asset-identity"><strong>${escapeHtml(sym)}</strong><span>${escapeHtml(name)}</span></div><div class="asset-corner">✦</div></div><div class="asset-card-body"><div><div class="asset-last-label">${metal?'USD / oz':'MID RATE'}</div><div class="asset-price">${metal?'$':''}${priceDisplay(item.price)}</div><div class="asset-change">${assetTrend(change)}<small>${change==null?'':t('weeklyChange')}</small></div></div>${sparkline(points,isUp)}</div><div class="asset-card-foot"><span>${note}</span><span class="asset-dot">●</span></div></article>`;
}
function renderAssetMarkets(){
 const loading=!state.demo&&assetState.loading;
 const data=state.demo?{fx:DEMO_FX,metals:DEMO_METALS,status:'demo'}:assetState.data;
 const empty=`<div class="markets-empty"><span class="markets-empty-symbol">◌</span><strong>${t(loading?'dataLoading':'dataError')}</strong><p>${t(loading?'dataLoading':'dataError')}</p></div>`;
 $('fxGrid').innerHTML=data?.fx?.length?data.fx.map(x=>marketCard(x)).join(''):empty;
 $('metalGrid').innerHTML=data?.metals?.length?data.metals.map(x=>marketCard(x,true)).join(''):empty;
 $('fxDataNote').textContent=state.demo?t('sampleMarket'):data?.fx?.length?`${t('priceDate')}: ${data.fx[0].date||'—'} · Frankfurter`:t(loading?'dataLoading':'dataError');
 const fxDisclaimer=$('fiatPage').querySelector('.market-disclaimer');
 fxDisclaimer.textContent=state.demo?t('sampleMarket')+' · '+t('fxDisclaimer'):t('fxDisclaimer');
 const metalDisclaimer=$('investmentsPage').querySelector('.market-disclaimer');
 metalDisclaimer.textContent=state.demo?t('sampleMarket')+' · '+t('metalDisclaimer'):t('metalDisclaimer');
}
async function fetchAssetMarkets(force=false){
 if(state.demo){renderAssetMarkets();return;}
 if(assetState.loading)return;
 if(assetState.data&&!force&&Date.now()-assetState.fetchedAt<15*60_000){renderAssetMarkets();return;}
 assetState.loading=true;renderAssetMarkets();
 try{const resp=await fetch('/api/markets',{cache:'no-store'});const data=await resp.json();if(!resp.ok||!data.fx?.length&&!data.metals?.length)throw Error('No market data');assetState.data=data;assetState.error=null;assetState.fetchedAt=Date.now();}
 catch(err){assetState.error=err.message;assetState.data=null;}
 finally{assetState.loading=false;renderAssetMarkets();}
}
function updateAvatarImages(){
 for(const el of [$('profileAvatar'),$('topAvatar')]){
   const existing=el.querySelector('img');if(existing)existing.remove();
   if(assetState.avatarImage){el.textContent='';const img=document.createElement('img');img.src=assetState.avatarImage;img.alt='';img.className='uploaded-avatar-image';el.appendChild(img);} else el.textContent=profileInitials();
 }
 $('removeAvatar').hidden=!assetState.avatarImage;
}
function setAvatarImage(data){assetState.avatarImage=data;storage.setItem('cs-avatar-image',data||'');updateAvatarImages();if(assetState.authUser)syncOnlineProfile();}
async function processAvatar(file){
 if(!file)return;if(file.size>3*1024*1024){$('profileSaved').textContent=t('photoTooLarge');return;}
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)){$('profileSaved').textContent=t('photoInvalid');return;}
 let url;
 try{
   url=URL.createObjectURL(file);
   const img=new Image();img.decoding='async';img.src=url;await img.decode();
   const size=192,canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;
   const c=canvas.getContext('2d',{alpha:false});const ratio=Math.max(size/img.width,size/img.height),w=img.width*ratio,h=img.height*ratio;
   c.drawImage(img,(size-w)/2,(size-h)/2,w,h);
   const data=canvas.toDataURL('image/jpeg',.78);
   if(data.length>260000)throw Error('Too big');
   setAvatarImage(data);$('profileSaved').textContent=t('saved');
 }catch(e){$('profileSaved').textContent=t('photoInvalid');}finally{if(url)URL.revokeObjectURL(url);$('avatarFile').value='';}
}
async function apiAuth(path,payload){
 const r=await fetch('/api/auth/'+path,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
 const data=await r.json();if(!r.ok)throw Error(data.error||'Request failed');return data;
}
function renderAuth(){
 $('authLoggedIn').hidden=!assetState.authUser;
 $('authLoggedOut').hidden=!!assetState.authUser;
 if(assetState.authUser)$('authEmail').textContent=assetState.authUser.email;
 document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b.dataset.authTab===assetState.authMode));
 $('authSubmit').textContent=t(assetState.authMode==='register'?'createAccount':'signInButton');
 $('authPassword').autocomplete=assetState.authMode==='register'?'new-password':'current-password';
}
async function syncOnlineProfile(){
 if(!assetState.authUser)return;
 try{
   const user=(await apiAuth('profile',{...state.profile,avatarImage:assetState.avatarImage})).user;
   assetState.authUser=user;$('profileSaved').textContent=t('profileSynced');
 }catch(err){$('profileSaved').textContent=err.message;}
}
async function loadAuth(){
 if(location.protocol==='file:'){$('authMessage').textContent=t('authOffline');return;}
 try{const r=await fetch('/api/auth/me',{credentials:'same-origin',cache:'no-store'});if(!r.ok)throw Error('Server unavailable');const data=await r.json();
   if(data.user){assetState.authUser=data.user;state.profile={name:data.user.name,handle:data.user.handle,bio:data.user.bio,avatar:data.user.avatar};assetState.avatarImage=data.user.avatarImage;storage.setItem('cs-profile',JSON.stringify(state.profile));storage.setItem('cs-avatar-image',assetState.avatarImage||'');renderProfile();populateProfileForm();}
 }catch(e){$('authMessage').textContent=t('authOffline');}
 renderAuth();
}
const q=new URLSearchParams(location.search);
if(q.get('verification')){
  document.addEventListener('DOMContentLoaded',()=>{});
  $('authMessage').textContent=t(q.get('verification')==='success'?'authVerified':'authInvalid');
}
$('avatarFile').addEventListener('change',e=>processAvatar(e.target.files[0]));
$('removeAvatar').addEventListener('click',()=>{setAvatarImage(null);$('profileSaved').textContent=t('saved');});
document.querySelectorAll('[data-market-refresh]').forEach(b=>b.addEventListener('click',()=>fetchAssetMarkets(true)));
document.querySelectorAll('[data-auth-tab]').forEach(b=>b.addEventListener('click',()=>{assetState.authMode=b.dataset.authTab;$('authMessage').textContent='';renderAuth();}));
$('authForm').addEventListener('submit',async e=>{
 e.preventDefault();const btn=$('authSubmit');const email=$('authEmailInput').value.trim(),password=$('authPassword').value;
 if(location.protocol==='file:'){$('authMessage').textContent=t('authOffline');return;}
 btn.disabled=true;$('authMessage').textContent='…';
 try{const result=await apiAuth(assetState.authMode==='register'?'register':'login',{email,password});
   if(assetState.authMode==='register'){$('authMessage').textContent=t('authSuccess');assetState.authMode='login';renderAuth();}
   else{assetState.authUser=result.user;state.profile={name:result.user.name,handle:result.user.handle,bio:result.user.bio,avatar:result.user.avatar};assetState.avatarImage=result.user.avatarImage;storage.setItem('cs-profile',JSON.stringify(state.profile));storage.setItem('cs-avatar-image',assetState.avatarImage||'');renderProfile();populateProfileForm();renderAuth();$('authMessage').textContent='';}
 }catch(err){$('authMessage').textContent=err.message||t('authFailed');}
 finally{btn.disabled=false;}
});
$('logoutButton').addEventListener('click',async()=>{
 try{await apiAuth('logout',{});}catch{}
 assetState.authUser=null;renderAuth();$('authMessage').textContent=t('loggedOut');
});
// Override language rerender for v0.3 sections to keep new cards bilingual.
const _renderOriginal=render;
render=function(){_renderOriginal();renderAuth();if(state.page==='fiat'||state.page==='investments')renderAssetMarkets();};
render();loadAuth();
