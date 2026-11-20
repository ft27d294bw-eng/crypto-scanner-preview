# Crypto Scanner v0.6 — Unified Market Workspace

**RU/EN responsive financial dashboard + cross-exchange spot quote comparator + 23-currency FX converter + portfolio and Reality Check.**

## What's new in v0.6

- **Fixed navigation leak:** Exchange Lab is now closed by default and accessible only from the Home / Scanner page using an explicit open/collapse button; it never overlays Profile, Settings, FX, Investments or Portfolio. Closes automatically on navigation away.
- **FX selection:** any two of 23 major fiat currencies, including **USD ↔ CNY** (Chinese yuan), plus swap, amount entry, 5 quick pairs, custom saved pairs and reference-rate trends. The 24 most common combinations are shown as cards (first 9 + Show all).
- **Live FX adapter:** Frankfurter **v2** with date-labeled reference observations; backend normalizes time-series snapshots, carries forward only actual past observations and exposes each currency's effective observation date. Nothing is generated if the API is unavailable.
- **Unified design:** consistent teal/lilac/navy glass surfaces, improved light/dark styles, coherent input focus and readable mobile navigation.
- Preserves: 64 cryptocurrencies, best bid/ask quotes from Binance/Bybit/OKX/MEXC, arbitrage estimation, profile photo, email account backend, extended settings, investments in gold/silver, investment portfolio and Reality Check.

## Try instantly (no installation)

Open **`DEMO_OFFLINE.html`** in your browser, or the separately delivered `CryptoScanner_v0.6_DEMO.html`. All quotes in that file are **fictional demo data**. Email signup cannot run from an offline HTML file. The app is not published to the web or App Store.

## Run locally (live data where upstream APIs are reachable)

Requires **Node.js 22+**. Open this folder and run:

```bash
npm test
npm start
```

Then visit `http://localhost:3000` for live mode or `http://localhost:3000/?demo=1` for synthetic demo mode. On a Mac, alternatively double-click `START_HERE_MAC.command` to start a **development** instance with email verification links printed to the terminal. On Windows, use `START_HERE_WINDOWS.bat`. For local email signup using CLI, run `AUTH_DEV_VERIFY=1 NODE_ENV=development npm start` in macOS/Linux. Node's `--env-file-if-exists=.env` means a local `.env` file is loaded if you create one; it must never be committed.

### Project layout

- `public/index.html`, `styles.css`, `v04.css`, `v05.css`, `v06.css` — navigation, unified UI, accessibility styling.
- `public/app.js`, `extras.js`, `portfolio.js`, `v05.js`, `v06.js` — client-side state, market screens, Exchange Lab, settings and portfolio.
- `public/fx-engine.js` — tested cross-rate conversion helper, works in browser and Node tests.
- `lib/markets.js` — daily fiat reference rates (Frankfurter v2) and metal feeds; `/api/markets`.
- `api/scan.js`, `lib/scanner.js` — public bid/ask spot quote aggregation.
- `lib/auth.js` — SQLite-backed signup, email verification, scrypt password hashing, cookie sessions.
- `tests/` — Node unit tests (no third-party runtime dependencies).
- `RELEASE_CHECKLIST.md` — remaining steps before public deployment.

## Source & precision notes

- **Currency converter:** Frankfurter v2 blended daily **reference** prices, not live executable bid/ask quotes. Individual currencies may have different latest observation dates. Date(s) are displayed in the UI. Fiat trend is calculated between actual observations, not minute-by-minute.
- **Exchange Lab:** buys with best **ask**, sells with best **bid**; `units = amount / [ask × (1 + slippage) × (1 + buyFee)]`; `estimated result = units × bid × (1 - slippage) × (1 - sellFee) - amount - transferFee`. Positive values **do not mean guaranteed arbitrage**; network compatibility, deposits, minimum lot, transfer time, fees, spread slippage through deeper levels, liquidity, taxes and market volatility remain outside full verification.
- **Demo mode:** crypto prices, FX prices and metal values are fictional. Live API failures never silently switch to demo prices.
- **Portfolio:** currently saved on the local device. Email login can sync profile fields, but does **not** yet sync portfolio positions across devices.

## Launch readiness

This is a **working development MVP**, not yet a production-hardened paid financial application. Before public deployment configure HTTPS, domain, verified sender email through Resend, persistent private database, backups, monitoring, legal/privacy pages, abuse protection, performance/accessibility and security audits. `/api/auth` expects required env vars; `RESEND_API_KEY` / `AUTH_FROM_EMAIL` are not included. See `RELEASE_CHECKLIST.md`.

App Store submission requires native iOS packaging, account setup and Apple's review; this repository is presently a responsive PWA/web application.


## Public preview deployment (new)
See `PUBLISH_ON_RENDER_UA.md` and `render.yaml`. This package includes a disabled-email public preview mode (`PUBLIC_PREVIEW=1`) and `/healthz`. Do not use free ephemeral disk for production user data.
