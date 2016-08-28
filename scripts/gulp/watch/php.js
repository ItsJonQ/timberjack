// Watch :: PHP
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var options = require('./_options');

gulp.task('watch-php', function (callback) {
  gulp.watch([
    './**/*.php'
  ], options)
  .on('change', function(event) {
    var file = event.path
      .replace(global.path, '');
    gutil.log(file + ' was', gutil.colors.green('updated'));

    return global.browserSync.reload();
  });
});
