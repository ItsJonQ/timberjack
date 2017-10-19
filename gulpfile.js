// Gulpfile
'use strict';
const path = require('path');
require('dotenv').config();

global.config = require('./scripts/gulp/config');
global.path = __dirname;
global.exec = require('./scripts/node/utils/exec');
global.spawn = require('./scripts/node/utils/spawn');
global.require = function(modulePath, options) {
  let log = true;

  if (options && typeof(options.log) !== 'undefined') {
    log = options.log;
  }

  try {
    return require(modulePath);
  }
  catch (e) {
    if (log) {
      console.log(modulePath + ' is missing!');
      console.log('\x1b[31m' + 'Try running: npm install' + '\x1b[0m');
    }
    return false;
  }
};

const gulp = global.require('gulp');
const glob = global.require('glob', { log: false });

glob.sync('./scripts/gulp/**/*.js').forEach(function(file) {
  require(path.resolve(file));
});
