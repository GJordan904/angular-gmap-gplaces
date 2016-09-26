'use strict';

var gPlacesTemp = require('./../templates/gPlaces.html');

//
// Google Places Factory and Directives
//
angular.module('aggPlaces', [])

.directive('aggPlaces', function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            tempUrl: '@'
        },
        templateUrl: gPlacesTemp,
        controllerAs: 'agg',
        bindToController: true,
        controller: function($scope, aggPlacesFact) {
            var self = this;

            this.getPage = function(pageNum) {
                aggPlacesFact.getPage(pageNum).then(function(results){
                    console.log('$scope.getPage fired', results); // This only fires if I wait about 5 seconds after previous run.
                    self.details = results;
                });
            };
            this.needsPagination = function() {
                return aggPlacesFact.needsPagination();
            };
            $scope.$watch('self.model', function(newVal, oldVal) {
                if(newVal !== undefined) {
                    aggPlacesFact.getPlaces(self.model).then(function (results) {
                        self.details = results;
                        self.pageNum = aggPlacesFact.pagination.pageNum;
                        self.numPages = aggPlacesFact.pagination.getNumPages(aggPlacesFact.pagination.numPages);
                    });
                }
            });
        }
    };
})

.directive('aggPlace', function() {
    return {
        restrict: 'E',
        scope: {
            tempUrl: '@',
            placeId: '='
        },
        controller: function($scope, aggPlacesFact) {
            aggPlacesFact.getPlace($scope.placeId).then(function(results) {
                $scope.details = results;
            });
        },
        template: '<div ng-include="tempUrl"></div>'
    };
})

.factory('aggPlacesFact', function ($q) {
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
