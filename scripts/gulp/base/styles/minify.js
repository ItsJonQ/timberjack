// Base :: Styles :: Minify
'use strict';

var gulp = require('gulp');

var cssmin = require('../../pipes/cssmin');

gulp.task('styles-minify', ['styles-base'], function(callback) {
  return gulp.src(global.config.dest + '/styles/**/*.css')
    .pipe(cssmin())
    .on('close', callback);
});
