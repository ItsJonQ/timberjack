// Tasks :: Default
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Default task
gulp.task('deploy', function(callback) {
  runSequence(
    'verify-dependencies',
    'clean',
    [
      'php',
      'images',
      'styles',
      'scripts',
    ],
    'deploy-production',
    callback
  );
});
