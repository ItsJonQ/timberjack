# Timberjack
A starter boilerplate theme for Wordpress that runs on [Timber](https://github.com/jarednova/timber)

### Prerequisites
- npm
- bower
- grunt
- local Wordpress environment

--

### Getting Started
- Clone/copy timberjack into your wp-contents/theme folder
- Open terminal
- ```cd``` into the timberjack folder
- run ```npm install && bower install```
- run ```grunt serve```

--

### Customizing Timberjack
- rename the ```timberjack``` folder to the theme name of your choice
- customize the attributes in ```style.css```
- replace ```screenshot.png``` with the theme screenshot of your choice

--

### Deploying
- add your server's information to ```rsync:production``` in your ```Gruntfile.js```
- run ```grunt deploy```
