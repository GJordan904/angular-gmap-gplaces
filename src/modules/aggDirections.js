var gStepsControlTemp = require('./../templates/gStepsControl.html');
var gStepsControlCss = require('./../styles/gStepsControl.css');

angular.module('aggDirections', [])
// Directions with step by step instructions
.directive('gSteps', function (directionsService) {
    return {
        restrict: 'E',
        require: '^gMap',
        scope: {
            request: '='
        },
        templateUrl: '',
        link: function(scope, elem, attrs, gMapCtrl) {
            var gmap = gMapCtrl.map;

            directionsService.get(scope.request, gmap);
        }
    };
})

.directive('gStepsControl', function() {
    return {
        restrict: 'E',
        require: '^gMap',
        templateUrl: gStepsControlTemp,
        link: function() {

        }
    }
})

.service('directionsService', function(locService, $q){
    var self = this;

    function getDirections(request) {
        var service = new google.maps.DirectionsService();
        var deferred = $q.defer();

        service.route(request, callback);

        function callback(response, status) {
            if(status === 'OK') {
                deferred.resolve(response);
            }else{
                console.log("getDirections failed");
            }
        }

        return deferred.promise;
    }

    function buildSteps(directions, map) {
        var markers = [];
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

    this.get = function(request, map) {
        var renderer = new google.maps.DirectionsRenderer({map: map});

        getDirections(request).then(function(response){
            renderer.setDirections(response);
            buildSteps(response, map);
        });
    };
});

