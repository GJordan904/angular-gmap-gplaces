var styles = require('./styles/main.scss');
var aggDirections = require('./modules/Directions.js');
var aggGeolocation = require('./modules/Geolocation.js');
var aggMap = require('./modules/Map.js');
var aggPlaces = require('./modules/Places.js');
var aggUtils = require('./modules/Utils.js');
var aggMapMenu = require('./modules/MapMenu.js');
var aggSearch = require('./modules/Search.js');
var aggAnimations = require('./modules/Animations.js');

angular.module('angular-gmap-gplaces', [
    'ngAnimate',
    'ngSanitize',
    'aggGeolocation',
    'aggMap',
    'aggPlaces',
    'aggDirections',
    'aggUtils',
    'aggMapMenu',
    'aggSearch',
    'aggAnimations'
]);


