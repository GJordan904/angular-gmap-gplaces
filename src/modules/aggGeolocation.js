(function () {'use strict';
var markerCss = require('./../styles/gLocation.css');
//
// The aggGeolocation module is home to all things geolocation related
// Included is the gLocation directive and supporting service and factory
//
angular.module('aggGeolocation', [])
    //
    // Directive for showing user location
    //
    .directive('gLocation', function(mapFact, locService, locMarker) {
        return {
            restrict: 'E',
            require: '^gMap',
            link: function(scope, elem, attrs, gMapCtrl) {
                var gmap = gMapCtrl.map;
                var location = locService.getLoc();

                location.then(
                    function(success){
                        var markOptions = {
                            position: new google.maps.LatLng(success.lat, success.lng),
                            cursor: 'pointer',
                            map: gmap
                        };
                        var marker = new locMarker(markOptions);

                    },
                    function(failed){
                        alert(failed);
                    }
                );
            }
        };
    })
    //
    // This factory creates a custom google maps overlay object
    //
    .factory('locMarker', function() {
        // Animated Location Marker
        LocationMarker.prototype = new google.maps.OverlayView();

        function LocationMarker(opts) {
            this.setValues(opts);
        }

        LocationMarker.prototype.draw = function() {
            var self = this;
            var div = this.div;

            if(!div) {
                div = this.div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.cursor = 'pointer';

                var pulse = document.createElement('div');
                pulse.className = 'locMarker';
                div.appendChild(pulse);

                var center = document.createElement('div');
                center.className = 'markerCenter';
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

    //
    // This service gets the users location and handles errors
    //
    .service('locService', function($q) {
        var deferred = $q.defer();

        // Check User Location
        var navGeo = navigator.geolocation;
        var geoOptions = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 27000
        };
        function geoSuccess(position) {
            deferred.resolve({lat: position.coords.latitude, lng: position.coords.longitude});
        }
        function geoError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    deferred.reject("You did not allow access to your location");
                    break;
                case error.POSITION_UNAVAILABLE:
                    deferred.reject("Your location information is unavailable");
                    break;
                case error.TIMEOUT:
                    deferred.reject("The location request timed out");
                    break;
                case error.UNKNOWN_ERROR:
                    deferred.reject("An unknown error has occurred");
                    break;
            }
        }

        this.watchLoc = function(){};

        this.getLoc = function(){
            if(navGeo) {
                navGeo.watchPosition(geoSuccess, geoError);
            }else {
                deferred.reject("Geolocation service is unavailable.");
            }
            return deferred.promise;
        };
    });

}());