export interface Env {
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
}

// Where the recordings are (the R2 bucket's domain, as in .env.example)
const AUDIO_ORIGIN = 'https://audio.copticpsalmody.com';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({ status: 'ok', service: 'coptic-psalmody-api' }),
        { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }
      );
    }

    // A recording sent as a file to save (the reader's Download button on the website): /download/<file>?name=<title.ext>
    if (url.pathname.startsWith('/download/')) {
      const file = decodeURIComponent(url.pathname.slice('/download/'.length));
      if (!file || file.includes('/') || !/\.(m4a|mp3)$/i.test(file)) return new Response('Not Found', { status: 404 });
      const audio = await fetch(`${AUDIO_ORIGIN}/${encodeURIComponent(file)}`);
      if (!audio.ok || !audio.body) return new Response('Not Found', { status: 404 });
      const name = (url.searchParams.get('name') || file).replace(/[\\/:*?"<>|\r\n]/g, ' ').trim() || file;
      return new Response(audio.body, {
        headers: {
          'Content-Type': audio.headers.get('Content-Type') ?? 'audio/mpeg',
          ...(audio.headers.get('Content-Length') ? { 'Content-Length': audio.headers.get('Content-Length')! } : {}),
          'Content-Disposition': `attachment; filename="${file}"; filename*=UTF-8''${encodeURIComponent(name)}`,
        },
      });
    }

    // Fallback to static web assets
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
