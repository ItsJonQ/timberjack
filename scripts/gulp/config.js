// Gulp :: Config
'use strict';

var config = {
  app: 'app',
  assetsDir: '{{site.theme.link}}/',
  cache: '.asset-cache',
  dest: 'public',
  name: 'kbw-investments',
  port: 8114,
  src: 'src',
  sync: {
    dest: '',
    host: '',
    user: 'root'
  },
  temp: '.tmp',
  url: 'localhost:8114',
  views: 'views',
};

module.exports = config;
