// Pipes :: CSS Min
'use strict';

var lazypipe = require('lazypipe');
var gulp = require('gulp');
var cssmin = require('gulp-clean-css');

var options = {
  advanced: false,
  aggressiveMerging: false,
  keepSpecialComments: 0,
  restructuring: false,
  semanticMerging: false
};

var pipe = lazypipe()
  .pipe(cssmin, options)
  .pipe(gulp.dest, global.config.dest + '/styles');

module.exports = pipe;
