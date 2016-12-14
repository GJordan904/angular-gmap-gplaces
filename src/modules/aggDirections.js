'use strict';

var aggDirectionsTemp = require('./../templates/aggMenuDirections.html');

angular.module('aggDirections', [])

// Directions with step by step instructions
.directive('gSteps', function (aggDirectionsServ) {
    return {
        restrict: 'E',
        require: '^aggMap',
        scope: {
            request: '='
        },
        templateUrl: '',
        link: function(scope, elem, attrs, gMapCtrl) {
            var gmap = gMapCtrl.map;

            aggDirectionsServ.getSteps(scope.request, gmap);
        }
    };
})
/**
 * @desc Takes in an origin, destination, and travel mode; outputs directions.
 * Requires the aggMap directive to render directions
 * @attrs none
 */
.directive('aggDirections', function(aggDirectionsServ, aggMapServ) {

    function processAutoComp(origin, destination, mode) {
        console.log('processing request');
        return {
            origin: new google.maps.LatLng(origin.geometry.location.lat(), origin.geometry.location.lng()),
            destination: new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()),
            travelMode: mode
        }
    }

    return {
        restrict: 'E',
        templateUrl: aggDirectionsTemp,
        scope: {
            options: '=options'
        },
        controllerAs: 'direct',
        bindToController: true,
        controller: function(){
            this.request = {
                origin: {},
                destination: {},
                travelMode: 'DRIVING'
            };
            this.showDirect = false;
            this.startLoc = '';
            this.endLoc = '';
            this.via = '';
            this.distance = '';
            this.duration = '';
            this.steps = [];
        },
        link: function(scope, elem, attrs, ctrl) {
            var mapId;
            var setOptions = scope.$watch('direct.options', function(value){
               mapId = value.mapId;
               scope.inMenu = value.inMenu;
                if(value.hasOwnProperty('goBack')) {
                    scope.goBack = value.goBack;
                }
                setOptions();
            });

            scope.$watch('direct.request', function(newVal, oldVal) {
                if(newVal.origin.hasOwnProperty('geometry') && newVal.destination.hasOwnProperty('geometry')) {
                    var req = processAutoComp(newVal.origin, newVal.destination, newVal.travelMode);

                    aggDirectionsServ.getSteps(req, aggMapServ.maps[mapId])
                        .then(function(response) {
                            var leg = response.routes[0].legs[0];

                            ctrl.via = response.routes[0].summary;
                            ctrl.distance = leg.distance.text;
                            ctrl.duration = leg.duration.text;
                            for(var i=0; i<leg.steps.length; i++) {
                                ctrl.steps.push(leg.steps[i])
                            }
                            ctrl.showDirect = true;
                            console.log(response);
                        });
                }

            }, true)
        }
    }
})
/**
 * @desc Turns an input box into a google place autocomplete box
 * @attrs takes the model to be updated with place details as an attribute
 */
.directive('aggAutoComplete', function () {
    return {
        restrict: 'A',
        scope: {
            model: '=aggAutoComplete'
        },
        link: function (scope, elem, attrs) {
           var input = document.getElementById(elem.attr('id'));
           var autocomplete = new google.maps.places.Autocomplete(input, {});
            autocomplete.addListener('place_changed', updateModel);

            function updateModel() {
                scope.model = autocomplete.getPlace();
                scope.$apply();
            }
        }
    }
})

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

