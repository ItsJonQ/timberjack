// Watch :: PHP
'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var options = require('./_options');

gulp.task('watch-php', function (callback) {
  gulp.watch([
    global.config.app + '/**/*'
  ], options, ['php']);
});
