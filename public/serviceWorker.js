// Basic service worker to prevent 404 errors
/* eslint-env serviceworker */
/* eslint no-restricted-globals: "off" */
/* eslint no-console: "off" */
self.addEventListener('install', () => {
  console.log('Service worker installed');
});

self.addEventListener('activate', () => {
  console.log('Service worker activated');
});
