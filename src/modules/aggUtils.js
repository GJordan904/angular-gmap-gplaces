'use strict';

angular.module('aggUtils', [])

/**
 * @desc Provider that loads scripts for google maps api and font awesome
 *       configured in angular config and then used as a resolve for each state or route.
 *
 */
    .provider('$aggMap', function () {
    // Default Options
    var options = {
            lang: 'en-US',
            key: '',
            libs: 'places',
            loadFontAwesome: true
        };


    // Add Google maps Script to page
    function loadScript($document) {
        var scripts = {
            gMaps: 'https://maps.googleapis.com/maps/api/js?key='+ options.key + '&libraries=' + options.libs + '&callback=mapReady&language=' + options.lang
        };
        if(options.loadFontAwesome) {
            scripts.fontAwesome = 'https://use.fontawesome.com/1c2d7da634.js';
        }
        for(var script in scripts) {
            var scriptTag = $document.createElement('script');
            scriptTag.src = scripts[script];
            $document.getElementsByTagName('body')[0].appendChild(scriptTag);
        }
    }

    /**
     * @method setOptions - called from within angular config to set the provider options
     * @param {object} opt - the options object
     * @param {string} opt.lang - (optional) the language used for google maps
     * @param {string} opt.key - (required) API key for google maps
     * @param {string} opt.libs - (optional) Additional google maps javascript libraries to load
     * @param {boolean} opt.loadFontAwesome - (optional) defaults to true and adds script for font awesome to page
     */
    this.setOptions = function(opt) {
        angular.extend(options, opt);
    };

    /**
     * @desc $get - factory method used to load scripts
     * @returns {Promise} after scripts loaded
     */
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

})
/**
 * @desc Directive that displays a star rating based on a float input
 * @attrs {float} aggStarRating - a float <= 5 representing the rating
 */
    .directive('aggStarRating', function(){
    return {
        restrict: 'A',
        template: '<span class="stars"><span ng-style="{\'width\': starSize}"></span></span>',
        link: function(scope, elem, attrs) {
            var observer = attrs.$observe('aggStarRating', function(value) {
                scope.starSize = value/5*100+'%';
                observer();
            });
        }
    }
});