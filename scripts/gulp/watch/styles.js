// Watch :: Styles
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var options = require('./_options');

gulp.task('watch-styles', function (callback) {
  gulp.watch([
    global.config.src + '/styles/**/*'
  ], options, ['styles-base'])
  .on('change', function(event) {
    var file = event.path;
    gutil.log(path.basename(file) + ' was', gutil.colors.green('updated'));
  });
});
