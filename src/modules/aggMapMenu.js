'use strict';

angular.module('aggMapMenu', [])

.directive('aggMenu', function() {
    return {
        restrict: 'E',
        require: '^gMap',
        templateUrl: gStepsControlTemp,
        controllerAs: 'aggMenu',
        bindToController: true,
        controller: function(){

            // Toggle Menu
            this.isOpen = false;
            this.toggle = function() {
                this.isOpen = !this.isOpen;
            };
        },
        link: function(scope, elem, attrs, gMapCtrl) {
            scope.map = gMapCtrl.map;

        }
    }
});
