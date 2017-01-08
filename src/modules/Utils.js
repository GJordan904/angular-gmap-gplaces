'use strict';

angular.module('aggUtils', [])

/**
 * @desc Provider that loads scripts for google maps api and font awesome
 *       configured in angular config and then used as a resolve for each state or route.
 *
 */
    .provider('$aggLoader', function () {
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
 * @desc Directive that displays a star rating based on a float input. Number of stars and
 * scale are configurable. Rating calculated as a percent so stars can be partially filled
 * @attr {float} rating - value representing the rating. Can be between 0 and the total number of stars
 * @attr {obj} options - optional object used to pass scale and number of stars
 * @attr {int} options.size - the number of stars to show (default=5)
 * @attr {float} options.scale - sets the scale of stars. At the default value stars are 20px wide (default=1)
 */
    .directive('aggStarRating', function(){
        return {
            restrict: 'E',
            template: '<div class="aggStars"><span ng-style="{\'width\': starSize}"></span></div>',
            link: function(scope, elem, attrs) {
                var stars = elem.find('div'),
                    rating = scope.$eval(attrs.rating),
                    opt = scope.$eval(attrs.options),
                    settings = {
                        size: 5,
                        scale: 1
                    };
                angular.extend(settings, opt);
                if(settings.size !== 5) {
                    stars.css({width: settings.size*20+'px'});
                }
                if(settings.scale !== 1) {
                    stars.css({transform: 'scale('+settings.scale+')'});
                }
                scope.starSize = rating/settings.size*100+'%';
            }
        }
    })
/**
 * @desc Directive that sizes an img to fill its parents width or height while maintaining aspect
 * ratio. If the image is wider than tall it will fill the parents width and if taller than
 * wide it fits the parent height
 *
 */
    .directive('scaleImg', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var pHeight = elem.parent()[0].offsetHeight,
                    eWidth = elem[0].offsetWidth;

                elem[0].onload = function() {
                    var imgHeight = elem[0].naturalHeight,
                        imgWidth = elem[0].naturalWidth,
                        imgRatio, newWidth, newHeight;

                    if(imgWidth > imgHeight) {
                        imgRatio = imgHeight / imgWidth;
                        newWidth = eWidth;
                        newHeight = newWidth * imgRatio;
                        if(newHeight > pHeight) {
                            newHeight = pHeight;
                            newWidth = newHeight * imgRatio;
                        }
                    }else{
                        imgRatio = imgWidth / imgHeight;
                        newHeight = pHeight;
                        newWidth = newHeight * imgRatio;
                    }
                    elem.css({height: newHeight+'px', width: newWidth+'px'})
                };
            }
        }
    })

    .directive('scaleDiv', function() {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var pHeight = elem.parent()[0].offsetHeight,
                    pWidth = elem.parent()[0].offsetWidth;

                if(pHeight < pWidth) elem.css({height: pHeight+'px', width: pHeight+'px'});
                else elem.css({height: pWidth+'px', width: pWidth+'px'});
            }
        }
    });