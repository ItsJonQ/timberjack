// Clean :: Default
'use strict';

var del = require('del');
var gulp = require('gulp');

gulp.task('clean', function() {
  del([
    global.config.views,
    global.config.dest
  ]);
});
