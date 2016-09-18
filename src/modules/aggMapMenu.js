'use strict';

var aggMenuView = require('./../templates/aggMenu.html');
var aggMenuCss = require('./../styles/aggMenu.css');

angular.module('aggMapMenu', [])

.directive('aggMenu', function(aggMenuFact) {
    return {
        restrict: 'E',
        require: '^aggMap',
        transclude: true,
        templateUrl: aggMenuView,
        controllerAs: 'aggMenu',
        bindToController: true,
        controller: function(){

            // Toggle Menu
            this.isOpen = false;
            this.toggle = function() {
                this.isOpen = !this.isOpen;
            };
            // Toggle search/directions
            this.view = 'directions';
        },
        link: function(scope, elem, attrs, gMapCtrl) {
            var map = aggMenuFact.menuObj.gmap = gMapCtrl.map;

        }
    }
})

.factory('aggMenuFact', function() {
    var menu = {};

    // The menuObj allows sharing data between the menu controllers
    menu.menuObj = {};

    return menu;
});
