// Base :: Scripts :: Default
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('scripts', function(callback) {
  runSequence(
    'scripts-concat',
    'scripts-minify',
    callback
  );
});
