// Watch :: Images
'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var options = require('./_options');

gulp.task('watch-images', function (callback) {
  gulp.watch([
    global.config.src + '/images/**/*'
  ], options, ['images']);
});

