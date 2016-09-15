
angular.module('aggUtils', [])

.provider('googleMapService', function () {
    // Default Options
    var language = 'en-US',
        apiKey = '',
        libraries = '';


    function loadScript($document, callback, success) {
        var scriptTag = $document.createElement('script');
        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&libraries='+libraries+'&callback=mapReady&language='+language;
        $document.getElementsByTagName('body')[0].appendChild(scriptTag);
    }

    this.setOptions = function(opt) {
        language = opt.lang;
        apiKey = opt.key;
        libraries = opt.libs;
    };

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