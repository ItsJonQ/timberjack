module.exports = function(grunt) { 'use strict';

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  var config = {
    dest: 'public',
    dist: 'dist',
    liveReload: 42526,
    port: 80,
    src: 'src',
    temp: '.tmp',
    url: 'url.dev'
  };

  grunt.initConfig({

    config: config,

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: []
      },
      js: {
        files: ['<%= config.src %>/scripts/**/*'],
        tasks: [
          'jshint',
          'copy:jquery',
          'concat:scripts',
          'browserify:scripts',
          'copy:scripts'
        ],
        options: {
          livereload: '<%= config.liveReload %>'
        }
      },
      images: {
        files: ['<%= config.src %>/images/**/*'],
        tasks: ['copy:images'],
        options: {
          livereload: '<%= config.liveReload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server'],
        options: {
          livereload: '<%= config.liveReload %>'
        }
      },
      php: {
        files: ['**/*.php'],
        options: {
          livereload: '<%= config.liveReload %>'
        }
      },
      styles: {
        files: ['<%= config.src %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles']
      }
    },

    browserify: {
      scripts: {
        files: {
          '<%= config.temp %>/scripts/main.js' : [ '<%= config.src %>/scripts/main.js' ]
        }
      }
    },

    connect: {
      options: {
        port: '<%= config.port %>',
        open: true,
        livereload: '<%= config.liveReload %>',
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '<%= config.url %>'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.src)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.src)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= config.dist %>/*',
            '!<%%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.src %>/scripts/{,*/}*.js',
        '!<%= config.src %>/scripts/vendor/*'
      ]
    },

    sass: {
      options: {
        sourcemap: true,
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dest %>/styles',
          ext: '.css'
        }]
      }
    },

    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.src %>/header.php'],
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
      },
      sass: {
        src: ['<%= config.src %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    copy: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images',
          dest: '<%= config.dest %>/images',
          src: ['**']
        }]
      },
      scripts: {
        files: [{
          expand: true,
          cwd: '<%= config.temp %>/scripts',
          dest: '<%= config.dest %>/scripts',
          src: ['**']
        }]
      },
      jquery: {
        src: 'bower_components/jquery/dist/jquery.min.map',
        dest: '<%= config.dest %>/scripts/jquery.min.map'
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    concat: {
      scripts: {
        src: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'vendor/scripts/**/*.js',
        ],
        dest: '<%= config.temp %>/scripts/vendor.js'
      }
    },

    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    rsync: {
      options: {
        args: ['--verbose'],
        exclude: [
        '.git*',
        '*.scss',
        'node_modules',
        '.sass-cache',
        'bower_components',
        'dist',
        'src',
        '.DS_Store',
        '.jshintrc',
        '.gitignore',
        'bower.json',
        'README.md',
        'package.json',
        '.tmp',
        'vendor'
        ],
        recursive: true
      },
      production: {
        options: {
          src: './',
          dest: '',
          host: '',
          delete: true
        }
      }
    },

    cssmin: {
      styles: {
        files: {
          '<%= config.dest %>/styles/main.css': ['<%= config.temp %>/styles/main.css']
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      scripts: {
        files: {
          '<%= config.dest %>/scripts/main.js': ['<%= config.temp %>/scripts/main.js']
        }
      },
      vendor: {
        files: {
          '<%= config.dest %>/scripts/vendor.js': ['<%= config.temp %>/scripts/vendor.js']
        }
      }
    }
  });

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('baseBuild', [
    'sass',
    'browserify:scripts',
    'copy:scripts',
    'copy:images',
    'copy:jquery',
    'concat:scripts'
  ]);

  grunt.registerTask('minify', [
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('start', [
    'baseBuild',
    'watch'
  ]);

  grunt.registerTask('build', [
    'baseBuild',
    'minify'
  ]);

  // Quick deploy
  grunt.registerTask('sync', [
    'rsync:production'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'sync'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};