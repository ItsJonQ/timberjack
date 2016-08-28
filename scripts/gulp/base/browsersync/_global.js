// Base :: BrowserSync :: Global
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create(global.config.name);

global.browserSync = browserSync;
global.browserSyncReload = browserSync.reload;
