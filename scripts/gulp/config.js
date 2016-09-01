// Gulp :: Config
'use strict';

var config = {
  app: 'app',
  assetsDir: '{{site.theme.link}}/',
  cache: '.asset-cache',
  dest: 'public',
  name: 'app',
  port: 8080,
  src: 'src',
  sync: {
    dest: '',
    host: '',
    user: 'root'
  },
  temp: '.tmp',
  url: 'app.dev',
  views: 'views',
};

module.exports = config;
