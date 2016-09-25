'use strict';

var styles = require('./styles/main.scss');
var aggDirections = require('./modules/aggDirections.js');
var aggGeolocation = require('./modules/aggGeolocation.js');
var aggMap = require('./modules/aggMap.js');
var aggPlaces = require('./modules/aggPlaces.js');
var aggUtils = require('./modules/aggUtils.js');
var aggMapMenu = require('./modules/aggMapMenu.js');

angular.module('angular-gmap-gplace', [
    'aggGeolocation',
    'aggMap',
    'aggPlaces',
    'aggDirections',
    'aggUtils',
    'aggMapMenu'
]);


