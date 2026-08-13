// Sync API for the Life Solar System dashboard.
// GET  /api/state  → the saved click-state (ticks, checked milestones) as JSON
// PUT  /api/state  → replace the saved click-state
// Storage: Cloudflare KV (binding SOLAR_STATE, configured in wrangler.toml).
// Access control is the site's secret URL — same trust level as viewing the page.

export async function onRequestGet({ env }) {
  const data = await env.SOLAR_STATE.get('state');
  return new Response(data || '{}', {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export async function onRequestPut({ request, env }) {
  const body = await request.text();
  if (body.length > 100000) return new Response('too big', { status: 413 });
  try { JSON.parse(body); } catch { return new Response('bad json', { status: 400 }); }
  await env.SOLAR_STATE.put('state', body);
  return new Response('ok');
}
