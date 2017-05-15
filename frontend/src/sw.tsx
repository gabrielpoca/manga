import * as toolbox from 'sw-toolbox';
import * as api from './api';
import baseURL from './api/url';

//toolbox.options.debug = process.env.NODE_ENV === 'development';

declare module 'sw-toolbox' {
  interface Options {
    origin?: string;
  }
}

interface GlobalAssets {
  assets: Array<string>;
}

declare var serviceWorkerOption: GlobalAssets;

toolbox.precache(['/', ...serviceWorkerOption.assets]);

toolbox.router.get(/^https?:\/\/[^.]+.mangareader\.net\/cover\/.*\.(jpg|png)?/, toolbox.cacheFirst, {
  cache: {
    name: 'cover-cache'
  }
});

toolbox.router.get(/^https?:\/\/[^.]+.mangareader\.net\/.*\.(jpg|png)?/, async request => {
  return await caches.match(request) || fetch(request);
});

toolbox.router.get(/https?.*/, async request => {
  if (request.url.includes(baseURL)) {
    return await caches.match(request) || fetch(request);
  }

  if (request.url.match(/\.(js|json|css|png|jpg)$/)) {
    return await caches.match(request) || fetch(request);
  }

  return await caches.match(request) || await caches.match('/') || fetch(request);
});
