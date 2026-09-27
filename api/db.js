const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  // Basic security: ensure requests come from our app
  const origin = req.headers.origin;
  if (origin) {
    let originHost = '';
    try { originHost = new URL(origin).host; } catch { /* ignore */ }
    if (originHost !== req.headers.host) return res.status(403).json({ error: 'Forbidden' });
  }

  const userId = req.query.uid;
  if (!userId) return res.status(400).json({ error: 'Missing User ID' });

  try {
    if (req.method === 'GET') {
      const data = await kv.get(`nj_${userId}`);
      return res.status(200).json(data || {});
    } else if (req.method === 'POST') {
      await kv.set(`nj_${userId}`, req.body);
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("KV Error:", error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
};
