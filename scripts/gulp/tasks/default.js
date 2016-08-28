// Tasks :: Default
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Default task
gulp.task('default', function(callback) {
  runSequence(
    'verify-dependencies',
    'clean',
    [
      'php',
      'images',
      'styles-base',
      'scripts-base',
      'scripts-concat',
    ],
    'browsersync',
    'watch'
  );
});
