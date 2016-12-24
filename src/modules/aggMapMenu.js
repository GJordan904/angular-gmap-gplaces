'use strict';


var aggMenuView = require('./../templates/aggMenu.html');
var aggMenuSearchTemp = require('./../templates/aggMenuSearch.html');
var aggDirectionsTemp = require('./../templates/aggMenuDirections.html');

angular.module('aggMapMenu', [])
/**
 * @desc Animated off-screen menu for the map with directions and search
 * @attr {}
 */
    .directive('aggMenu', function() {
    return {
        restrict: 'E',
        templateUrl: aggMenuView,
        scope: {
            mapId: '@mapId'
        },
        controllerAs: 'aggMenu',
        bindToController: true,
        controller: function() {
            // Toggle Menu
            this.isSearch = false;
            this.isDirections = false;
            this.toggle = function() {
                if(this.isSearch) {
                    this.isSearch = false;
                    return;
                }
                if(this.isDirections) {
                    this.isDirections = false;
                    return;
                }
                if(!this.isSearch && !this.isDirections) {
                    this.isSearch = true;
                }
            };
            // Toggle search/directions
            this.view = '';

        },
        link: function(scope, elem, attrs, ctrl) {
            // Direction Options
            attrs.$observe('mapId', function(value) {
                ctrl.directOpt = {
                    inMenu: true,
                    mapId: value,
                    goBack: function () {
                        ctrl.view = 'default';
                        ctrl.isSearch = true;
                        ctrl.isDirections = false;
                    }
                };
            });
        }
    }
})

.directive('aggMenuSearch', function(aggSearchFact, aggMapServ, aggDirectionsServ) {
    return {
        restrict: 'E',
        templateUrl: aggMenuSearchTemp,
        controllerAs: 'search',
        require: ['^aggMenu', 'aggMenuSearch'],
        scope: {
            mapId: '@mapId'
        },
        bindToController: true,
        controller: function() {
            this.results = [];

            this.openText = function(open) {
                var answer = '';
                if(open) {
                    answer =  'Open Now';
                }else{
                    answer = 'Closed Now';
                }
                return answer;
            };
            this.addressText = function (address) {
                var split = address.split(',');
                return split[0];
            };
            // Clear Map
            this.clearMap = function() {
                aggSearchFact.clear();
                this.results = [];
                aggDirectionsServ.markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                aggDirectionsServ.renderer.setMap(null);
            }
        },
        link: function(scope, elem, attrs, ctrls) {
            var directionIcon = angular.element(elem.find('.directIcon'));
            // Options to pass to search box directive
            ctrls[1].searchBox = {
                map: aggMapServ.maps[parseInt(attrs.mapId)],
                start: function() {
                    console.log(directionIcon);
                    // TODO: This isn't working class is not being added. Element is valid angular.element
                    directionIcon.addClass('aggSpin');
                }
            };
            // Add watcher to handle search results
            scope.$watch('search.results', function(value) {
                if(value.length>0) {
                    aggSearchFact.handleSearch(value, ctrls[1].searchBox.map)
                        .then(function() {
                            // TODO: Mentioned above class isn't added
                            directionIcon.removeClass('aggSpin');
                            ctrls[1].showResults = true;
                        });
                }
            });

            // Opens associated marker when clicking on results in list and animates marker
            ctrls[1].openMarker = function(id) {
                google.maps.event.trigger(aggMenuFact.searchObj.markers[id], 'click');
                ctrls[0].toggle();
            };

            ctrls[1].getDirections = function () {
                ctrls[0].view = 'directions';
                ctrls[0].isSearch = false;
                ctrls[0].isDirections = true;
            }
        }
    }
})

    .directive('aggMenuDirections', function(aggDirectionsServ, aggMapServ) {

        function processAutoComp(origin, destination, mode) {
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

                this.toggleMode = function(mode) {
                    this.request.travelMode = mode;
                };

                this.clearMap = function () {
                    this.showDirect = false;
                    aggDirectionsServ.markers.forEach(function(marker) {
                        marker.setMap(null);
                    });
                    aggDirectionsServ.renderer.setMap(null);
                }
            },
            link: function(scope, elem, attrs, ctrl) {
                var mapId;
                var setOptions = scope.$watch('direct.options', function(value){
                    mapId = value.mapId;
                    scope.inMenu = value.inMenu;
                    if(value.hasOwnProperty('goBack')) {
                        ctrl.goBack = value.goBack;
                    }
                    setOptions();
                });

                scope.$watch('direct.request', function(newVal) {
                    if(newVal.origin.hasOwnProperty('geometry') && newVal.destination.hasOwnProperty('geometry')) {
                        var req = processAutoComp(newVal.origin, newVal.destination, newVal.travelMode);

                        aggDirectionsServ.getSteps(req, aggMapServ.maps[mapId])
                            .then(function(response) {
                                var leg = response.routes[0].legs[0];
                                ctrl.startLoc = leg.start_address;
                                ctrl.endLoc = leg.end_address;
                                ctrl.via = response.routes[0].summary;
                                ctrl.distance = leg.distance.text;
                                ctrl.duration = leg.duration.text;
                                for(var i=0; i<leg.steps.length; i++) {
                                    ctrl.steps.push(leg.steps[i])
                                }
                                ctrl.showDirect = true;
                            });
                    }

                }, true)
            }
        }
    });
