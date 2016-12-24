(function() {'use strict';

angular.module('myApp', [
	'app.controllers',
	'app.directives',
	'angular-gmap-gplace',
	'hljs',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $aggMapProvider) {
	// Configuration for Google Maps
	$aggMapProvider.setOptions({
		lang: 'en-US',
		key: 'AIzaSyCUmYH5tWFnfSu-Q8A2kRF7VzXo9KfyU9g',
		libs: 'places'
	});

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
			url: '/docs/places/:scrollTo',
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
			},
            resolve: {
                googleMap: '$aggMap'
            }
		})
		.state('app.exPlaces', {
			url: '/ex/places',
			views: {
				'mainContent': {
					templateUrl: 'views/exPlaces.html',
					controller: 'PlacesCtrl as places'
				}
			},
			resolve: {
				googleMap: '$aggMap'
			}
		})
		.state('app.exMap', {
			url: '/ex/map',
			views: {
				'mainContent': {
					templateUrl: 'views/exMap.html',
					controller: 'MapCtrl as map'
				}
			},
			resolve: {
				googleMap: '$aggMap'
			}
		});

	$urlRouterProvider.otherwise('/home');
})

.run(function($rootScope, $location, $anchorScroll, $stateParams, $timeout) {
	// This allows changing state and scrolling to a specific ID on the page
	$rootScope.$on('$stateChangeSuccess', function(newRoute, oldRoute) {
		$timeout(function() {
			$location.hash($stateParams.scrollTo);
			$anchorScroll()
		}, 100)
	});
})

}());
