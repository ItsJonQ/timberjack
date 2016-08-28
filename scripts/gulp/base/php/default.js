// Base :: PHP :: Default
'use strict';

var gulp = require('gulp');

gulp.task('php', function(callback) {
  return gulp.src(global.config.app + '/**/*')
    .pipe(gulp.dest(global.config.views))
    .pipe(global.browserSyncReload({ stream: true }))
    .on('close', callback);
});
