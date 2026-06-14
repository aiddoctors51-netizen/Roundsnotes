// RoundNotes Service Worker v3 — offline support
const CACHE = 'roundnotes-v3';
const ASSETS = ['/', '/index.html', '/patient.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first for API calls, cache first for assets
  if(e.request.url.includes('supabase.co') || e.request.url.includes('googleapis.com')){
    e.respondWith(fetch(e.request).catch(() => new Response('offline', {status: 503})));
  } else {
    e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
  }
});
