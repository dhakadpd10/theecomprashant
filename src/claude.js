// The agent's brain: one helper around the Anthropic SDK.
// Streams (long outputs never time out), uses adaptive thinking with an effort level,
// and turns on server-side fallbacks so a policy decline is retried on another model.
const Anthropic = require('@anthropic-ai/sdk').default;
const { config } = require('./util');

let client;
const getClient = () => (client ||= new Anthropic()); // reads ANTHROPIC_API_KEY

/**
 * ask({ system, prompt, effort, model, maxTokens, tools }) -> { text, message }
 * `tools` may include server tools such as web search.
 */
async function ask({ system, prompt, messages, effort, model, maxTokens = 32000, tools }) {
  const cfg = config();
  const stream = getClient().beta.messages.stream({
    model: model || cfg.models.writer,
    max_tokens: maxTokens,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    thinking: { type: 'adaptive' },
    output_config: { effort: effort || cfg.models.writer_effort },
    system,
    messages: messages || [{ role: 'user', content: prompt }],
    ...(tools ? { tools } : {}),
  });
  const message = await stream.finalMessage();
  if (message.stop_reason === 'refusal') throw new Error(`Claude declined: ${message.stop_details?.category || 'no category'}`);
  if (message.stop_reason === 'max_tokens') throw new Error('Claude ran out of output tokens; raise maxTokens');
  const text = message.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  return { text, message };
}

/** Pull the first JSON object or array out of a reply (inside ```json fences or bare). */
function parseJSON(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text.slice(Math.min(...['{', '['].map((c) => (text.indexOf(c) < 0 ? Infinity : text.indexOf(c)))));
  return JSON.parse(raw.trim());
}

/** Ask for JSON, validate it, and on failure show Claude the errors and try again. */
async function askJSON({ system, prompt, validate, effort, retries = 2, maxTokens }) {
  const messages = [{ role: 'user', content: prompt }];
  for (let attempt = 0; attempt <= retries; attempt++) {
    const { text, message } = await ask({ system, messages, effort, maxTokens });
    let value, errors;
    try { value = parseJSON(text); errors = validate ? validate(value) : []; } catch (e) { errors = [`not valid JSON: ${e.message}`]; }
    if (!errors.length) return value;
    messages.push({ role: 'assistant', content: message.content });
    messages.push({ role: 'user', content: `That JSON has problems:\n- ${errors.join('\n- ')}\nReturn the full corrected JSON only.` });
  }
  throw new Error('Claude could not produce valid JSON after retries');
}

const WEB_SEARCH = { type: 'web_search_20260209', name: 'web_search', max_uses: 8 };

module.exports = { ask, askJSON, parseJSON, WEB_SEARCH };
