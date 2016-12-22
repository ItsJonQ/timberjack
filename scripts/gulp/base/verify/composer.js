// Base :: Verify :: Composer
'use strict';

var gulp = require('gulp');

gulp.task('verify-composer', function(callback) {
  var task = 'composer install';
  return global.spawn(task, callback);
});
