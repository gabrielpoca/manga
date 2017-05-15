module.exports = {
  navigateFallback: 'index.html',
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js',
  runtimeCaching: [{
    urlPattern: /^https:\/\/doodle-manga-scraper.p.mashape\.com\/.*/,
    handler: 'fastest',
    options: {
      cache: {
        maxEntries: 15,
        name: 'api-cache'
      }
    }
  }, {
    urlPattern: /^http:\/\/.*\.mangareader\.net\/.*/,
    handler: 'fastest',
    options: {
      cache: {
        maxEntries: 20,
        name: 'chapter-cache'
      }
    }
  }]
};
