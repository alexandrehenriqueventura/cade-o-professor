// Cadê o Professor? — Service Worker
// Estrategia: Network First para tudo (app e-realtime com Firebase)
// Nao intercepta requisicoes Firebase/Google para nao quebrar auth

const CACHE_NAME = 'cade-o-professor-v1';

// Recursos estaticos para cache no install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Origens que NUNCA devem ser interceptadas
const BYPASS_ORIGINS = [
  'firestore.googleapis.com',
  'firebase.googleapis.com',
  'firebaseapp.com',
  'googleapis.com',
  'gstatic.com',
  'unpkg.com',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

function shouldBypass(url) {
  return BYPASS_ORIGINS.some(origin => url.hostname.includes(origin));
}

// Install: pre-cache estaticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Falha ao cachear estaticos:', err);
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

// Fetch: Network First — nunca intercepta Firebase
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignora origens Firebase/CDN
  if (shouldBypass(url)) return;

  // Ignora metodos nao-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Atualiza cache com resposta fresca
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Fallback: cache
        return caches.match(event.request).then(cached => {
          return cached || caches.match('/index.html');
        });
      })
  );
});
