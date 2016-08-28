// Base :: Images :: Default
'use strict';

var gulp = require('gulp');

gulp.task('images', function(callback) {
  return gulp.src(global.config.src + '/images/**/*')
    .pipe(gulp.dest(global.config.dest + '/images'))
    .on('close', callback);
});
