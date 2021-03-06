// Watch :: Images
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var options = require('./_options');

gulp.task('watch-images', function (callback) {
  gulp.watch([
    global.config.src + '/images/**/*'
  ], options, ['images'])
  .on('change', function(event) {
    var file = event.path
      .replace(global.path, '');
    gutil.log(file + ' was', gutil.colors.green('updated'));
    global.browserSync.reload();
  });
});
