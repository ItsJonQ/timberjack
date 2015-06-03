module.exports = function(grunt) { 'use strict';

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app',
    assetsDir: '{{site.theme.link}}/',
    dist: 'public',
    liveReload: 42526,
    port: 80,
    src: 'src',
    temp: '.tmp',
    url: 'url.dev',
    views: 'views'
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
        files: ['**/*.php', '**/*.twig', '!views/**/*'],
        tasks: ['copy:views'],
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
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
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
          dest: '<%= config.dist %>/styles',
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
          dest: '<%= config.dist %>/images',
          src: ['**']
        }]
      },
      scripts: {
        files: [{
          expand: true,
          cwd: '<%= config.temp %>/scripts',
          dest: '<%= config.dist %>/scripts',
          src: ['**']
        }]
      },
      jquery: {
        src: 'bower_components/jquery/dist/jquery.min.map',
        dest: '<%= config.dist %>/scripts/jquery.min.map'
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      views: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.views %>',
          src: ['**']
        }]
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
        'app',
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
      // Rsync - Fill out the following to rsync deploy to a server
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
          '<%= config.dist %>/styles/main.css': ['<%= config.temp %>/styles/main.css']
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      scripts: {
        files: {
          '<%= config.dist %>/scripts/main.js': ['<%= config.temp %>/scripts/main.js']
        }
      },
      vendor: {
        files: {
          '<%= config.dist %>/scripts/vendor.js': ['<%= config.temp %>/scripts/vendor.js']
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/scripts/{,*/}*.js',
          '<%= config.dist %>/styles/{,*/}*.css'
        ]
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>'
        ],
        blockReplacements: {
          css: function (block) {
            var asset = block.dest;
            var assetsDir = '';
            var obj;

            if(config.assetsDir) {
              assetsDir = config.assetsDir;
            }

            if(grunt.filerev && grunt.filerev.summary) {
              obj = grunt.filerev.summary;

              if(obj.hasOwnProperty(block.dest)) {
                asset = obj[block.dest];
              }
            }

            return '<link rel="stylesheet" href="' + assetsDir + asset + '">';
          },
          js: function (block) {
            var asset = block.dest;
            var assetsDir = '';
            var obj;

            if(config.assetsDir) {
              assetsDir = config.assetsDir;
            }

            if(grunt.filerev && grunt.filerev.summary) {
              obj = grunt.filerev.summary;

              if(obj.hasOwnProperty(block.dest)) {
                asset = obj[block.dest];
              }
            }

            return '<script src="' + assetsDir + asset + '"></script>';
          }
        }
      },
      html: ['<%= config.views %>/{,*/}*.twig'],
      css: ['<%= config.dist %>/styles/{,*/}*.css'],
      js: ['<%= config.dist %>/scripts/{,*/}*.js']
    }

  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('baseBuild', [
    'clean',
    'sass',
    'browserify:scripts',
    'concat',
    'copy'
  ]);

  grunt.registerTask('revBuild', [
    'baseBuild',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('minify', [
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('serve', [
    'baseBuild',
    'watch'
  ]);

  grunt.registerTask('build', [
    'revBuild',
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
