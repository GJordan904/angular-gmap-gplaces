//
// Google Map Factory and Directives
// Directives for making the map and for making a marker
//
angular.module('aggMap', [])

// The map directive
.directive('gMap', function() {
    return {
        restrict: 'E',
        scope: {
            'options': '='
        },
        transclude: true,
        controller: function($scope, mapFact) {
            this.map = mapFact.map($scope.options);
        },
        template: '<div id="map-canvas"></div><div ng-transclude></div>'
    };
})
// Directive for a single marker
.directive('gMarker', function(mapFact) {
    return {
        restrict: 'E',
        require: '^gMap',
        scope: {
            'options': '=',
            'click': '&'
        },
        link: function(scope, elem, attrs, gMapCtrl) {
            var gmap = gMapCtrl.map;

            var watcher = scope.$watch('options', function() {
                var marker = mapFact.marker(gmap, scope.options);

                // Attach click function to marker if defined
                var userFunct = scope.click();
                function clickFunc() {
                    userFunct(marker, gmap);
                }
                if(userFunct !== undefined) {
                    marker.addListener('click', clickFunc);
                }
                watcher();
            })

        }
    };
})

.factory('mapFact', function() {
    var map = {};

    var setOptions = function(defs, args) {
        var options = angular.copy(defs, {});
        angular.extend(options, args);
        return options;
    };

    map.map = function(args) {
        var defaults = {
            zoom: 8,
            center: {lat: -34.397, lng: 150.644}
        };
        return new google.maps.Map(document.getElementById('map-canvas'), setOptions(defaults, args));
    };

    map.marker = function(map, args) {
        var options = args;
        options.map = map;

        return new google.maps.Marker(options);
    };

    map.markers = function() {
        // Create multiple markers
    };
    return map;
});