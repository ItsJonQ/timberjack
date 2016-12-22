// Utils :: Spawn
'use strict';

var gutil = require('gulp-util');
var spawn = require('child_process').spawn;

var sp = function(task, callback) {
  var spawnTaskArgs = task.split(' ');
  var spawnTaskExec = spawnTaskArgs.shift();

  var child = spawn(spawnTaskExec, spawnTaskArgs);

  child.stdout.on('data',
    function (data) {
      gutil.log(data.toString().trim());
    }
  );

  child.stderr.on('data',
    function (data) {
      gutil.log(data.toString().trim());
    }
  );

  child.on('exit', callback);

  return child;
};

module.exports = sp;
