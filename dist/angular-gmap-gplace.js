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
	var aggGeolocation = __webpack_require__(8);
	var aggMap = __webpack_require__(12);
	var aggPlaces = __webpack_require__(13);
	var aggUtils = __webpack_require__(15);

	angular.module('angular-gmap-gplace', [
	    'aggGeolocation',
	    'aggMap',
	    'aggPlaces',
	    'aggDirections',
	    'aggUtils'
	]);




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var gStepsControlTemp = __webpack_require__(3);
	var gStepsControlCss = __webpack_require__(4);

	angular.module('aggDirections', [])

	// Directions with step by step instructions
	.directive('gSteps', function (directionsService) {
	    return {
	        restrict: 'E',
	        require: '^gMap',
	        scope: {
	            request: '='
	        },
	        templateUrl: '',
	        link: function(scope, elem, attrs, gMapCtrl) {
	            var gmap = gMapCtrl.map;

	            directionsService.getSteps(scope.request, gmap);
	        }
	    };
	})

	.directive('gStepsControl', function() {
	    return {
	        restrict: 'E',
	        require: '^gMap',
	        templateUrl: gStepsControlTemp,
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

	.service('directionsService', function(locService, $q){
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
/* 3 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/gStepsControl.html';
	var html = "<div id=\"directionsBtn\" role=\"button\" ng-click=\"direct.toggle()\" ng-class=\"{animateMenu: direct.isOpen}\">\n    <i class=\"fa fa-bars fa-3x\"></i>\n</div>\n\n<div id=\"directionsMenu\" ng-class=\"{animateMenu: direct.isOpen}\">\n\n    <div class=\"directOptions\">\n        <button class=\"directWalking\" ng-click=\"direct.route.travelMode = 'WALKING'\"></button>\n        <button class=\"directDriving\" ng-click=\"direct.route.travelMode = 'DRIVING'\"></button>\n        <button class=\"directBus\" ng-click=\"direct.route.travelMode = 'TRANSIT'\"></button>\n        <button class=\"directBicycling\" ng-click=\"direct.route.travelMode = 'BICYCLING'\"></button>\n    </div>\n\n    <div class=\"directSearch\">\n        <input type=\"text\" name=\"from\" ng-model=\"direct.route.origin\" placeholder=\"Choose a starting point\">\n        <input type=\"text\" name=\"to\" ng-model=\"direct.route.destination\" placeholder=\"Destination\">\n    </div>\n\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./gStepsControl.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./gStepsControl.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "#directionsBtn {\n    position: absolute;\n    text-align: center;\n    top: 10%;\n    right: 0;\n    color: rgba(39, 39, 39, 0.91);\n    height: 40px;\n    width: 50px;\n    border-radius: 5px;\n    border: thin rgba(0, 0, 0, 0.91);\n    background-color: rgba(255, 75, 51, 0.76);\n    box-shadow: -3px 5px 2px 0 rgba(0,0,0,0.35);\n    transition: .5s ease all;\n\n}\n#directionsMenu {\n    background-color: rgba(255, 75, 51, 0.55);\n    position: absolute;\n    top: 0;\n    right: -200px;\n    width: 200px;\n    height: 100%;\n    padding: 5px;\n    transition: .5s ease all;\n}\n.directSearch input{\n    width: 100%;\n\n}\n/* Animations */\n.animateMenu {\n    transform: translateX(-200px);\n}", ""]);

	// exports


/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var markerCss = __webpack_require__(9);
	//
	// The aggGeolocation module is home to all things geolocation related
	// Included is the gLocation directive and supporting service and factory
	//
	angular.module('aggGeolocation', [])
	//
	// Directive for showing user location
	//
	.directive('gLocation', function(markerFact, locService, locMarker) {
	    return {
	        restrict: 'E',
	        require: '^gMap',
	        link: function(scope, elem, attrs, gMapCtrl) {
	            var gmap = gMapCtrl.map;
	            var location = locService.getLoc();

	            location.then(
	                function(success){
	                    var markOptions = {
	                        position: new google.maps.LatLng(success.lat, success.lng),
	                        cursor: 'pointer',
	                        map: gmap
	                    };

	                    var marker = new locMarker(markOptions);
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
	.factory('locMarker', function() {

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
	            center.src = __webpack_require__(11);
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
	.service('locService', function($q) {
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "@keyframes aggPulsate {\n    0% {\n        transform: scale(.1);\n        opacity: 0\n    }\n    50% {\n        opacity: 1\n    }\n    to {\n        transform: scale(1.2);\n        opacity: 0\n    }\n}\n\n.locMarker {\n    position: absolute;\n    margin-top: -50px;\n    margin-left: -50px;\n    transform: rotateX(55deg)\n}\n\n.locMarker:after {\n    display: block;\n    width: 100px;\n    height: 100px;\n    content: '';\n    animation: aggPulsate 1s ease-out;\n    animation-delay: 1.1s;\n    animation-iteration-count: infinite;\n    opacity: 0;\n    border-radius: 50%;\n    box-shadow: 0 0 6px 3px #f93c11\n}\n.markerCenter {\n    position: absolute;\n    height: 15px;\n    width: 15px;\n    margin-top: -7.5px;\n    margin-left: -7.5px;\n}", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkMDhUt5aL7gAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAE4SURBVGje7drLEYMwDARQ1iXRSGpNI7QE52SGA9JaH7y6cYn1ItuDsbZNoXhVYPLvn9XyQiFkSI4oDJ2SKxpAqTmjEZSSO5pizfmjMdZkQDT2u+8/z5/jCEUjAvuPvAsnHkzwORNKhIMBPqOgJDjCwCyoE+4Cp2PZ6MFIZjaWOQa81Y3AGisNeoWjsYwxR5O3Kdrr7+hUXcbYY1ssYJnOmdU1bGBYusKj09pl5KIKC1x0OltzUoUFXhlM+uCWeU5WhQWuPK0tuei01OXEZDkpaQ13WcuescfDqd5+uY6sfzprTMrNQ9QG5v0mTdu0IirNGkOXaR4wG551XWpCe+DZF+Iu9BN4pZYHN/oOX7mphYYOOg9Q36iWakyrgg5tPcyEpzWXRsPLtA/PhpdtEGfi33A8VSgUCn9ckxdqTPOyv3QAAAAASUVORK5CYII="

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
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
	        controllerAs: 'map',
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

	            // Watcher setup to wait for the marker. Without it the map loads without the marker.
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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var gPlacesTemp = __webpack_require__(14);
	//
	// Google Places Factory and Directives
	//
	angular.module('aggPlaces', [])

	.directive('gPlaces', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            model: '=',
	            tempUrl: '@'
	        },
	        templateUrl: gPlacesTemp,
	        controller: function($scope, placesFact) {

	            $scope.getPage = function(pageNum) {
	                placesFact.getPage(pageNum).then(function(results){
	                    console.log('$scope.getPage fired', results); // This only fires if I wait about 5 seconds after previous run.
	                    $scope.details = results;
	                });
	            };
	            $scope.needsPagination = function() {
	                return placesFact.needsPagination();
	            };

	            placesFact.getPlaces($scope.model).then(function(results) {
	                $scope.details = results;
	                $scope.pageNum = placesFact.pagination.pageNum;
	                $scope.numPages = placesFact.pagination.getNumPages(placesFact.pagination.numPages);
	            });

	        }
	    };
	})

	.directive('gPlace', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            tempUrl: '@',
	            placeId: '='
	        },
	        controller: function($scope, placesFact) {
	            placesFact.getPlace($scope.placeId).then(function(results) {
	                $scope.details = results;
	            });
	        },
	        template: '<div ng-include="tempUrl"></div>'
	    };
	})

	.factory('placesFact', function ($q) {
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
/* 14 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/gPlaces.html';
	var html = " <div ng-include=\"tempUrl\"></div>\n\n<nav id=\"pagination\" aria-label=\"Page navigation\" ng-show=\"needsPagination()\">\n    <ul class=\"pagination\">\n        <li>\n            <a href=\"#\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n            </a>\n        </li>\n\n        <li ng-repeat=\"page in numPages track by $index\">\n            <a href=\"\" ng-click=\"getPage($index)\">{{$index+1}}</a>\n        </li>\n\n        <li>\n            <a href=\"#\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n            </a>\n        </li>\n    </ul>\n</nav>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	angular.module('aggUtils', [])
	//
	// The googleMapService provider is used to load google maps asynchronously
	// It is configurable with the options for language, api key, and libraries
	//
	.provider('googleMapService', function () {
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

/***/ }
/******/ ]);