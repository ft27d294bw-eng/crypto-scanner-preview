'use strict';
const { getSnapshot } = require('../lib/scanner');
module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const snapshot = await getSnapshot();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=10');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(snapshot.status === 'unavailable' ? 503 : 200).json(snapshot);
  } catch (_) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ status: 'unavailable', error: 'Market data unavailable' });
  }
};
