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
		.state('app.docs.aggDirections', {
			url: '/agg-directions',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggDirections.html'
				}
			},
			data: {
				title: 'agg-directions'
			}
		})
		.state('app.docs.aggLoader', {
			url: '/$aggLoader',
			views: {
				'docs': {
					templateUrl: 'views/docs/aggLoader.html'
				}
			},
			data: {
				title: '$aggLoader'
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
                title: 'Basic Map'
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
                title: 'Menu Map'
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
                title: 'Location Map'
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
                title: 'Autocomplete'
            }
		})
		.state('app.samples.directMap', {
			url: '/directions-map',
			views: {
				'samples': {
					templateUrl: 'views/samples/directMap.html'
				}
			},
            data: {
                title: 'Map Directions'
            }
		})
        .state('app.samples.directMapSteps', {
            url: '/directions-map-steps',
            views: {
                'samples': {
                    templateUrl: 'views/samples/directMapSteps.html'
                }
            },
            data: {
                title: 'Map Directions with Steps'
            }
        })
        .state('app.samples.directMapText', {
            url: '/directions-map-text',
            views: {
                'samples': {
                    templateUrl: 'views/samples/directMapText.html'
                }
            },
            data: {
                title: 'Map Directions with Text'
            }
        })
        .state('app.samples.directMapTextSteps', {
            url: '/directions-map-text-steps',
            views: {
                'samples': {
                    templateUrl: 'views/samples/directMapTextSteps.html'
                }
            },
            data: {
                title: 'Map Directions with Steps and Text'
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
