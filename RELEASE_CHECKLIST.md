# Crypto Scanner — release readiness checklist (2026-11-20)

## Done in v0.6
- [x] Responsive RU/EN navigation across Home, FX, Investments, Portfolio, Profile, Settings
- [x] Home-only collapsible Exchange Lab with bid/ask and cost simulation
- [x] 23 selectable fiat currencies (incl. USD/CNY) and conversion helper with tests
- [x] FX upstream adapter updated to Frankfurter v2, reference date/observation metadata
- [x] 64 coins, 4 exchange connectors in read-only mode
- [x] Profile editing, avatar upload, local settings persistence and email account prototype
- [x] PWA manifest / service worker assets and offline showcase
- [x] Math/normalization automated tests and basic mobile/desktop UI smoke checks

## Must do before public website (not yet done)
- [ ] Buy domain, select provider for long-lived Node.js 22 app and persistent SQLite volume (or migrate to managed Postgres).
- [ ] Configure production `NODE_ENV=production`, public HTTPS `APP_ORIGIN`, `RESEND_API_KEY`, `AUTH_FROM_EMAIL`, persistent `AUTH_DATA_DIR`. **Disable `AUTH_DEV_VERIFY` in production**.
- [ ] Domain verification for outbound email, delivery/rate limit and anti-abuse checks.
- [ ] External audit of authentication, session security, input validation, CSP, CSRF controls, image processing and account lifecycle.
- [ ] Implement password recovery, account deletion, data export, consent and privacy notice.
- [ ] Add monitoring, alerting, backups and disaster recovery for account data.
- [ ] Check exchange API rules, rate limits, network coverage, withdrawal/deposit status and licensing relevant to target markets.
- [ ] Show timestamps/availability per venue and market feed; make actual executable fill estimates depth-aware before discussing arbitrage as a tradable strategy.
- [ ] Cross-browser accessibility review (keyboard, screen readers, high contrast), device QA, E2E tests with a stable staging server.
- [ ] Deploy real domain, confirm bid/ask/live FX/metals API access on hosting provider, remove demo from real public routes if necessary.

## For iOS App Store later
- [ ] Decide wrapper vs native framework, create iOS build, sign and test on physical iPhone.
- [ ] Apple developer account; App Store Connect listings, privacy disclosures, age rating, screenshots and review process.
- [ ] Review Apple's requirements for financial-market data and crypto-related functionality before submission.

**No trading execution, fund custody, wallet connection or guaranteed earnings in v0.6.**
