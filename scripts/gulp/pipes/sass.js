// Pipes :: Sass
'use strict';

var lazypipe = require('lazypipe');
var gulp = require('gulp');
var harvester = require('seed-harvester');
var packer = require('seed-packer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var includePaths = harvester(
  // Base
  global.config.src + '/styles'
  // Vendors
);

var pipe = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(function() {
    packer(global.config.src + '/styles/plugins/_seed-packs.scss');

    return sass({
      includePaths: includePaths
    })
    .on('error', sass.logError);
  })
  .pipe(sourcemaps.write)
  .pipe(gulp.dest, global.config.dest + '/styles');

module.exports = pipe;
