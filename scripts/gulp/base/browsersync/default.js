// Base :: BrowserSync :: Default
'use strict';

var gulp = require('gulp');

var files = [
  './**/*.php',
  './src/**/*',
  './app/**/*.twig'
];

gulp.task('browsersync', function() {
  global.browserSync.init(files, {
    port: global.config.port,
    proxy: global.config.url
  });
});
