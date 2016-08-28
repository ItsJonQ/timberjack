// Pipes :: Uglify
'use strict';

var gulp = require('gulp');
var lazypipe = require('lazypipe');
var uglify = require('gulp-uglify');

var pipe = lazypipe()
  .pipe(uglify)
  .pipe(gulp.dest, global.config.dest + '/scripts')

module.exports = pipe;
