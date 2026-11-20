'use strict';

const ASSETS = [["BTC","Bitcoin"],["ETH","Ethereum"],["SOL","Solana"],["XRP","XRP"],["BNB","BNB"],["DOGE","Dogecoin"],["ADA","Cardano"],["TRX","TRON"],["LINK","Chainlink"],["AVAX","Avalanche"],["LTC","Litecoin"],["DOT","Polkadot"],["BCH","Bitcoin Cash"],["SUI","Sui"],["TON","Toncoin"],["APT","Aptos"],["NEAR","NEAR"],["UNI","Uniswap"],["ETC","Ethereum Classic"],["XLM","Stellar"],["HBAR","Hedera"],["PEPE","Pepe"],["SHIB","Shiba Inu"],["ARB","Arbitrum"],["OP","Optimism"],["WIF","dogwifhat"],["INJ","Injective"],["RENDER","Render"],["FIL","Filecoin"],["ATOM","Cosmos"],["ALGO","Algorand"],["VET","VeChain"],["ICP","Internet Computer"],["AAVE","Aave"],["MKR","Maker"],["GRT","The Graph"],["SEI","Sei"],["FET","Fetch.ai"],["WLD","Worldcoin"],["JUP","Jupiter"],["JTO","Jito"],["PYTH","Pyth Network"],["BONK","Bonk"],["FLOKI","Floki"],["STX","Stacks"],["TIA","Celestia"],["TAO","Bittensor"],["RUNE","THORChain"],["EGLD","MultiversX"],["ENA","Ethena"],["ONDO","Ondo"],["LDO","Lido DAO"],["CRV","Curve DAO"],["SAND","The Sandbox"],["MANA","Decentraland"],["IMX","Immutable"],["XTZ","Tezos"],["KAVA","Kava"],["COMP","Compound"],["ZEC","Zcash"],["DASH","Dash"],["XMR","Monero"],["USDC","USD Coin"],["FDUSD","First Digital USD"]];
const SYMBOLS = new Set(ASSETS.map(([symbol]) => symbol + 'USDT'));
const ASSET_NAMES = Object.fromEntries(ASSETS);
const EXCHANGES = ['Binance', 'Bybit', 'OKX', 'MEXC'];
const TIMEOUT_MS = 6500;
let cached = null;
let cacheUntil = 0;
let pending = null;

function numberOrNull(value) {
  if (value === undefined || value === null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}
function normalizeQuote(source, raw, symbol) {
  const bid = numberOrNull(raw.bid);
  const ask = numberOrNull(raw.ask);
  if (!SYMBOLS.has(symbol) || bid === null || ask === null || bid <= 0 || ask <= 0 || bid > ask * 1.005) return null;
  return {
    exchange: source,
    bid,
    ask,
    bidQty: numberOrNull(raw.bidQty),
    askQty: numberOrNull(raw.askQty)
  };
}
async function fetchJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { 'Accept': 'application/json', 'User-Agent': 'CryptoScanner/0.1 (public market quotes)' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
async function binance() {
  let data;
  try { data = await fetchJson('https://data-api.binance.vision/api/v3/ticker/bookTicker'); }
  catch (_) { data = await fetchJson('https://api.binance.com/api/v3/ticker/bookTicker'); }
  if (!Array.isArray(data)) throw new Error('Unexpected response');
  return data.map(x => ({ symbol: x.symbol, quote: normalizeQuote('Binance', {
    bid: x.bidPrice, ask: x.askPrice, bidQty: x.bidQty, askQty: x.askQty
  }, x.symbol) })).filter(x => x.quote);
}
async function bybit() {
  const data = await fetchJson('https://api.bybit.com/v5/market/tickers?category=spot');
  if (data.retCode !== 0 || !Array.isArray(data?.result?.list)) throw new Error('Unexpected response');
  return data.result.list.map(x => ({ symbol: x.symbol, quote: normalizeQuote('Bybit', {
    bid: x.bid1Price, ask: x.ask1Price, bidQty: x.bid1Size, askQty: x.ask1Size
  }, x.symbol) })).filter(x => x.quote);
}
async function okx() {
  const data = await fetchJson('https://www.okx.com/api/v5/market/tickers?instType=SPOT');
  if (data.code !== '0' || !Array.isArray(data.data)) throw new Error('Unexpected response');
  return data.data.map(x => {
    const symbol = x.instId?.endsWith('-USDT') ? x.instId.replaceAll('-', '') : '';
    return { symbol, quote: normalizeQuote('OKX', {
      bid: x.bidPx, ask: x.askPx, bidQty: x.bidSz, askQty: x.askSz
    }, symbol) };
  }).filter(x => x.quote);
}
async function mexc() {
  const data = await fetchJson('https://api.mexc.com/api/v3/ticker/bookTicker');
  if (!Array.isArray(data)) throw new Error('Unexpected response');
  return data.map(x => ({ symbol: x.symbol, quote: normalizeQuote('MEXC', {
    bid: x.bidPrice, ask: x.askPrice, bidQty: x.bidQty, askQty: x.askQty
  }, x.symbol) })).filter(x => x.quote);
}
function aggregate(providers, asOf = new Date().toISOString()) {
  const bySymbol = new Map();
  const sources = [];
  for (const provider of providers) {
    const quotes = provider.quotes || [];
    const successful = Array.isArray(provider.quotes) && quotes.length > 0;
    sources.push({ name: provider.name, available: successful, count: quotes.length, error: successful ? null : (provider.error || 'No usable quotes') });
    if (!successful) continue;
    for (const item of quotes) {
      if (!bySymbol.has(item.symbol)) bySymbol.set(item.symbol, []);
      bySymbol.get(item.symbol).push(item.quote);
    }
  }
  const pairs = ASSETS.map(([symbol, name]) => ({
    symbol,
    name,
    pair: `${symbol}/USDT`,
    quotes: (bySymbol.get(`${symbol}USDT`) || []).sort((a, b) => EXCHANGES.indexOf(a.exchange) - EXCHANGES.indexOf(b.exchange))
  })).filter(item => item.quotes.length > 0);
  const availableCount = sources.filter(s => s.available).length;
  return {
    status: availableCount === 0 ? 'unavailable' : availableCount === sources.length ? 'ok' : 'partial',
    asOf,
    pairs,
    sources,
    availableCount,
    totalTracked: ASSETS.length,
    market: 'spot',
    quoteCurrency: 'USDT'
  };
}
async function getSnapshot(force = false) {
  if (!force && cached && Date.now() < cacheUntil) return { ...cached, fromCache: true };
  if (pending) return pending;
  pending = (async () => {
    const jobs = [binance, bybit, okx, mexc];
    const completed = await Promise.allSettled(jobs.map(fn => fn()));
    const providers = completed.map((result, index) => ({
      name: EXCHANGES[index],
      quotes: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? String(result.reason?.message || 'Provider unavailable').slice(0, 90) : null
    }));
    const snapshot = aggregate(providers);
    if (snapshot.availableCount > 0) {
      cached = snapshot;
      cacheUntil = Date.now() + 25_000;
    }
    return { ...snapshot, fromCache: false };
  })();
  try { return await pending; } finally { pending = null; }
}

module.exports = { ASSETS, EXCHANGES, aggregate, getSnapshot, normalizeQuote, numberOrNull };
