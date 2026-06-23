// RoundNotes Service Worker — powered by Fovea — v5
const CACHE = 'roundnotes-v5';
const ASSETS = [
  '/index.html',
  '/patient.html',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Serif+Display&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.all(ASSETS.map(url =>
        fetch(url, {mode: url.startsWith('http') ? 'cors' : 'same-origin'})
          .then(res => res.ok ? c.put(url, res) : null)
          .catch(() => null) // don't let one bad CDN request block install
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Network-only for live API/auth calls — these must never be served stale
  if(url.includes('supabase.co') || url.includes('googleapis.com/upload') || url.includes('accounts.google.com')){
    e.respondWith(fetch(e.request).catch(() => new Response('{"error":"offline"}', {status:503,headers:{'Content-Type':'application/json'}})));
    return;
  }
  // Cache-first for everything else (app shell, fonts, jsPDF, Tesseract, images)
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(res => {
        if(res.ok && e.request.method === 'GET'){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Navigations fall back to the cached app shell instead of a browser error page
        if(e.request.mode === 'navigate') return caches.match('/index.html');
        return new Response('', {status: 504, statusText: 'Offline'});
      });
    })
  );
});
