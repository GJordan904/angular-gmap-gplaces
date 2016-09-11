(function() {'use strict';

angular.module('myApp', [
	'app.controllers',
	'angular-gmap-gplace',
	'hljs',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app', {
			url: '',
			abstract: true,
			templateUrl: 'views/main.html'
		})
		.state('app.home', {
			url: '/home',
			views: {
				'mainContent': {
					templateUrl: 'views/home.html'
				}
			}
		})
		.state('app.docsPlaces', {
			url: '/docs/places',
			views: {
				'mainContent': {
					templateUrl: 'views/docsPlaces.html'
				}
			}
		})
		.state('app.docsMap', {
			url: '/docs/map',
			views: {
				'mainContent': {
					templateUrl: 'views/docsMap.html'
				}
			}
		})
		.state('app.exPlace', {
			url: '/ex/place',
			views: {
				'mainContent': {
					templateUrl: 'views/exPlace.html',
					controller: 'PlacesCtrl as places'
				}
			}
		})
		.state('app.exPlaces', {
			url: '/ex/places',
			views: {
				'mainContent': {
					templateUrl: 'views/exPlaces.html',
					controller: 'PlacesCtrl as places'
				}
			}
		})
		.state('app.exMap', {
			url: '/ex/map',
			views: {
				'mainContent': {
					templateUrl: 'views/exMap.html',
					controller: 'MapCtrl as map'
				}
			}
		});

	$urlRouterProvider.otherwise('/home');
})
.directive('showTab', function() {
	return {
		link: function (scope, element, attrs) {
			element.click(function(e) {
				e.preventDefault();
				$(element).tab('show');
			});
		}
	};
});

}());
