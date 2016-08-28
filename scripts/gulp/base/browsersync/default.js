// Base :: BrowserSync :: Default
'use strict';

var gulp = require('gulp');

var files = [
  './**/*.php',
  './src/**/*',
  './app/**/*.twig'
];

gulp.task('browsersync', function() {
  global.browserSync.init({
    proxy: global.config.url,
    port: global.config.port,
    injectChanges: true
  });
});
