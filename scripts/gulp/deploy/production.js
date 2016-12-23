// Scripts :: Deploy :: Production
'use strict';

var gulp = require('gulp');
var rsync = require('gulp-rsync');

var syncPaths = [
  './*',
  './**/*.php',
  './public/**/*',
  './views/**/*.twig',
];

gulp.task('deploy-production', function() {
  return gulp.src(syncPaths)
    .pipe(rsync({
      destination: global.config.sync.dest,
      hostname: global.config.sync.host,
      username: global.config.sync.user,
      recursive: true,
      verbose: true
    }));
});
