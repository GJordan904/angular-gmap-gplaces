(function () {'use strict';

var gPlacesTemp = require('./../templates/gPlaces.html');
//
// Google Places Factory and Directives
//
angular.module('aggPlaces', [])

    .directive('gPlaces', function() {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                tempUrl: '@'
            },
            templateUrl: gPlacesTemp,
            controller: function($scope, placesFact) {

                $scope.getPage = function(pageNum) {
                    placesFact.getPage(pageNum).then(function(results){
                        console.log('$scope.getPage fired', results); // This only fires if I wait about 5 seconds after previous run.
                        $scope.details = results;
                    });
                };
                $scope.needsPagination = function() {
                    return placesFact.needsPagination();
                };

                placesFact.getPlaces($scope.model).then(function(results) {
                    $scope.details = results;
                    $scope.pageNum = placesFact.pagination.pageNum;
                    $scope.numPages = placesFact.pagination.getNumPages(placesFact.pagination.numPages);
                });

            }
        };
    })

    .directive('gPlace', function() {
        return {
            restrict: 'E',
            scope: {
                tempUrl: '@',
                placeId: '='
            },
            controller: function($scope, placesFact) {
                placesFact.getPlace($scope.placeId).then(function(results) {
                    $scope.details = results;
                });
            },
            template: '<div ng-include="tempUrl"></div>'
        };
    })

    .factory('placesFact', function ($q) {
        var places = {};

        // Performs Multiple requests for details
        // If ID array is longer than 10 the array is split using the split() function
        places.getPlaces = function(ids) {
            var promises = [];
            var i;

            if(ids.length > 10) {
                pages = splitIds(ids);

                for(i=0; i<pages[0].length; i++) {
                    promises.push(places.getPlace(pages[0][i]));
                }
                // Set Pagination values
                places.pagination.pageNum = 1;
                places.pagination.numPages = pages.length;

            }else{
                for(i=0; i<ids.length; i++) {
                    promises.push(places.getPlace(ids[i]));
                }
            }
            return $q.all(promises);
        };

        // Split id array into groups of 10 since google will only process 10 place requests at a time
        var splitIds = function(ids) {
            var idSets = [],
                i, j, k;

            for (i=0, j=ids.length, k=0; i<j; i+=10){
                idSets[k] = ids.slice(i, i+10);
                k++;
            }
            return idSets;
        };

        // Makes request for details of single place id
        places.getPlace = function(id) {
            var deferred = $q.defer(),
                request = {placeId: id};

            var map = new google.maps.Map(document.createElement('div'));

            var service = new google.maps.places.PlacesService(map);

            function callback(results, status){
                if(status === google.maps.places.PlacesServiceStatus.OK) {
                    deferred.resolve(results);
                }
            }
            service.getDetails(request, callback);
            return deferred.promise;
        };

        // When ID array is longer than 10 it is split. This function allows showing of more results
        places.getPage = function(pageNum) {
            var promises = [];

            for(var i=0; i<pages[pageNum].length; i++) {
                promises.push(places.getPlace(pages[pageNum][i]));
            }
            // Set Page Number
            places.pagination.pageNum = pageNum;
            console.log("places.getPage fired", promises); // This fired and changes the array

            return $q.all(promises);
        };

        // Pagination
        var pages = [];
        places.pagination = {
            pageNum: 0,
            numPages: 0,
            getNumPages: function(numPages){return new Array(numPages);}
        };

        places.needsPagination = function() {
            return places.pagination.numPages > 1;
        };

        return places;
    });

}());
