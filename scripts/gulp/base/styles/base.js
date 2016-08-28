// Base :: Styles :: Base
'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');

var sass = require('../../pipes/sass');

gulp.task('styles-base', function(callback) {
  return gulp.src(global.config.src + '/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(global.browserSyncReload({ stream: true }))
    .on('close', callback);
});
