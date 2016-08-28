// Base :: Scripts :: Minify
'use strict';

var gulp = require('gulp');

var uglify = require('../../pipes/uglify');

gulp.task('scripts-minify', ['scripts-base'], function(callback) {
  return gulp.src(global.config.dest + '/scripts/**/*.js')
    .pipe(uglify())
    .on('close', callback);
});
