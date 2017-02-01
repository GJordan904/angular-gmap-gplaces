'use strict';

angular.module('aggDirections', [])

/**
 * @desc Takes in an origin, destination, and travel mode; outputs directions.
 * Requires the aggMap directive to render directions on the map.
 * Also requires a template to facilitate taking in user input and then optionally
 * displaying text directions back.
 */
.directive('aggDirections', function (aggMapServ, aggDirectionsServ) {
    return {
        restrict: 'E',
        scope: {
            template: '@',
            method: '@'
        },
        require: ['^aggMap', '^aggDirections'],
        template: '<div ng-include="template"></div>',
        controllerAs: 'dir',
        controller: function() {
            this.input = {
                origin: '',
                destination: ''
            };
            this.request = {
                origin: {},
                destination: {},
                travelMode: 'DRIVING'
            };
            this.route = {
                start: '',
                end: '',
                via: '',
                distance: '',
                duration: '',
                steps: []
            };
            this.showDirect = false;
            this.toggle = function(){this.showDirect = !this.showDirect};
            this.clear = function(){
                aggDirectionsServ.clearDirections();
                this.input.origin = '';
                this.input.destination = '';
                this.request.origin = {};
                this.request.destination = {};
                this.showDirect = false;
            };
        },
        link: function (scope, elem, attrs, ctrlrs) {
            var watcher = scope.$watch(function(){return ctrlrs[0].map;}, function(newVal) {
                if(newVal instanceof google.maps.Map) {

                    scope.$watch('dir.request', function (req) {
                        if (req != undefined && req.origin.hasOwnProperty('geometry') && req.destination.hasOwnProperty('geometry')) {
                            var pReq = aggDirectionsServ.prepareRequest(req.origin, req.destination, req.travelMode),
                                method = '';

                            if (attrs.method != undefined) method = attrs.method.toLowerCase();
                            switch (method) {
                                case 'steps':
                                    aggDirectionsServ.getSteps(pReq, newVal).then(function (response) {
                                        var route = response.routes[0];
                                        aggDirectionsServ.prepareRoute(route, ctrlrs[1].route, false);
                                        ctrlrs[1].showDirect = true;
                                    });
                                    break;
                                case 'simple':
                                    aggDirectionsServ.getDirections(pReq, newVal).then(function (response) {
                                        var route = response.routes[0];
                                        aggDirectionsServ.prepareRoute(route, ctrlrs[1].route, true);
                                        ctrlrs[1].showDirect = true;
                                    });
                                    break;
                                case 'mapsteps':
                                    aggDirectionsServ.getSteps(pReq, newVal);
                                    break;
                                default:
                                    aggDirectionsServ.getDirections(pReq, newVal);
                                    break;
                            }
                        }
                    }, true);
                    watcher();
                }
            });
        }
    };
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
        console.log('building steps');
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
        console.log('executing getSteps');
        console.log(map);
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
        console.log('executing getDirections');
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

    this.prepareRoute = function (route, model, simple) {
        var leg = route.legs[0];

        model.start = leg.start_address;
        model.end = leg.end_address;
        model.via = route.summary;
        model.distance = leg.distance.text;
        model.duration = leg.duration.text;

        if(!simple) {
            for (var i = 0; i < leg.steps.length; i++) {
                model.steps.push(leg.steps[i])
            }
        }
    };

    this.clearDirections = function () {
        this.markers.forEach(function(marker) {
            marker.setMap(null);
        });
        this.renderer.setMap(null);
    }
});

