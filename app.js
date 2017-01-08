(function() {'use strict';

angular.module('myApp', [
	'app.controllers',
	'app.directives',
	'angular-gmap-gplace',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $aggLoaderProvider) {
	// Configuration for Google Maps
	$aggLoaderProvider.setOptions({
		lang: 'en-US',
		key: 'AIzaSyDJ6F9fpMOP8urg1cVzPkMnrrmgOYCNuCQ',
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
		.state('app.docs', {
			url: '/docs',
			abstract: true,
			views: {
				'mainContent': {
					templateUrl: 'views/docs.html'
				}
			}
		})
		.state('app.docs.aggMap', {
			url: '/agg-map',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggMap.html'
				}
			}
		})
		.state('app.docs.aggAutoComplete', {
			url: '/agg-auto-complete',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggAutoComplete.html'
				}
			}
		})
		.state('app.docs.aggMapServ', {
			url: '/aggMapServ',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggMapServ.html'
				}
			}
		})
		.state('app.samples', {
			url: '/samples',
			abstract: true,
			views: {
				'mainContent': {
					templateUrl: 'views/samples.html',
					controller: 'SamplesCtrl as samples'
				}
			},
			resolve: {
				google: '$aggLoader'
			}
		})
		.state('app.samples.bMap', {
			url: '/basic-map',
			views: {
				'samples': {
					templateUrl: 'views/samples/basicMap.html'
				}
			}
		})
		.state('app.samples.mMap', {
			url: '/menu-map',
			views: {
				'samples': {
					templateUrl: 'views/samples/menuMap.html'
				}
			}
		})
		.state('app.samples.lMap', {
			url: '/location-map',
			views: {
				'samples': {
					templateUrl: 'views/samples/locationMap.html'
				}
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
