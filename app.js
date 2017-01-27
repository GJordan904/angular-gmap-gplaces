(function() {'use strict';

angular.module('myApp', [
	'app.controllers',
	'app.directives',
	'angular-gmap-gplaces',
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $aggLoaderProvider) {
	// Configuration for Google Maps
	$aggLoaderProvider.setOptions({
		lang: 'en-US',
		key: 'AIzaSyDJ6F9fpMOP8urg1cVzPkMnrrmgOYCNuCQ',
		libs: 'places',
		numMaps: 4
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
					templateUrl: 'views/home.html',
					controller: 'HomeCtrl as home'
				}
			},
            resolve: {
                google: '$aggLoader'
            },
			data: {
				title: 'angular-gmap-gplaces'
			}
		})
		.state('app.start', {
			url: '/start',
			views: {
				'mainContent': {
					templateUrl: 'views/start.html'
				}
			},
            data: {
                title: 'Getting Started'
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
			},
            data: {
                title: 'agg-map'
            }
		})
		.state('app.docs.aggMenu', {
			url: '/agg-menu',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggMenu.html'
				}
			},
            data: {
                title: 'agg-menu'
            }
		})
		.state('app.docs.aggAutoComplete', {
			url: '/agg-auto-complete',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggAutoComplete.html'
				}
			},
            data: {
                title: 'agg-auto-complete'
            }
		})
		.state('app.docs.aggMapServ', {
			url: '/aggMapServ',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggMapServ.html'
				}
			},
            data: {
                title: 'aggMapServ'
            }
		})
		.state('app.docs.aggSearch', {
			url: '/agg-search',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggSearch.html'
				}
			},
            data: {
                title: 'agg-search'
            }
		})
		.state('app.docs.aggSearchFact', {
			url: '/aggSearchFact',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggSearchFact.html'
				}
			},
            data: {
                title: 'aggSearchFact'
            }
		})
		.state('app.docs.aggLocation', {
			url: '/agg-location',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggLocation.html'
				}
			},
            data: {
                title: 'agg-location'
            }
		})
        .state('app.docs.aggLocationMarker', {
            url: '/aggLocationMarker',
            views: {
                'docs': {
                    templateUrl: 'views/docs/aggLocationMarker.html'
                }
            },
            data: {
                title: 'aggLocationMarker'
            }
        })
        .state('app.docs.aggLocationServ', {
            url: '/aggLocationServ',
            views: {
                'docs': {
                    templateUrl: 'views/docs/aggLocationServ.html'
                }
            },
            data: {
                title: 'aggLocationServ'
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
			},
            data: {
                title: 'Basic Map Demo'
            }
		})
		.state('app.samples.mMap', {
			url: '/menu-map',
			views: {
				'samples': {
					templateUrl: 'views/samples/menuMap.html'
				}
			},
            data: {
                title: 'Menu Map Demo'
            }
		})
		.state('app.samples.lMap', {
			url: '/location-map',
			views: {
				'samples': {
					templateUrl: 'views/samples/locationMap.html'
				}
			},
            data: {
                title: 'Location Map Demo'
            }
		})
		.state('app.samples.autocomplete', {
			url: '/autocomplete',
			views: {
				'samples': {
					templateUrl: 'views/samples/autocomplete.html'
				}
			},
            data: {
                title: 'Autocomplete Demo'
            }
		})
		.state('app.samples.directions', {
			url: '/directions',
			views: {
				'samples': {
					templateUrl: 'views/samples/directions.html'
				}
			},
            data: {
                title: 'Directions Demo'
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
