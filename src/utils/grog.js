// Minimal client-side helper to call Groq. Tries the Responses API first,
// and falls back to the OpenAI-compatible chat completions endpoint if the
// Responses endpoint is not available for the provided key/host.
//
// NOTE: Client-side env vars (VITE_*) are bundled into the app and will
// expose the API key to anyone with access to the bundle. For production
// keep keys on the server and proxy requests.

export async function sendGrogMessage({ messages = [], model } = {}) {
  const url = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROG_API_URL) || null;
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROG_API_KEY) || null;

  if (!url) throw new Error('VITE_GROG_API_URL is not set in .env');
  if (!apiKey) throw new Error('VITE_GROG_API_KEY is not set in .env');

  function extractResponsesReply(data) {
    try {
      if (Array.isArray(data.output) && data.output.length > 0) {
        return data.output.map((o) => {
          if (typeof o === 'string') return o;
          if (o.content && typeof o.content === 'string') return o.content;
          if (o.content && Array.isArray(o.content)) return o.content.map(c => c?.text || c?.value || JSON.stringify(c)).join('');
          return JSON.stringify(o);
        }).join('\n');
      }
    } catch (e) {}
    return null;
  }

  async function postJson(targetUrl, body) {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
    if (!res.ok) {
      const err = new Error(`Grog API error: ${res.status} ${text}`);
      err.status = res.status;
      err.body = data;
      throw err;
    }
    return data;
  }

  // resolve model: prefer VITE_GROG_MODEL, then provided `model`, then a sane default
  const resolvedModel = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROG_MODEL) || model || 'llama-3.1-8b-instant';

  // If the configured URL looks like the OpenAI-compatible API, send OpenAI-style chat completions
  const isOpenAI = url && url.includes('/openai');
  const joined = messages.map((m) => `${m.role || 'user'}: ${m.content || m.text || ''}`).join('\n');

  if (isOpenAI) {
    // build chat completions URL
    let chatUrl = url;
    if (!chatUrl.endsWith('/chat/completions')) {
      chatUrl = chatUrl.replace(/\/$/, '') + '/chat/completions';
    }

    const chatMessages = messages.map((m) => ({ role: m.role || 'user', content: m.content || m.text || '' }));
    const chatBody = { model: resolvedModel, messages: chatMessages.length ? chatMessages : [{ role: 'user', content: joined || '' }] };

    const chatData = await postJson(chatUrl, chatBody);
    try {
      const choice = Array.isArray(chatData.choices) && chatData.choices[0];
      const content = choice?.message?.content || choice?.text || (choice?.message && Array.isArray(choice.message?.content) ? choice.message.content.join('') : null);
      return { raw: chatData, reply: content || JSON.stringify(chatData) };
    } catch (e) {
      return { raw: chatData, reply: JSON.stringify(chatData) };
    }
  }

  // Try Responses API first (expects { model, input })
  const responsesBody = { model: resolvedModel, input: joined };

  try {
    const data = await postJson(url, responsesBody);
    const reply = extractResponsesReply(data) || (data && (data.reply || JSON.stringify(data))) || null;
    return { raw: data, reply };
  } catch (err) {
    // If the error indicates the provided model doesn't exist, try again without the model
    try {
      const bodyObj = err && err.body;
      const isModelNotFound = bodyObj && bodyObj.error && bodyObj.error.code === 'model_not_found';
      if (isModelNotFound) {
        // retry without model so the API can pick a default allowed model for the key
        const retryData = await postJson(url, { input: joined });
        const reply = extractResponsesReply(retryData) || (retryData && (retryData.reply || JSON.stringify(retryData))) || null;
        return { raw: retryData, reply };
      }
    } catch (retryErr) {
      // fall through to regular handling below
    }
    // if it's not a 404/unknown_url, rethrow
    const body = err && err.body;
    const isUnknownUrl = (err && err.status === 404) || (body && body.error && body.error.code === 'unknown_url') || (body && typeof body === 'string' && body.includes('Unknown request URL'));
    if (!isUnknownUrl) {
      // If model not found and we couldn't auto-retry, give a clearer message
      const bodyObj = err && err.body;
      if (bodyObj && bodyObj.error && bodyObj.error.code === 'model_not_found') {
        throw new Error('Model not found: the provided model is unavailable for this key. Set a different model in VITE_GROG_MODEL or contact your Groq account.');
      }
      throw err;
    }

    // fallback: try OpenAI-compatible chat completions endpoint
    let base;
    try {
      const parsed = new URL(url);
      base = parsed.origin;
    } catch (e) {
      base = url.replace(/\/v1\/responses\/?$/, '').replace(/\/$/, '') || url;
    }

    const chatUrl = `${base.replace(/\/$/, '')}/openai/v1/chat/completions`;
    const chatMessages = messages.map((m) => ({ role: m.role || 'user', content: m.content || m.text || '' }));
    const chatBody = { model, messages: chatMessages };

    const chatData = await postJson(chatUrl, chatBody);
    try {
      const choice = Array.isArray(chatData.choices) && chatData.choices[0];
      const content = choice?.message?.content || choice?.text || (choice?.message && Array.isArray(choice.message?.content) ? choice.message.content.join('') : null);
      return { raw: chatData, reply: content || JSON.stringify(chatData) };
    } catch (e) {
      return { raw: chatData, reply: JSON.stringify(chatData) };
    }
  }
}
