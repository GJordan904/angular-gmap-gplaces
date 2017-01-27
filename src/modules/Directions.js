'use strict';

angular.module('aggDirections', [])

/**
 * @desc Takes in an origin, destination, and travel mode; outputs directions.
 * Requires the aggMap directive to render directions
 */
    .directive('aggDirections', function (aggMapServ, $timeout) {
        return {
            restrict: 'E',
            scope: {
                template: '@',
                map: '@'
            },
            template: '<div ng-include="template"></div>',
            link: function (scope, elem, attrs) {
                aggMapServ.getMap(parseInt(attrs.map)).then(function (map) {
                        console.log(map);
                    })
            }
        }
    })

/**
 * @desc This service provides methods for getting directions, drawing
 * them on the map and optionally returning step by step instructions.
 */
    .service('aggDirectionsServ', function($q){
    var self = this;

    function getDirections(request) {
        var service = new google.maps.DirectionsService();
        var q = $q.defer();

        service.route(request, callback);

        function callback(response, status) {
            if(status === 'OK') {
                q.resolve(response);
            }else{
                console.log("getDirections failed");
            }
        }
        return q.promise;
    }

    function buildSteps(directions, map) {
        var route = directions.routes[0].legs[0];

        for(var i = 0; i< route.steps.length; i++) {
            var marker = self.markers[i] = self.markers[i] || new google.maps.Marker();
            marker.setMap(map);
            marker.setPosition(route.steps[i].start_location);
            makeInfoWindow(marker, route.steps[i].instructions, map);
        }

        function makeInfoWindow(marker, text, map) {
            var infoWindow = new  google.maps.InfoWindow();

            infoWindow.setContent(text);
            // Attach click handler to marker
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        }
    }

    this.markers = [];

    this.renderer = new google.maps.DirectionsRenderer();

    this.getSteps = function(request, map) {
        var q = $q.defer(),
            self = this;

        this.renderer.setMap(map);
        getDirections(request).then(function(response){
            self.renderer.setDirections(response);
            buildSteps(response, map);
            q.resolve(response);
        });
        return q.promise;
    };

    this.getDirections = function(request, map) {
        var q = $q.defer(),
            self = this;

        this.renderer.setMap(map);

        getDirections(request).then(function(response) {
            self.renderer.setDirections(response);
            q.resolve(response);
        });
        return q.promise;
    };

    this.prepareRequest = function (origin, destination, mode) {
        return {
            origin: new google.maps.LatLng(origin.geometry.location.lat(), origin.geometry.location.lng()),
            destination: new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()),
            travelMode: mode
        };
    };
});

