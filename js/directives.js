(function () {
    'use strict';

angular.module('app.directives', [])

    .directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controllerAs: 'tabs',
            bindToController: true,
            controller: function () {
                var panes = this.panes = [];

                this.select = function(pane) {
                    angular.forEach(panes, function(pane){
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function(pane) {
                    if(panes.length == 0) this.select(pane);
                    panes.push(pane);
                }
            },
            replace: true,
            template:
                '<div class="tabbable">' +
                    '<ul class="nav nav-tabs" role="tablist">' +
                        '<li role="presentation" ng-repeat="pane in tabs.panes" ng-class="{active:pane.selected}">' +
                            '<a href="" ng-click="tabs.select(pane)" role="tab">{{pane.title}}</a>' +
                        '</li>' +
                    '</ul>' +
                    '<div class="tab-content" ng-transclude></div>' +
                '</div>'
        }
    })

    .directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: {title: '@'},
            link: function(scope, elem, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            replace: true,
            template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>'
        }
    })

    .directive('prettyprint', function() {
        return {
            restrict: 'C',
            link: function() {
                prettyPrint();
            }
        }
    })

}());
