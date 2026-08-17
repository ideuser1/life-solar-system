// AI suggestions for the Life Solar System dashboard.
// POST /api/suggest  { question, config } → { message, suggestions: [...] }
// Calls the Anthropic API server-side; the key lives in the ANTHROPIC_API_KEY
// secret on the Cloudflare Pages project and never reaches the browser.
// Guardrail: max 20 questions per hour (counted in the SOLAR_STATE KV store),
// since this endpoint is only protected by the site's secret URL.

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

// Structured-output schema: guarantees the model returns parseable suggestions.
const SCHEMA = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      description: 'A short, warm 2-4 sentence reply to the user about their question.',
    },
    suggestions: {
      type: 'array',
      description: 'Concrete additions the user can accept with one tap. May be empty.',
      items: {
        type: 'object',
        properties: {
          kind: { type: 'string', enum: ['planet', 'goal'] },
          planet: {
            type: 'string',
            description:
              "Target planet label. For kind=goal use an EXISTING planet label verbatim; for kind=planet this is the new planet's name.",
          },
          title: {
            type: 'string',
            description:
              'SMART goal title (specific, measurable, time-bound where sensible). For kind=planet, an optional starter goal — empty string if none.',
          },
          status: { type: 'string', enum: ['ongoing', 'someday'] },
          due: { type: 'string', description: 'YYYY-MM-DD deadline, or empty string.' },
          note: { type: 'string', description: 'One short helpful note, or empty string.' },
          perWeek: {
            type: 'integer',
            description: 'For weekly habits: minimum times per week. 0 if not a weekly habit.',
          },
          perWeekMax: {
            type: 'integer',
            description: 'Optional bonus ceiling above perWeek. 0 if none.',
          },
        },
        required: ['kind', 'planet', 'title', 'status', 'due', 'note', 'perWeek', 'perWeekMax'],
        additionalProperties: false,
      },
    },
  },
  required: ['message', 'suggestions'],
  additionalProperties: false,
};

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'not-configured' }, 503);

  // simple hourly rate limit
  const hourKey = 'ai-count-' + new Date().toISOString().slice(0, 13);
  const used = parseInt((await env.SOLAR_STATE.get(hourKey)) || '0', 10);
  if (used >= 20) return json({ error: 'rate-limited' }, 429);
  await env.SOLAR_STATE.put(hourKey, String(used + 1), { expirationTtl: 7200 });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'bad-request' }, 400);
  }
  const question = String(payload.question || '').slice(0, 2000);
  if (!question.trim()) return json({ error: 'bad-request' }, 400);
  const config = JSON.stringify(payload.config || {}).slice(0, 20000);
  // optional personal context the user typed or uploaded in the panel
  const context = String(payload.context || '').slice(0, 20000);

  const system =
    'You are the built-in assistant of a personal "Life Solar System" dashboard: ' +
    'the user is the sun and each planet is an area of their life containing goals. ' +
    'Goals should be SMART (specific, measurable, achievable, relevant, time-bound) — but many are ' +
    'long-term habits with a weekly cadence (perWeek) rather than a finish line, and that is fine. ' +
    'Statuses: "ongoing" = actively being worked on, "someday" = not started. ' +
    'Given the user\'s current system and their question, reply with a short encouraging message and, ' +
    'when it helps, concrete suggestions they can add with one tap. ' +
    'For kind=goal, set planet to an existing planet label copied exactly. ' +
    'For kind=planet, propose a broad life area that complements the existing ones. ' +
    'Suggest 2-5 items at most; quality over quantity. Use realistic dates relative to today. ' +
    'The user may share personal context (notes, journal snippets, existing goal lists) — use it to make ' +
    'suggestions genuinely personal, and do not repeat sensitive details back beyond what a suggestion needs.';

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-5',
      max_tokens: 8000,
      system,
      output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
      messages: [
        {
          role: 'user',
          content:
            'Today is ' + new Date().toISOString().slice(0, 10) + '.\n' +
            'My current system (JSON):\n' + config +
            (context ? '\n\nPersonal context I chose to share:\n' + context : '') +
            '\n\nMy question: ' + question,
        },
      ],
    }),
  });

  if (!res.ok) return json({ error: 'api-error', status: res.status }, 502);
  const data = await res.json();

  // safety classifiers can decline a request — check before reading content
  if (data.stop_reason === 'refusal') {
    return json({ message: "I can't help with that particular request — try asking about your goals or planets.", suggestions: [] });
  }
  const textBlock = (data.content || []).find((b) => b.type === 'text');
  try {
    return json(JSON.parse(textBlock.text));
  } catch {
    return json({ message: (textBlock && textBlock.text) || 'Sorry, I could not come up with anything.', suggestions: [] });
  }
}
