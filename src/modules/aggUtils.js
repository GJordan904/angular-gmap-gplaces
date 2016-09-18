'use strict';

angular.module('aggUtils', [])
//
// The googleMapService provider is used to load google maps asynchronously
// It is configurable with the options for language, api key, and libraries
//
.provider('$aggMap', function () {
    // Default Options
    var language = 'en-US',
        apiKey = '',
        libraries = '';

    // Add Google maps Script to page
    function loadScript($document, callback, success) {
        var scriptTag = $document.createElement('script');
        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&libraries='+libraries+'&callback=mapReady&language='+language;
        $document.getElementsByTagName('body')[0].appendChild(scriptTag);
    }
    // Set user defined options
    this.setOptions = function(opt) {
        language = opt.lang;
        apiKey = opt.key;
        libraries = opt.libs;
    };
    // Return a promise once google map is loaded
    this.$get = function($document, $q, $window) {

        var deferred = $q.defer();
        loadScript($document[0]);

        $window.mapReady = (function(deferred) {
            return function() {
                deferred.resolve(google);
                delete $window.mapReady
            }
        })(deferred);

        return deferred.promise;
    };

});