'use strict';


var aggMenuView = require('./../templates/aggMenu.html');
var aggMenuSearchTemp = require('./../templates/aggMenuSearch.html');
var aggDirectionsTemp = require('./../templates/aggMenuDirections.html');

angular.module('aggMapMenu', [])
/**
 * @desc Animated off-screen menu for the map with directions and search functionality
 * Parent of the aggMenuSearch and aggMenuDirections directives
 * @attr {string} mapIndex - the index of the map the menu is to be associated with
 */
    .directive('aggMenu', function() {
    return {
        restrict: 'E',
        templateUrl: aggMenuView,
        require: ['^aggMap', 'aggMenu'],
        controllerAs: 'aggMenu',
        bindToController: true,
        controller: function() {
            this.map = {};
            this.isOpen = false;
            this.view = '';
            this.toggle = function() {
                this.isOpen = !this.isOpen
            };
            this.goSearch = function () {
                this.view = 'default';
                this.isSearch = true;
                this.isDirections = false;
            };
            this.goDirections = function () {
                this.view = 'directions';
                this.isSearch = false;
                this.isDirections = true;
            };
        },
        link: function (scope, elem, attrs, ctrlrs) {
            var parent = elem.parent(),
                container = angular.element(document.querySelector('#aggMenuContainer'));

            if(parent[0].offsetWidth > 992) container.addClass('menuLg');

            var watcher = scope.$watch(function(){ return ctrlrs[0].map;}, function(value) {
                if(value instanceof google.maps.Map) {
                    ctrlrs[1].map = value;
                    watcher();
                }
            });
        }
    }
})
/**
 * @desc Search widget for the aggMenu. Uses the aggSearch directive on the input element to
 * provide google place predictions. Displays the results in a list under the search box and
 * places a marker on the map for each place
 * @requires {aggMenu}
 */
    .directive('aggMenuSearch', function(aggSearchFact, aggDirectionsServ) {
    return {
        restrict: 'E',
        templateUrl: aggMenuSearchTemp,
        controllerAs: 'search',
        require: ['^aggMenu', 'aggMenuSearch'],
        bindToController: true,
        controller: function() {
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
                this.searchBox.model = [];
                aggDirectionsServ.markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                aggDirectionsServ.renderer.setMap(null);
            };
            this.resultLength = function() {
                return this.searchBox.model.length.toString();
            };
            this.resultsPadding = {padding: .75+'em'};
        },
        link: function(scope, elem, attrs, ctrls) {
            // Options to pass to search box directive
            var watcher = scope.$watch('aggMenu.map', function(value) {
                if(value instanceof google.maps.Map) {
                    ctrls[1].searchBox = {
                        map: value,
                        model: []
                    };
                    watcher();
                }
            });
            // Opens associated marker when clicking on results in list and animates marker
            ctrls[1].openMarker = function(id) {
                google.maps.event.trigger(aggMenuFact.searchObj.markers[id], 'click');
                ctrls[0].toggle();
            };
            // Add watcher to handle search results
            scope.$watch('search.searchBox.model', function(value) {
                if(value !== undefined) {
                    if (value.length > 0) {
                        aggSearchFact.mapSearch(value, ctrls[1].searchBox.map);
                        if(value.length == 1) ctrls[1].resultsPadding.padding = 0;
                        else ctrls[1].resultsPadding.padding = .75+'em';
                    }
                }
            });
        }
    }
})
/**
 * @desc Directive that displays a directions widget inside the aggMenu. Uses the aggAutoComplete
 * directive on the input elements to provide google place predictions. Displays directions in list
 * under autocomplete boxes, draws a polyline representing the route and places markers at each step
 * @requires {aggMenu}
 */
    .directive('aggMenuDirections', function(aggDirectionsServ) {

        return {
            restrict: 'E',
            templateUrl: aggDirectionsTemp,
            controllerAs: 'direct',
            require: ['^aggMenu', '^aggMenuDirections'],
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
            link: function(scope, elem, attrs, ctrls) {
                scope.$watch('direct.request', function(newVal) {
                    if(newVal.origin.hasOwnProperty('geometry') && newVal.destination.hasOwnProperty('geometry')) {
                        var req = aggDirectionsServ.prepareRequest(newVal.origin, newVal.destination, newVal.travelMode);

                        aggDirectionsServ.getSteps(req, ctrls[0].map)
                            .then(function(response) {
                                var leg = response.routes[0].legs[0];
                                ctrls[1].startLoc = leg.start_address;
                                ctrls[1].endLoc = leg.end_address;
                                ctrls[1].via = response.routes[0].summary;
                                ctrls[1].distance = leg.distance.text;
                                ctrls[1].duration = leg.duration.text;
                                for(var i=0; i<leg.steps.length; i++) {
                                    ctrls[1].steps.push(leg.steps[i])
                                }
                                ctrls[1].showDirect = true;
                            });
                    }

                }, true)
            }
        }
    });
