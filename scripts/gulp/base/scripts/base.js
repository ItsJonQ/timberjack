// Base :: Scripts :: Base
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('scripts-base', function(callback) {
  runSequence(
    'scripts-browserify',
    callback
  );
});
