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
        controllerAs: 'vm',
        bindToController: true,
        controller: function(mapService) {
            // Set user defined div id
            this.divId = this.options.mapId;

            mapService.get(this.options);
            this.map = mapService.maps[this.divId];
        },
        template: '<div id="map-canvas"></div><div ng-transclude></div>'
    };
})
// Directive for a single map marker
.directive('gMarker', function(markerFact) {
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
                var marker = markerFact.getMarker(gmap, scope.options);

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

.factory('markerFact', function() {
    var marker = {};

    marker.getMarker = function(map, args) {
        var options = args;
        options.map = map;

        return new google.maps.Marker(options);
    };
    return marker;
})
// Service to create map and store maps data
.service('mapService', function() {
    var self = this;
    var setOptions = function(args) {
        var defaults = {
            zoom: 8,
            center: {lat: -34.397, lng: 150.644}
        };
        var options = angular.copy(defaults, {});
        angular.extend(options, args);
        return options;
    };

    this.maps = {};

    this.get = function(options) {
        var id = options.mapId,
            instance = self.maps[id];

        if(self.maps.hasOwnProperty(id) == false){
            var opt = setOptions(options);
            self.maps[id] = new google.maps.Map(document.getElementById(id), opt);
        }else{
            self.maps[id] = new google.maps.Map(document.getElementById(id), {
                center: instance.center,
                zoom: instance.zoom
            });
        }
    }
});