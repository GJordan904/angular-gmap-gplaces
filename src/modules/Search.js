(function () {'use strict';

angular.module('aggSearch', [])

/**
 * @desc Turns an input box into a google place autocomplete box
 * @attr {obj} the model to be updated with place details
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

/**
 * @desc Turns an input box into a google place search box
 * @attr {obj} the model to be updated with place details
 * @attr {google.maps.Map} the google map to bind search box to
  */
    .directive('aggSearch', function () {
        return {
            restrict: 'A',
            scope: {
                model: '=aggSearch',
                options: '=options'
            },
            link: function (scope, elem, attrs) {
                var input = document.getElementById(elem.attr('id')),
                    searchBox = new google.maps.places.SearchBox(input),
                    startFn = null;

                searchBox.addListener('places_changed', updateModel);

                // Bias the SearchBox results towards current map's viewport.
                // Change the SearchBox bounds on map bounds change
                var watcher = scope.$watch('options', function(value) {
                    if(value.hasOwnProperty('map')) {
                        searchBox.setBounds(value.map.getBounds());
                        value.map.addListener('bounds_changed', function() {
                            searchBox.setBounds(value.map.getBounds());
                        });
                    }
                    if(value.hasOwnProperty('start')) {
                        startFn = value.start;
                    }
                    watcher();
                });

                function updateModel() {
                    if(startFn !== null) startFn();
                    scope.model = searchBox.getPlaces();
                    scope.$apply();
                }
            }
        }
    })

/**
 * @desc Methods and properties for the Search Directives as well as methods for searching without directives
 *
 * @prop {obj} searchObj - holds reference to search results and the markers generated
 * @prop {google.maps.Marker[]} searchObj.markers - array for holding markers generated for search results
 * @prop {google.maps.places.PlaceResult[]} searchObj.results - array for holding PlaceResult objects returned by search
 */
    .factory('aggSearchFact', function($q, aggPlacesFact, aggInfoBoxFact) {
        return {
            searchObj: {
                markers: [],
                results: []
            },
            /**
             * @method nearbySearch - performs google search with supplied params
             * @param {object} opt - the search details
             * @param {google.maps.LatLng} opt.location - the point used as the center of the search
             * @param {int} opt.radius - the radius around search.location to search
             * @param {string} opt.type - the type of establishments to include in search
             * @param {int} opt.minPrice - the min price level to include in search
             * @returns {Promise} containing google PlaceResults[]
             */
            nearbySearch: function(opt) {
                var map = aggMapServ.maps[0],
                    service = new google.maps.places.PlacesService(map),
                    deferred = $q.defer(),
                    request = {
                        location: opt.location,
                        radius: opt.radius,
                        type: [opt.type],
                        rankBy: google.maps.places.RankBy.PROMINENCE,
                        minPriceLevel: opt.minPrice
                    };

                function callback(results, status, pagination) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        var resultObj = {results: results, pagination: pagination};
                        deferred.resolve(resultObj);
                    }else{
                        console.log('Google maps status is: ', status)
                    }
                }
                service.nearbySearch(request, callback);
                return deferred.promise;
            },
            /**
             * @method handleSearch - takes a search response and creates markers and infoboxes for each place. Updates the searchObj prop with results
             * @param {google.maps.places.PlaceResult[]} places - a place result array returned by one of the search directives
             * @param {google.maps.Map} map - the google maps Map object where the markers will be displayed
             * @returns {Promise} the updated searchObj is returned as a promise
             */
            handleSearch: function(places, map) {
            var self = this,
                bounds = new google.maps.LatLngBounds(),
                deferred = $q.defer();

            // Alert if no results
            if (places.length == 0){
                alert('No places found');
            }

            // TODO: Activate more button and attach click handler


            // Clear out the old markers and search results
            this.searchObj.results = [];
            this.searchObj.markers.forEach(function(marker) {
                marker.setMap(null);
            });
            this.searchObj.markers = [];

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
                self.searchObj.markers.push(marker);
                self.searchObj.results.push(place);

                deferred.resolve(self.searchObj);
            });
            map.fitBounds(bounds);
            return deferred.promise;
            },
            /**
             * @method clear - clears out the searchObj
             */
            clear: function () {
                this.searchObj.results = [];
                this.searchObj.markers.forEach(function(marker) {
                    marker.setMap(null);
                });
            }
        }
    })
}());
