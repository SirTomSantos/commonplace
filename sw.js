// Commonplace service worker: keeps the app working offline.
// It only ever touches caches whose names start with "commonplace-", so it cannot disturb other apps on this site.
// To force every device to refresh the app files, change the version below.
const V = 'commonplace-shell-v4';
const FONTS = 'commonplace-fonts';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('commonplace-') && k !== V && k !== FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    if (!u.pathname.startsWith(new URL(self.registration.scope).pathname)) return;   // never handle another app's files
    const shell = r.mode === 'navigate' || /\/(index\.html|config\.js|sw\.js|manifest\.webmanifest)$/.test(u.pathname) || u.pathname.endsWith('/');
    if (shell) {
      e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })
        .catch(() => caches.open(V).then(c => c.match(r, { ignoreSearch: true }).then(m => m || c.match('index.html')))));
      return;
    }
    e.respondWith(caches.open(V).then(c => c.match(r).then(m => m || fetch(r).then(res => { c.put(r, res.clone()); return res; }))));
    return;
  }
  if (/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.open(FONTS).then(c => c.match(r).then(m => m || fetch(r).then(res => { c.put(r, res.clone()); return res; }).catch(() => m))));
  }
});
