(function(){'use strict';

var animate = require('../bower_components/angular-animate/angular-animate.min.js');
var sanitize = require('../bower_components/angular-sanitize/angular-sanitize.min.js');
var styles = require('./styles/main.scss');
var aggDirections = require('./modules/aggDirections.js');
var aggGeolocation = require('./modules/aggGeolocation.js');
var aggMap = require('./modules/aggMap.js');
var aggPlaces = require('./modules/aggPlaces.js');
var aggUtils = require('./modules/aggUtils.js');
var aggMapMenu = require('./modules/aggMapMenu.js');

angular.module('angular-gmap-gplace', [
    'ngAnimate',
    'ngSanitize',
    'aggGeolocation',
    'aggMap',
    'aggPlaces',
    'aggDirections',
    'aggUtils',
    'aggMapMenu'
]);

}());


