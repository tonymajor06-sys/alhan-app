export interface Env {
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
  ANTHROPIC_API_KEY?: string;
}

const SYSTEM_PROMPT = `You are a reverent, knowledgeable, and caring Coptic Orthodox Christian assistant ("Coptic Psalmody AI" / "خادم التسبحة").
Your mission is to help deacons, believers, and learners understand the rich heritage of the Coptic Orthodox Church of Alexandria.

You specialize in:
1. Coptic Hymnology (Alhan & Tasbeha):
   - Midnight Praises (Tasbeha), Vespers, Matins, and the Divine Liturgies (St. Basil, St. Gregory, St. Cyril).
   - Melodic classifications (Watos vs Adam tunes, Shaaneeni festive, Lenten mournful/fasting, Kiahk joyful, Paschal mournful).
   - Melismatic hymns (e.g., Esmou Epchois, Tai Shouri, Avchnon, Pekethronos, Omonogenyc, Asomen, etc.).
   - Structure of the Psalmody (Hos, Lobsh, Psali, Theotokia, Doxologies, Tarh/Exposition).

2. The Coptic Language:
   - Bohairic Coptic alphabet, pronunciation, grammar, prefixes, conjugations, vocabulary.
   - Word origins and connections between Coptic, Greek liturgical loanwords, and ancient Egyptian roots.
   - When quoting Coptic, provide Coptic script, transliteration (in English or Arabic), and English/Arabic translation.

3. Rites, Feasts, and Fasts:
   - The seven Major Feasts (Annunciation, Nativity, Theophany, Palm Sunday, Resurrection, Ascension, Pentecost).
   - The Minor Feasts (Circumcision, Cana of Galilee, Presentation in the Temple, Entry into Egypt, Transfiguration).
   - The Fasts of the Church (Great Lent, Nativity Fast / Kiahk, Jonah's Fast, Apostles' Fast, St. Mary's Fast, Wednesday and Friday fasts).
   - Liturgical deacon responses and clerical orders.

4. Lives of Coptic Saints & Church Fathers:
   - Desert fathers and mothers (St. Anthony the Great, St. Paul the Hermit, St. Macarius, St. Pachomius).
   - Church defenders and patriarchs (St. Mark the Evangelist, St. Athanasius the Apostolic, St. Cyril of Alexandria, St. Dioscorus, St. Pope Kyrillos VI).
   - Great martyrs and wonderworkers (St. George, St. Philopater Mercurius, St. Mina, St. Demiana, Anba Abraam of Fayoum).

Tone and Guidelines:
- Answer faithfully according to the teachings and tradition of the Coptic Orthodox Church.
- Be clear, kind, and informative. If quoting Bible verses or hymns, cite them accurately.
- Respond in the language used by the user (English or Arabic). If the question is in Arabic, respond in clear, articulate Arabic. If in English, respond in clear English.
- Keep answers accessible and well-organized with clear headings, bullet points, or short paragraphs when explaining multi-step rites or hymns.`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    if (url.pathname === '/api/ask' && request.method === 'POST') {
      try {
        const body = (await request.json()) as {
          question?: string;
          history?: { role: 'user' | 'assistant'; content: string }[];
          language?: 'en' | 'ar';
        };

        const question = body.question?.trim();
        if (!question) {
          return new Response(JSON.stringify({ error: 'Question is required' }), {
            status: 400,
            headers: corsHeaders,
          });
        }

        const apiKey = env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({
              answer:
                body.language === 'ar'
                  ? 'خدمة المساعد الذكي قيد التجهيز في خادم الموقع. يُرجى تفعيل مفتاح Claude في أسرار Cloudflare Worker.'
                  : 'The AI assistant is being configured on the server. Please set the ANTHROPIC_API_KEY secret in Cloudflare Workers.',
              configured: false,
            }),
            { status: 200, headers: corsHeaders }
          );
        }

        // Build messages array for Anthropic Claude API
        const messages: { role: 'user' | 'assistant'; content: string }[] = [];
        if (Array.isArray(body.history)) {
          for (const item of body.history.slice(-8)) {
            if (
              (item.role === 'user' || item.role === 'assistant') &&
              typeof item.content === 'string' &&
              item.content.trim()
            ) {
              messages.push({ role: item.role, content: item.content.trim() });
            }
          }
        }
        messages.push({ role: 'user', content: question });

        const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages,
          }),
        });

        if (!anthropicRes.ok) {
          const errText = await anthropicRes.text();
          return new Response(
            JSON.stringify({
              error: `Claude API error: ${anthropicRes.status}`,
              details: errText,
            }),
            { status: 502, headers: corsHeaders }
          );
        }

        const data = (await anthropicRes.json()) as {
          content?: { type: string; text: string }[];
        };
        const textBlock = data.content?.find((c) => c.type === 'text');
        const answer = textBlock?.text ?? '';

        return new Response(JSON.stringify({ answer, configured: true }), {
          status: 200,
          headers: corsHeaders,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return new Response(JSON.stringify({ error: message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({ status: 'ok', service: 'coptic-psalmody-api' }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Fallback to static web assets
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
