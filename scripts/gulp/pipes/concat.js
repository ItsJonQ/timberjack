// Pipes :: Concat
'use strict';

var concat = require('gulp-concat');
var gulp = require('gulp');
var lazypipe = require('lazypipe');

var pipe = lazypipe()
  .pipe(function() {
    return concat('vendor.js', {
      newLine: ';'
    });
  })
  .pipe(gulp.dest, global.config.dest + '/scripts')

module.exports = pipe;
