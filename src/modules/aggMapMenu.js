'use strict';

var aggMenuCss = require('./../styles/aggMenu.css');
var aggMenuView = require('./../templates/aggMenu.html');
var aggMenuSearchTemp = require('./../templates/aggMenuSearch.html');

angular.module('aggMapMenu', [])

.directive('aggMenu', function(aggMenuFact) {
    return {
        restrict: 'E',
        require: '^aggMap',
        templateUrl: aggMenuView,
        controllerAs: 'aggMenu',
        bindToController: true,
        controller: function(){

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
            }
        },
        link: function(scope, elem, attrs, gMapCtrl) {
            var map = aggMenuFact.menuObj.gmap = gMapCtrl.map;

        }
    }
})

.directive('aggMenuSearch', function() {
    return {
        restrict: 'E',
        templateUrl: aggMenuSearchTemp,
        controllerAs: 'search',
        bindToController: true,
        controller: function(aggMenuFact) {
            var self = this,
                markers = aggMenuFact.menuObj.searchMarkers,
                map = aggMenuFact.menuObj.gmap;

            // Create the SearchBox
            var input = document.getElementById('menuSearchInput'),
                searchBox = new google.maps.places.SearchBox(input);

            // Bias the SearchBox results towards current map's viewport.
            searchBox.setBounds(map.getBounds());
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            // Add listener to handle search results
            searchBox.addListener('places_changed', function() {
                aggMenuFact.handleSearch(searchBox, map).then(function(){
                    self.results = aggMenuFact.menuObj.searchResults;
                    console.log(self.results);
                });
            });

            // Check if business is open
            this.isOpen = function(open) {
                var answer = '';
                if(open) {
                    answer =  'This business is open';
                }else{
                    answer = 'This business is closed';
                }
                return answer;
            };
        }
    }
})
.factory('aggMenuFact', function($q) {
    var menu = {};

    menu.menuObj = {
        gmap: {},
        searchMarkers: [],
        searchResults: []
    };

    menu.handleSearch = function(box, map) {
        var places = box.getPlaces(),
            deferred = $q.defer();

        if (places.length == 0){
            alert('No places found');
        }

        // Clear out the old markers and search results
        menu.menuObj.searchResults = [];
        menu.menuObj.searchMarkers.forEach(function(marker) {
            marker.setMap(null);
        });

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            menu.menuObj.searchMarkers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            // Push Places to searchResults array
            menu.menuObj.searchResults.push(place);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            deferred.resolve(menu.menuObj);
        });
        map.fitBounds(bounds);
        return deferred.promise;
    };

    menu.search = function(search, type) {
        var map = menu.menuObj.gmap,
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
