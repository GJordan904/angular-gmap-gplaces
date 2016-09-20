/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aggDirections = __webpack_require__(2);
	var aggGeolocation = __webpack_require__(4);
	var aggMap = __webpack_require__(10);
	var aggPlaces = __webpack_require__(11);
	var aggUtils = __webpack_require__(13);
	var aggMapMenu = __webpack_require__(14);

	angular.module('angular-gmap-gplace', [
	    'aggGeolocation',
	    'aggMap',
	    'aggPlaces',
	    'aggDirections',
	    'aggUtils',
	    'aggMapMenu'
	]);




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aggDirectionsTemp = __webpack_require__(19);

	angular.module('aggDirections', [])

	// Directions with step by step instructions
	.directive('gSteps', function (aggDirectionsServ) {
	    return {
	        restrict: 'E',
	        require: '^aggMap',
	        scope: {
	            request: '='
	        },
	        templateUrl: '',
	        link: function(scope, elem, attrs, gMapCtrl) {
	            var gmap = gMapCtrl.map;

	            aggDirectionsServ.getSteps(scope.request, gmap);
	        }
	    };
	})

	.directive('aggDirections', function() {
	    return {
	        restrict: 'E',
	        require: '^aggMap',
	        templateUrl: aggDirectionsTemp,
	        controllerAs: 'direct',
	        bindToController: true,
	        controller: function(){
	            // Holds route information
	            this.route = {};

	            // Toggle Menu
	            this.isOpen = false;
	            this.toggle = function() {
	                this.isOpen = !this.isOpen;
	            };
	        },
	        link: function(scope, elem, attrs, gMapCtrl) {
	            var map = gMapCtrl.map;

	        }
	    }
	})

	.service('aggDirectionsServ', function(locService, $q){
	    var self = this;

	    function getDirections(request) {
	        var service = new google.maps.DirectionsService();
	        var deferred = $q.defer();

	        service.route(request, callback);

	        function callback(response, status) {
	            if(status === 'OK') {
	                deferred.resolve(response);
	            }else{
	                console.log("getDirections failed");
	            }
	        }

	        return deferred.promise;
	    }

	    function buildSteps(directions, map) {
	        var route = directions.routes[0].legs[0];

	        for(var i = 0; i< route.steps.length; i++) {
	            var marker = self.markers[i] = self.markers[i] || new google.maps.Marker();
	            marker.setMap(map);
	            marker.setPosition(route.steps[i].start_location);
	            makeInfoWindow(marker, route.steps[i].instructions, map);
	        }

	        function makeInfoWindow(marker, text, map) {
	            var infoWindow = new  google.maps.InfoWindow();

	            infoWindow.setContent(text);
	            // Attach click handler to marker
	            marker.addListener('click', function() {
	                infoWindow.open(map, marker);
	            });
	        }
	    }

	    this.markers = [];

	    this.getSteps = function(request, map) {
	        var renderer = new google.maps.DirectionsRenderer({map: map});

	        getDirections(request).then(function(response){
	            renderer.setDirections(response);
	            buildSteps(response, map);
	        });
	    };

	    this.getDirections = function(request, map) {
	        var renderer = new google.maps.DirectionsRenderer(({map: map}));

	        getDirections(request).then(function(response) {
	            renderer.setDirections(response);
	        });
	    };
	});



/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var markerCss = __webpack_require__(5);
	//
	// The aggGeolocation module is home to all things geolocation related
	// Included is the gLocation directive and supporting service and factory
	//
	angular.module('aggGeolocation', [])
	//
	// Directive for showing user location
	//
	.directive('aggLocation', function(aggMarkerFact, aggLocationServ, aggLocationMarkerFact) {
	    return {
	        restrict: 'E',
	        require: '^aggMap',
	        link: function(scope, elem, attrs, gMapCtrl) {
	            var gmap = gMapCtrl.map;
	            var location = aggLocationServ.getLoc();

	            location.then(
	                function(success){
	                    var markOptions = {
	                        position: new google.maps.LatLng(success.lat, success.lng),
	                        cursor: 'pointer',
	                        map: gmap
	                    };

	                    var marker = new aggLocationMarkerFact(markOptions);
	                },
	                function(failed){
	                    alert(failed);
	                }
	            );
	        }
	    };
	})
	//
	// This factory creates a custom google maps overlay object
	//
	.factory('aggLocationMarkerFact', function() {

	    // Animated Location Marker made with custom Overlay
	    LocationMarker.prototype = new google.maps.OverlayView();

	    function LocationMarker(opts) {
	        this.setValues(opts);
	    }

	    LocationMarker.prototype.draw = function () {
	        var div = this.div;

	        if (!div) {
	            div = this.div = document.createElement('div');
	            div.style.position = 'absolute';

	            var pulse = document.createElement('div');
	            pulse.className = 'locMarker';
	            div.appendChild(pulse);

	            var center = document.createElement('img');
	            center.className = 'markerCenter';
	            center.src = __webpack_require__(9);
	            div.appendChild(center);

	            var panes = this.getPanes();
	            panes.overlayImage.appendChild(div);
	        }
	        var point = this.getProjection().fromLatLngToDivPixel(this.position);
	        if (point) {
	            div.style.left = point.x + 'px';
	            div.style.top = point.y + 'px';
	        }
	    };
	return LocationMarker;
	})

	//
	// This service gets the users location and handles errors
	//
	.service('aggLocationServ', function($q) {
	    var deferred = $q.defer();

	    // Check User Location
	    var navGeo = navigator.geolocation;
	    var geoOptions = {
	        enableHighAccuracy: true,
	        timeout: 30000,
	        maximumAge: 27000
	    };
	    function geoSuccess(position) {
	        deferred.resolve({lat: position.coords.latitude, lng: position.coords.longitude});
	    }
	    function geoError(error) {
	        switch(error.code) {
	            case error.PERMISSION_DENIED:
	                deferred.reject("You did not allow access to your location");
	                break;
	            case error.POSITION_UNAVAILABLE:
	                deferred.reject("Your location information is unavailable");
	                break;
	            case error.TIMEOUT:
	                deferred.reject("The location request timed out");
	                break;
	            case error.UNKNOWN_ERROR:
	                deferred.reject("An unknown error has occurred");
	                break;
	        }
	    }

	    this.watchLoc = function(){};

	    this.getLoc = function(){
	        if(navGeo) {
	            navGeo.watchPosition(geoSuccess, geoError);
	        }else {
	            deferred.reject("Geolocation service is unavailable.");
	        }
	        return deferred.promise;
	    };
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./gLocation.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./gLocation.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "@keyframes aggPulsate {\n    0% {\n        transform: scale(.1);\n        opacity: 0\n    }\n    50% {\n        opacity: 1\n    }\n    to {\n        transform: scale(1.2);\n        opacity: 0\n    }\n}\n\n.locMarker {\n    position: absolute;\n    margin-top: -50px;\n    margin-left: -50px;\n    transform: rotateX(55deg)\n}\n\n.locMarker:after {\n    display: block;\n    width: 100px;\n    height: 100px;\n    content: '';\n    animation: aggPulsate 1s ease-out;\n    animation-delay: 1.1s;\n    animation-iteration-count: infinite;\n    opacity: 0;\n    border-radius: 50%;\n    box-shadow: 0 0 6px 3px #f93c11\n}\n.markerCenter {\n    position: absolute;\n    height: 15px;\n    width: 15px;\n    margin-top: -7.5px;\n    margin-left: -7.5px;\n}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkMDhUt5aL7gAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAE4SURBVGje7drLEYMwDARQ1iXRSGpNI7QE52SGA9JaH7y6cYn1ItuDsbZNoXhVYPLvn9XyQiFkSI4oDJ2SKxpAqTmjEZSSO5pizfmjMdZkQDT2u+8/z5/jCEUjAvuPvAsnHkzwORNKhIMBPqOgJDjCwCyoE+4Cp2PZ6MFIZjaWOQa81Y3AGisNeoWjsYwxR5O3Kdrr7+hUXcbYY1ssYJnOmdU1bGBYusKj09pl5KIKC1x0OltzUoUFXhlM+uCWeU5WhQWuPK0tuei01OXEZDkpaQ13WcuescfDqd5+uY6sfzprTMrNQ9QG5v0mTdu0IirNGkOXaR4wG551XWpCe+DZF+Iu9BN4pZYHN/oOX7mphYYOOg9Q36iWakyrgg5tPcyEpzWXRsPLtA/PhpdtEGfi33A8VSgUCn9ckxdqTPOyv3QAAAAASUVORK5CYII="

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	//
	// Google Map Factory and Directives
	// Directives for making the map and for making a marker
	//
	angular.module('aggMap', [])

	// The map directive
	.directive('aggMap', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            'options': '='
	        },
	        transclude: true,
	        controllerAs: 'map',
	        bindToController: true,
	        controller: function(aggMapServ) {
	            // Set user defined div id
	            this.divId = this.options.mapId;

	            aggMapServ.get(this.options);
	            this.map = aggMapServ.maps[this.divId];
	        },
	        template: '<div id="map-canvas"></div><div ng-transclude></div>'
	    };
	})
	// Directive for a single map marker
	.directive('aggMarker', function(aggMarkerFact) {
	    return {
	        restrict: 'E',
	        require: '^aggMap',
	        scope: {
	            'options': '=',
	            'click': '&'
	        },
	        link: function(scope, elem, attrs, gMapCtrl) {
	            var gmap = gMapCtrl.map;

	            // Watcher setup to wait for the marker options. Without it the map loads without the marker
	            // because the marker tries to create with no options.
	            var watcher = scope.$watch('options', function() {
	                var marker = aggMarkerFact.getMarker(gmap, scope.options);

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

	.factory('aggMarkerFact', function() {
	    var marker = {};

	    marker.getMarker = function(map, args) {
	        var options = args;
	        options.map = map;

	        return new google.maps.Marker(options);
	    };
	    return marker;
	})
	// Service to create map and store maps data
	.service('aggMapServ', function() {
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
	            console.log(instance);
	            self.maps[id] = new google.maps.Map(document.getElementById(id), {
	                center: instance.center,
	                zoom: instance.zoom,
	                styles: instance.styles,
	                mapTypeId: instance.mapTypeId
	            });
	        }
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var gPlacesTemp = __webpack_require__(12);

	//
	// Google Places Factory and Directives
	//
	angular.module('aggPlaces', [])

	.directive('aggPlaces', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            model: '=',
	            tempUrl: '@'
	        },
	        templateUrl: gPlacesTemp,
	        controllerAs: 'agg',
	        bindToController: true,
	        controller: function($scope, aggPlacesFact) {
	            var self = this;

	            this.getPage = function(pageNum) {
	                aggPlacesFact.getPage(pageNum).then(function(results){
	                    console.log('$scope.getPage fired', results); // This only fires if I wait about 5 seconds after previous run.
	                    self.details = results;
	                });
	            };
	            this.needsPagination = function() {
	                return aggPlacesFact.needsPagination();
	            };

	            aggPlacesFact.getPlaces(this.model).then(function(results) {
	                self.details = results;
	                self.pageNum = aggPlacesFact.pagination.pageNum;
	                self.numPages = aggPlacesFact.pagination.getNumPages(aggPlacesFact.pagination.numPages);
	            });

	        }
	    };
	})

	.directive('aggPlace', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            tempUrl: '@',
	            placeId: '='
	        },
	        controller: function($scope, aggPlacesFact) {
	            aggPlacesFact.getPlace($scope.placeId).then(function(results) {
	                $scope.details = results;
	            });
	        },
	        template: '<div ng-include="tempUrl"></div>'
	    };
	})

	.factory('aggPlacesFact', function ($q) {
	    var places = {};

	    // Performs Multiple requests for details
	    // If ID array is longer than 10 the array is split using the split() function
	    places.getPlaces = function(ids) {
	        var promises = [];
	        var i;

	        if(ids.length > 10) {
	            pages = splitIds(ids);

	            for(i=0; i<pages[0].length; i++) {
	                promises.push(places.getPlace(pages[0][i]));
	            }
	            // Set Pagination values
	            places.pagination.pageNum = 1;
	            places.pagination.numPages = pages.length;

	        }else{
	            for(i=0; i<ids.length; i++) {
	                promises.push(places.getPlace(ids[i]));
	            }
	        }
	        return $q.all(promises);
	    };

	    // Split id array into groups of 10 since google will only process 10 place requests at a time
	    var splitIds = function(ids) {
	        var idSets = [],
	            i, j, k;

	        for (i=0, j=ids.length, k=0; i<j; i+=10){
	            idSets[k] = ids.slice(i, i+10);
	            k++;
	        }
	        return idSets;
	    };

	    // Makes request for details of single place id
	    places.getPlace = function(id) {

	    var deferred = $q.defer(),
	        request = {placeId: id};

	    var map = new google.maps.Map(document.createElement('div'));

	    var service = new google.maps.places.PlacesService(map);

	    function callback(results, status){
	        if(status === google.maps.places.PlacesServiceStatus.OK) {
	            deferred.resolve(results);
	        }
	    }
	    service.getDetails(request, callback);
	    return deferred.promise;
	    };

	    // When ID array is longer than 10 it is split. This function allows showing of more results
	    places.getPage = function(pageNum) {
	        var promises = [];

	        for(var i=0; i<pages[pageNum].length; i++) {
	            promises.push(places.getPlace(pages[pageNum][i]));
	        }
	        // Set Page Number
	        places.pagination.pageNum = pageNum;
	        console.log("places.getPage fired", promises); // This fired and changes the array

	        return $q.all(promises);
	    };

	    // Pagination
	    var pages = [];
	    places.pagination = {
	        pageNum: 0,
	        numPages: 0,
	        getNumPages: function(numPages){return new Array(numPages);}
	    };

	    places.needsPagination = function() {
	        return places.pagination.numPages > 1;
	    };

	    return places;
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/gPlaces.html';
	var html = "<div ng-include=\"agg.tempUrl\"></div>\n\n<nav id=\"pagination\" aria-label=\"Page navigation\" ng-show=\"agg.needsPagination()\">\n    <ul class=\"pagination\">\n        <li>\n            <a href=\"#\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n            </a>\n        </li>\n\n        <li ng-repeat=\"page in agg.numPages track by $index\">\n            <a href=\"\" ng-click=\"agg.getPage($index)\">{{$index+1}}</a>\n        </li>\n\n        <li>\n            <a href=\"#\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n            </a>\n        </li>\n    </ul>\n</nav>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	angular.module('aggUtils', [])
	//
	// The googleMapService provider is used to load google maps asynchronously
	// It is configurable with the options for language, api key, and libraries
	//
	.provider('$aggMap', function () {
	    // Default Options
	    var language = 'en-US',
	        apiKey = '',
	        libraries = '';

	    // Add Google maps Script to page
	    function loadScript($document, callback, success) {
	        var scriptTag = $document.createElement('script');
	        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key='+apiKey+'&libraries='+libraries+'&callback=mapReady&language='+language;
	        $document.getElementsByTagName('body')[0].appendChild(scriptTag);
	    }
	    // Set user defined options
	    this.setOptions = function(opt) {
	        language = opt.lang;
	        apiKey = opt.key;
	        libraries = opt.libs;
	    };
	    // Return a promise once google map is loaded
	    this.$get = function($document, $q, $window) {

	        var deferred = $q.defer();
	        loadScript($document[0]);

	        $window.mapReady = (function(deferred) {
	            return function() {
	                deferred.resolve(google);
	                delete $window.mapReady
	            }
	        })(deferred);

	        return deferred.promise;
	    };

	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aggMenuCss = __webpack_require__(15);
	var aggMenuView = __webpack_require__(17);
	var aggMenuSearchTemp = __webpack_require__(18);

	angular.module('aggMapMenu', [])

	.directive('aggMenu', function(aggMenuFact) {
	    return {
	        restrict: 'E',
	        require: '^aggMap',
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
	            this.view = '';

	            // Clear Map
	            this.clearMap = function() {
	                aggMenuFact.menuObj.searchResults = [];
	                aggMenuFact.menuObj.searchMarkers.forEach(function(marker) {
	                    marker.setMap(null);
	                });
	            }
	        },
	        link: function(scope, elem, attrs, gMapCtrl) {
	            var map = aggMenuFact.menuObj.gmap = gMapCtrl.map;

	        }
	    }
	})

	.directive('aggMenuSearch', function() {
	    return {
	        restrict: 'E',
	        templateUrl: aggMenuSearchTemp,
	        controllerAs: 'search',
	        bindToController: true,
	        controller: function(aggMenuFact) {
	            var self = this,
	                markers = aggMenuFact.menuObj.searchMarkers,
	                map = aggMenuFact.menuObj.gmap;

	            // Create the SearchBox
	            var input = document.getElementById('menuSearchInput'),
	                searchBox = new google.maps.places.SearchBox(input);

	            // Bias the SearchBox results towards current map's viewport.
	            searchBox.setBounds(map.getBounds());
	            map.addListener('bounds_changed', function() {
	                searchBox.setBounds(map.getBounds());
	            });

	            // Add listener to handle search results
	            searchBox.addListener('places_changed', function() {
	                aggMenuFact.handleSearch(searchBox, map).then(function(){
	                    self.results = aggMenuFact.menuObj.searchResults;
	                    console.log(self.results);
	                });
	            });

	            // Check if business is open
	            this.isOpen = function(open) {
	                var answer = '';
	                if(open) {
	                    answer =  'This business is open';
	                }else{
	                    answer = 'This business is closed';
	                }
	                return answer;
	            };
	        }
	    }
	})
	.factory('aggMenuFact', function($q) {
	    var menu = {};

	    menu.menuObj = {
	        gmap: {},
	        searchMarkers: [],
	        searchResults: []
	    };

	    menu.handleSearch = function(box, map) {
	        var places = box.getPlaces(),
	            deferred = $q.defer();

	        if (places.length == 0){
	            alert('No places found');
	        }

	        // Clear out the old markers and search results
	        menu.menuObj.searchResults = [];
	        menu.menuObj.searchMarkers.forEach(function(marker) {
	            marker.setMap(null);
	        });

	        // For each place, get the icon, name and location.
	        var bounds = new google.maps.LatLngBounds();
	        places.forEach(function(place) {
	            if (!place.geometry) {
	                console.log("Returned place contains no geometry");
	                return;
	            }
	            var icon = {
	                url: place.icon,
	                size: new google.maps.Size(71, 71),
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(17, 34),
	                scaledSize: new google.maps.Size(25, 25)
	            };

	            // Create a marker for each place.
	            menu.menuObj.searchMarkers.push(new google.maps.Marker({
	                map: map,
	                icon: icon,
	                title: place.name,
	                position: place.geometry.location
	            }));

	            // Push Places to searchResults array
	            menu.menuObj.searchResults.push(place);

	            if (place.geometry.viewport) {
	                // Only geocodes have viewport.
	                bounds.union(place.geometry.viewport);
	            } else {
	                bounds.extend(place.geometry.location);
	            }

	            deferred.resolve(menu.menuObj);
	        });
	        map.fitBounds(bounds);
	        return deferred.promise;
	    };

	    menu.search = function(search, type) {
	        var map = menu.menuObj.gmap,
	            service = new google.maps.places.PlacesService(map),
	            deferred = $q.defer(),
	            request = {
	                location: search.location,
	                radius: search.radius,
	                type: [type],
	                rankBy: google.maps.places.RankBy.PROMINENCE,
	                minPriceLevel: 2
	            };

	        function callback(results, status, pagination) {
	            if (status === google.maps.places.PlacesServiceStatus.OK) {
	                console.log('callback fired');
	                test.searchObj.results = results;
	                test.searchObj.pagination = pagination;
	                deferred.resolve(test.searchObj);
	            }else{
	                console.log('Google maps status is: ', status)
	            }
	        }
	        service.nearbySearch(request, callback);
	        return deferred.promise;
	    };

	    return menu;
	});


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./aggMenu.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./aggMenu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "/* Menu Button */\n#aggMenuBtn {\n    position: absolute;\n    text-align: center;\n    top: 5%;\n    right: 0;\n    color: rgba(39, 39, 39, 0.91);\n    height: 40px;\n    width: 50px;\n    border-radius: 5px;\n    border: thin rgba(0, 0, 0, 0.91);\n    background-color: rgba(255, 75, 51, 0.76);\n    box-shadow: -3px 5px 2px 0 rgba(0,0,0,0.35);\n    transition: .5s ease all;\n\n}\n/* Menu */\n#aggMenu {\n    background-color: #3f3f3f;\n    position: absolute;\n    top: 0;\n    right: -400px;\n    width: 400px;\n    transition: .5s ease all;\n    border-radius: 5px;\n}\n.aggMenuChoices {\n    width: 100%;\n    height: 120px;\n    background-color: #1d1d1d;\n    padding: 5px;\n    border-radius: 5px;\n}\n.aggMenuItems {\n    display: block;\n    width: 300px;\n    background-color: #3f3f3f;\n    color: white;\n    margin: 10px auto;\n    border-radius: 5px;\n    border: thin;\n}\n.aggMenuItems:hover {\n    background-color: rgba(255, 75, 51, 0.76);\n}\n/* Animations */\n.animateMenu {\n    transform: translateX(-400px);\n}\n/* Search box and results */\n#aggMenu .genSearch {\n    width: 100%;\n    height: 125px;\n    background-color: #1d1d1d;\n    position: relative;\n}\n#menuSearchInput {\n    height: 50px;\n    width: 390px;\n    display: block;\n    margin: -25px -195px 0 0;\n    position: absolute;\n    top: 50%;\n    right: 50%;\n    background-color: #3f3f3f;\n    border: thin;\n    border-radius: 5px;\n    color: white;\n    font-size: 16px;\n}\n#aggMenu .searchResults {\n    width: 100%;\n    height: 650px;\n    overflow-y: auto;\n}\n#aggMenu ul {\n    list-style: none;\n    padding: 0;\n    display: inline-block;\n}\n.resultsList li {\n    color: white;\n}\n.aggResult li:first-child {\n    font-weight: bold;\n    font-size: 18px;\n}\n.aggResult .openNow {\n    font-size: 12px;\n    color: #326ea0;\n}\n#aggMenu .aggResult {\n    margin: 10px 0;\n}\n/* Directions search box and results */\n", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/aggMenu.html';
	var html = "<div id=\"aggMenuBtn\" role=\"button\" ng-click=\"aggMenu.toggle()\" ng-class=\"{animateMenu: aggMenu.isOpen}\">\n    <i class=\"fa fa-bars fa-3x\"></i>\n</div>\n\n<div id=\"aggMenu\" ng-class=\"{animateMenu: aggMenu.isOpen}\">\n    <!-- Use ng-switch to switch between the different directives -->\n    <div ng-switch=\"aggMenu.view\">\n\n        <div ng-switch-when=\"search\">\n            <agg-menu-search></agg-menu-search>\n        </div>\n\n        <div ng-switch-when=\"directions\">\n            <agg-directions></agg-directions>\n        </div>\n\n        <div ng-switch-default>\n            <div class=\"aggMenuChoices\">\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.view = 'search'\">Search the Map</button>\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.view = 'directions'\">Get Directions</button>\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.clearMap()\">Clear the Map</button>\n            </div>\n        </div>\n    </div>\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 18 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/aggMenuSearch.html';
	var html = "<div class=\"genSearch\">\n    <i role=\"button\" class=\"fa fa-arrow-left fa-2x\" style=\"color: white;\" ng-click=\"aggMenu.view = 'default'\"></i>\n    <input id=\"menuSearchInput\" type=\"text\" placeholder=\"Search for something close by.\">\n</div>\n\n<div class=\"searchResults\">\n\n    <ul class=\"resultsList\">\n        <li class=\"aggResult\" ng-repeat=\"result in search.results\">\n            <img ng-src=\"{{result.photos[0].getUrl({'maxWidth': 120, 'maxHeight': 240})}}\">\n            <ul>\n                <li>{{result.name}}</li>\n                <li>{{}}</li>\n                <li class=\"openNow\">{{search.isOpen(result.opening_hours.open_now)}}</li>\n            </ul>\n\n        </li>\n    </ul>\n\n</div>\n\n\n\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 19 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/aggMenuDirections.html';
	var html = "<i role=\"button\" class=\"fa fa-arrow-left fa-2x\" style=\"color: white;\" ng-click=\"aggMenu.view = 'default'\"></i>\n\n<div class=\"directBtnBar\">\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'WALKING'\"><i class=\"fa fa-blind\" ></i></button>\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'DRIVING'\"><i class=\"fa fa-car\"></i></button>\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'BICYCLING'\"><i class=\"fa fa-bicycle\"></i></button>\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'TRANSIT'\"><i class=\"fa fa-bus\"></i></button>\n</div>\n\n<div class=\"directSearch\">\n    <input type=\"text\" name=\"from\" ng-model=\"direct.route.origin\" placeholder=\"Choose a starting point\">\n    <input type=\"text\" name=\"to\" ng-model=\"direct.route.destination\" placeholder=\"Destination\">\n</div>\n\n<div class=\"directResults\">\n\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ }
/******/ ]);