// Cadê o Professor? — Service Worker
// Estratégia: Network First para tudo (app em tempo real com Firebase)
// Não intercepta requisições Firebase/Google para não quebrar a autenticação

const CACHE_NAME = 'cade-o-professor-v1';

// Recursos estáticos para cache no install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Origens que NUNCA devem ser interceptadas
const BYPASS_ORIGINS = [
  'google.com',
  'googleapis.com',
  'gstatic.com',
  'firebaseapp.com',
  'unpkg.com',
  'cdnjs.cloudflare.com',
];

function shouldBypass(url) {
  // Ignora chamadas especiais do Firebase Auth
  if (url.pathname.startsWith('/__/auth/')) {
    return true;
  }
  // Ignora origens Firebase, Google, CDNs etc.
  return BYPASS_ORIGINS.some(origin => url.hostname.includes(origin));
}

// Install: pre-cache estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Falha ao cachear estáticos:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Network First — nunca intercepta Firebase/Google
self.addEventListener('fetch', event => {
  // Ignora requisições que não sejam HTTP/HTTPS (ex: chrome-extension, data)
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Ignora origens que devem ser ignoradas (Firebase, Google, etc.) ou caminhos de auth
  if (shouldBypass(url)) return;

  // Ignora métodos não-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Atualiza cache com resposta fresca
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone).catch(err => {
              console.warn('[SW] Falha ao salvar no cache:', err);
            });
          });
        }
        return response;
      })
      .catch(async () => {
        // Fallback: busca no cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Se for uma navegação de página, tenta retornar o index.html cacheado
        if (event.request.mode === 'navigate') {
          const cachedIndex = await caches.match('/index.html');
          if (cachedIndex) {
            return cachedIndex;
          }
        }

        // Se tudo falhar, retorna um erro amigável em vez de quebrar
        return new Response('Sem conexão com a internet e recurso não disponível no cache.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      })
  );
});
