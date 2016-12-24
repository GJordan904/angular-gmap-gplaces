var styles = require('./styles/main.scss');
var aggDirections = require('./modules/aggDirections.js');
var aggGeolocation = require('./modules/aggGeolocation.js');
var aggMap = require('./modules/aggMap.js');
var aggPlaces = require('./modules/aggPlaces.js');
var aggUtils = require('./modules/aggUtils.js');
var aggMapMenu = require('./modules/aggMapMenu.js');
var aggSearch = require('./modules/Search.js');
var aggAnimations = require('./modules/Animations.js');

angular.module('angular-gmap-gplace', [
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


