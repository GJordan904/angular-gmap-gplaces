'use strict';


var aggMenuView = require('./../templates/aggMenu.html');
var aggMenuSearchTemp = require('./../templates/aggMenuSearch.html');

angular.module('aggMapMenu', [])

.directive('aggMenu', function(aggMenuFact, aggDirectionsServ) {
    return {
        restrict: 'E',
        templateUrl: aggMenuView,
        scope: {
            mapId: '@mapId'
        },
        controllerAs: 'aggMenu',
        bindToController: true,
        controller: function($scope) {
            // Toggle Menu
            this.isOpen = false;
            this.toggle = function() {
                this.isOpen = !this.isOpen;
            };
            // Toggle search/directions
            this.view = '';

            // Clear Map
            this.clearMap = function() {
                aggMenuFact.menuObj.searchResults = [];
                aggMenuFact.menuObj.searchMarkers.forEach(function(marker) {
                    marker.setMap(null);
                });
                aggDirectionsServ.markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                aggDirectionsServ.renderer.setMap(null);
            }
        },
        link: function(scope, elem, attrs, ctrl) {
            // Direction Options
            attrs.$observe('mapId', function(value) {
                ctrl.directOpt = {
                    inMenu: true,
                    mapId: value,
                    goBack: function () {
                        ctrl.view = 'default';
                    }
                };
            });
            WebFont.load({
                google: {
                    families: ['Baloo Bhaina', 'Oswald']
                }
            })
        }
    }
})

.directive('aggMenuSearch', function(aggMenuFact, aggMapServ) {
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
            var self = this,
                markers = aggMenuFact.menuObj.searchMarkers;

            this.results = [];

            // Check if business is open
            this.isOpen = function(open) {
                var answer = '';
                if(open) {
                    answer =  'Open Now';
                }else{
                    answer = 'Closed Now';
                }
                return answer;
            };

            // Calculate Star Rating
            this.getStars = function(rating) {
                // Get the value
                var val = parseFloat(rating);
                // Turn value into number/100
                var size = val/5*100;
                return size + '%';
            };
        },
        link: function(scope, elem, attrs, ctrls) {
            // Create the SearchBox
            var input = document.getElementById('menuSearchInput'),
                searchBox = new google.maps.places.SearchBox(input),
                map = aggMapServ.maps[parseInt(attrs.mapId)];

            // Bias the SearchBox results towards current map's viewport.
            // Change the SearchBox bounds on map bounds change
            searchBox.setBounds(map.getBounds());
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            // Add listener to handle search results
            searchBox.addListener('places_changed', function() {
                aggMenuFact.handleSearch(searchBox, map).then(function(){
                    ctrls[1].results = aggMenuFact.menuObj.searchResults;
                });
            });

            // Opens associated marker when clicking on results in list and animates marker
            ctrls[1].openMarker = function(id) {
                google.maps.event.trigger(aggMenuFact.menuObj.searchMarkers[id], 'click');
                ctrls[0].toggle();
            };

            ctrls[1].goBack = function () {
                ctrls[0].view = 'default'
            }
        }
    }
})
.factory('aggMenuFact', function($q, aggPlacesFact, aggInfoBoxFact) {
    var menu = {};

    menu.menuObj = {
        searchMarkers: [],
        searchResults: []
    };

    menu.handleSearch = function(box, map) {
        var places = box.getPlaces(),
            bounds = new google.maps.LatLngBounds(),
            deferred = $q.defer();

        // Alert if no results
        if (places.length == 0){
            alert('No places found');
        }

        // Activate more button and attach click handler


        // Clear out the old markers and search results
        menu.menuObj.searchResults = [];
        menu.menuObj.searchMarkers.forEach(function(marker) {
            marker.setMap(null);
        });
        menu.menuObj.searchMarkers = [];

        // Create Info Box and map click handler for closing info box
        var infoBox = new aggInfoBoxFact();

        // For each place, create an icon, marker, and info box
        // Push the markers and results to arrays for viewing
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                placeId: place.place_id,
                position: place.geometry.location
            });

            // Add listener to map for closing infobox and stopping marker animation
            google.maps.event.addListener(map, 'click', function () {
                if(marker.getAnimation() !== null) marker.setAnimation(null);
                infoBox.close();
            });

            // Create info box and click handler for marker
            marker.addListener('click', function(){
                // Animate Marker
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
                // Lookup place details for place associated with marker then fill info box with details
                aggPlacesFact.getPlace(place.place_id)
                    .then(function(results) {
                        // Info Box Content
                        var content = '<div class="ibHeader">' +
                                         '<h3>' + results.name + '</h3>' +
                                      '</div>' +
                                      '<div class="ibBody">' +
                                         '<img src="' + results.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}) + '" width="100%" height="auto">' +
                                         '<ul>' +
                                             '<li>' + results.formatted_phone_number + '</li>' +
                                             '<li>' + results.vicinity + '</li>' +
                                             '<li>' + results.rating + '</li>' +
                                         '</ul>' +
                                      '</div> ';
                        // Set content of InfoBox
                        infoBox.setContent(content);
                        // Open Info Box on marker click
                        infoBox.open(map, marker);
                })
            });

            // Set bounds to include all results
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            // Push markers and search results to arrays.
            // The directives will watch these arrays and update the DOM as necessary
            menu.menuObj.searchMarkers.push(marker);
            menu.menuObj.searchResults.push(place);

            deferred.resolve(menu.menuObj);
        });
        map.fitBounds(bounds);
        return deferred.promise;
    };

    menu.search = function(search, type) {
        var map = aggMapServ.maps[0],
            service = new google.maps.places.PlacesService(map),
            deferred = $q.defer(),
            request = {
                location: search.location,
                radius: search.radius,
                type: [type],
                rankBy: google.maps.places.RankBy.PROMINENCE,
                minPriceLevel: 2
            };

        function callback(results, status, pagination) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('callback fired');
                test.searchObj.results = results;
                test.searchObj.pagination = pagination;
                deferred.resolve(test.searchObj);
            }else{
                console.log('Google maps status is: ', status)
            }
        }
        service.nearbySearch(request, callback);
        return deferred.promise;
    };

    return menu;
});
