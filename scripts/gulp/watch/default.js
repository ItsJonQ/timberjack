// Watch :: Default
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch', function(callback) {
  runSequence([
    'watch-php',
    'watch-images',
    'watch-scripts',
    'watch-styles',
  ], callback);
});
