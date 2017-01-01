'use strict';

angular.module('aggDirections', [])

/**
 * @desc Takes in an origin, destination, and travel mode; outputs directions.
 * Requires the aggMap directive to render directions
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
});

