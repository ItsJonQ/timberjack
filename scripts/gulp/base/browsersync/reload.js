// Base :: BrowserSync :: Reload
'use strict';

var gulp = require('gulp');

gulp.task('browsersync-reload', function() {
  global.browserSync.reload();
});
