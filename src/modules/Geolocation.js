'use strict';


/**
 * @module aggGeolocation
 * @desc This module contains the components necessary to display a users location on the map
 */
angular.module('aggGeolocation', [])

/**
 * @desc Directive that watches user location and places a custom overlay object on the map
 * @requires {aggMap}
 */
    .directive('aggLocation', function(aggLocationServ) {
        return {
            restrict: 'E',
            require: ['^aggMap'],
            link: function(scope, elem, attrs, ctrlrs) {
                var watcher = scope.$watch(function(){return ctrlrs[0].map;}, function(newVal, oldVal) {
                    if(newVal instanceof google.maps.Map) {
                        aggLocationServ.watchLoc(newVal);
                        watcher();
                    }
                });
                elem.on('$destroy', function () {
                    aggLocationServ.marker = null;
                    aggLocationServ.cancelWatch();
                });
            }
        };
    })
/**
 * @desc A custom OverlayView class that draws the location marker on the map
 * @class AggLocationMarker
 * @extends {google.maps.OverlayView}
 */
    .factory('AggLocationMarker', function() {

        // Animated Location Marker made with custom Overlay
        LocationMarker.prototype = new google.maps.OverlayView();

        function LocationMarker(opts) {
            this.setValues(opts);
        }

        LocationMarker.prototype.draw = function () {
            var div = this.div;

            if (!div) {
                div = this.div = document.createElement('div');
                div.style.position = 'absolute';

                var pulse = document.createElement('div');
                pulse.className = 'locMarker';
                div.appendChild(pulse);

                var center = document.createElement('img');
                center.className = 'markerCenter';
                center.src = require('./../img/locationCircle.png');
                div.appendChild(center);

                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }
            var point = this.getProjection().fromLatLngToDivPixel(this.position);
            if (point) {
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
            }
        };
        return LocationMarker;
    })

/**
 * @desc Service for checking or watching user location
 *
 */
    .service('aggLocationServ', function($q, AggLocationMarker) {
        var self = this,
            q = $q.defer(),
            navGeo = navigator.geolocation,
            geoOptions = {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 30000
            };

        function getSuccess(position) {
            q.resolve({lat: position.coords.latitude, lng: position.coords.longitude});
        }
        function watchSuccess(position) {
            if(self.marker == null) {
                var markOptions = {
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    cursor: 'pointer',
                    map: self.gMap
                };
                self.marker = new AggLocationMarker(markOptions);
            }else {
                self.marker.position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                self.marker.draw();
            }
        }
        function geoError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    q.reject("You did not allow access to your location");
                    break;
                case error.POSITION_UNAVAILABLE:
                    q.reject("Your location information is unavailable");
                    break;
                case error.TIMEOUT:
                    q.reject("The location request timed out");
                    break;
                case error.UNKNOWN_ERROR:
                    q.reject("An unknown error has occurred");
                    break;
            }
        }

        this.gMap = null;
        this.marker = null;
        this.watchId = null;

        /**
         * @method cancels the watchPosition call
         */
        this.cancelWatch = function () {
            navGeo.clearWatch(this.watchId);
        };

        /**
         * @method watches user location and on successful response draws an
         * AggLocationMarker at the users location
         * @param map - the map object where the marker will be drawn
         */
        this.watchLoc = function(map){
            this.gMap = map;
            if(navGeo) {
                this.watchId = navGeo.watchPosition(watchSuccess, geoError, geoOptions);
            }else {
                console.log("Geolocation service is unavailable.");
            }
        };

        /**
         * @method gets user location and returns the coords as a promise
         * @returns {Promise}
         */
        this.getLoc = function(){
            if(navGeo) {
                navGeo.getCurrentPosition(getSuccess, geoError, geoOptions);
            }else {
                q.reject("Geolocation service is unavailable.");
            }
            return q.promise;
        };
    });
