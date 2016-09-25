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

	var styles = __webpack_require__(2);
	var aggDirections = __webpack_require__(7);
	var aggGeolocation = __webpack_require__(9);
	var aggMap = __webpack_require__(11);
	var aggPlaces = __webpack_require__(12);
	var aggUtils = __webpack_require__(14);
	var aggMapMenu = __webpack_require__(15);

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

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "@keyframes aggPulsate {\n  0% {\n    transform: scale(0.1);\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  to {\n    transform: scale(1.2);\n    opacity: 0; } }\n\n.locMarker {\n  position: absolute;\n  margin-top: -50px;\n  margin-left: -50px;\n  transform: rotateX(55deg); }\n\n.locMarker:after {\n  display: block;\n  width: 100px;\n  height: 100px;\n  content: '';\n  animation: aggPulsate 1s ease-out;\n  animation-delay: 1.1s;\n  animation-iteration-count: infinite;\n  opacity: 0;\n  border-radius: 50%;\n  box-shadow: 0 0 6px 3px #f93c11; }\n\n.markerCenter {\n  position: absolute;\n  height: 15px;\n  width: 15px;\n  margin-top: -7.5px;\n  margin-left: -7.5px; }\n\n/* Menu Button */\n#aggMenuBtn {\n  position: absolute;\n  text-align: center;\n  top: 5%;\n  right: 0;\n  color: rgba(39, 39, 39, 0.91);\n  width: 7%;\n  border-radius: 5px;\n  border: thin rgba(0, 0, 0, 0.91);\n  background-color: rgba(255, 75, 51, 0.76);\n  box-shadow: -3px 5px 2px 0 rgba(0, 0, 0, 0.35);\n  transition: .5s ease all; }\n\n/* Menu */\n#aggMenu {\n  background-color: #3f3f3f;\n  position: absolute;\n  top: 0;\n  right: -75%;\n  height: 100%;\n  width: 75%;\n  transition: .5s ease all;\n  border-radius: 5px;\n  font-family: 'Oswald', sans-serif;\n  /* Search box and results */ }\n  #aggMenu .aggMenuChoices {\n    height: 50%;\n    background-color: #1d1d1d;\n    padding: 2%;\n    border-radius: 5px; }\n  #aggMenu .aggMenuItems {\n    display: block;\n    width: 80%;\n    height: 25%;\n    background-color: rgba(255, 75, 51, 0.76);\n    color: white;\n    margin: 2% auto;\n    border-radius: 5px;\n    border: thin;\n    font-size: 32px; }\n    #aggMenu .aggMenuItems:hover {\n      background-color: rgba(255, 75, 51, 0.76); }\n  #aggMenu ul {\n    list-style: none;\n    padding: 0;\n    display: inline-block;\n    margin-left: 5px; }\n  #aggMenu #menuSearchInput {\n    height: 50%;\n    width: 90%;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    background-color: #3f3f3f;\n    border: thin;\n    border-radius: 5px;\n    color: white;\n    font-size: 32px;\n    transform: translate(-50%, -50%); }\n  #aggMenu .genSearch {\n    width: 100%;\n    height: 25%;\n    background-color: #1d1d1d;\n    position: relative; }\n  #aggMenu .searchResults {\n    width: 100%;\n    height: 100%;\n    overflow-y: auto; }\n  #aggMenu .resultsList {\n    width: 100%; }\n    #aggMenu .resultsList li {\n      color: white; }\n  #aggMenu .aggResult {\n    margin: 5px auto;\n    border: outset rgba(255, 75, 51, 0.76);\n    width: 90%;\n    background-color: black; }\n    #aggMenu .aggResult li:first-child {\n      font-weight: bold;\n      font-size: 16px;\n      font-family: 'Oswald', sans-serif; }\n    #aggMenu .aggResult .openNow {\n      font-size: 12px;\n      color: #72a078; }\n    #aggMenu .aggResult span.stars, #aggMenu .aggResult span.stars span {\n      display: inline-block;\n      background: url(" + __webpack_require__(5) + ") 0 -16px repeat-x;\n      width: 80px;\n      height: 16px; }\n    #aggMenu .aggResult span.stars span {\n      background-position: 0 0; }\n\n/* Animations */\n@keyframes aggSlideDownOut {\n  from {\n    transform: translate3d(0, 0, 0); }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes aggSlideDownIn {\n  from {\n    transform: translate3d(0, -100%, 0); }\n  to {\n    transform: translate3d(0, 0, 0); } }\n\n.animateMenu {\n  transform: translateX(-100%); }\n\n.animateBtn {\n  transform: translateX(-1071%); }\n\n.slide.ng-leave {\n  animation: aggSlideDownOut 2s ease-in; }\n\n.slide.ng-enter {\n  animation: aggSlideDownIn 2s ease-in; }\n\n/* Directions search box and results */\n/* Info Box */\n.infoBox {\n  background-color: #3f3f3f;\n  width: 300px;\n  border-radius: 15px; }\n\n.ibHeader {\n  width: 100%;\n  background-color: #1d1d1d;\n  font-family: 'Oswald', sans-serif;\n  color: #72a078;\n  padding: 2px;\n  border-radius: 15px 15px 0 0; }\n  .ibHeader h3, .ibHeader hr {\n    margin: 0; }\n\n.ibBody {\n  color: #72a078;\n  font-family: 'Baloo Bhaina', sans-serif;\n  font-size: 16px; }\n  .ibBody ul {\n    list-style: none; }\n", ""]);

	// exports


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aggDirectionsTemp = __webpack_require__(8);

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
/* 8 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/aggMenuDirections.html';
	var html = "<i role=\"button\" class=\"fa fa-arrow-left fa-2x\" style=\"color: white;\" ng-click=\"aggMenu.view = 'default'\"></i>\n\n<div class=\"directBtnBar\">\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'WALKING'\"><i class=\"fa fa-blind\" ></i></button>\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'DRIVING'\"><i class=\"fa fa-car\"></i></button>\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'BICYCLING'\"><i class=\"fa fa-bicycle\"></i></button>\n    <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'TRANSIT'\"><i class=\"fa fa-bus\"></i></button>\n</div>\n\n<div class=\"directSearch\">\n    <input type=\"text\" name=\"from\" ng-model=\"direct.route.origin\" placeholder=\"Choose a starting point\">\n    <input type=\"text\" name=\"to\" ng-model=\"direct.route.destination\" placeholder=\"Destination\">\n</div>\n\n<div class=\"directResults\">\n\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	//
	// The aggGeolocation module is home to all things geolocation related
	// Included is the gLocation directive and supporting service and factory
	//
	angular.module('aggGeolocation', [])
	//
	// Directive for showing user location
	//
	.directive('aggLocation', function(aggMapServ, aggLocationServ, aggLocationMarkerFact) {
	    return {
	        restrict: 'E',
	        link: function(scope, elem, attrs) {
	            var gmap = aggMapServ.maps[0];
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
	            center.src = __webpack_require__(10);
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
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkMDhUt5aL7gAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAE4SURBVGje7drLEYMwDARQ1iXRSGpNI7QE52SGA9JaH7y6cYn1ItuDsbZNoXhVYPLvn9XyQiFkSI4oDJ2SKxpAqTmjEZSSO5pizfmjMdZkQDT2u+8/z5/jCEUjAvuPvAsnHkzwORNKhIMBPqOgJDjCwCyoE+4Cp2PZ6MFIZjaWOQa81Y3AGisNeoWjsYwxR5O3Kdrr7+hUXcbYY1ssYJnOmdU1bGBYusKj09pl5KIKC1x0OltzUoUFXhlM+uCWeU5WhQWuPK0tuei01OXEZDkpaQ13WcuescfDqd5+uY6sfzprTMrNQ9QG5v0mTdu0IirNGkOXaR4wG551XWpCe+DZF+Iu9BN4pZYHN/oOX7mphYYOOg9Q36iWakyrgg5tPcyEpzWXRsPLtA/PhpdtEGfi33A8VSgUCn9ckxdqTPOyv3QAAAAASUVORK5CYII="

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	//
	// Google Map Factories, Service, and Directives
	// Directives for making the map and for making markers
	// Factories for custom infobox and making markers
	// Service for creating map
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
	            this.divId = this.options.mapId;

	            aggMapServ.make(this.options);
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
	            });

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
	            index: 0,
	            mapId: 'map-canvas',
	            zoom: 8,
	            center: {lat: -34.397, lng: 150.644}
	        };
	        var options = angular.copy(defaults, {});
	        angular.extend(options, args);
	        return options;
	    };

	    this.maps = [];

	    this.make = function(options) {
	        var index = options.index,
	            id = options.mapId,
	            instance = self.maps[index];

	        if(instance === undefined){
	            var opt = setOptions(options);
	            self.maps.push(new google.maps.Map(document.getElementById(id), opt));
	        }else{
	            console.log(instance);
	            self.maps.push(new google.maps.Map(document.getElementById(id), {
	                center: instance.center,
	                zoom: instance.zoom,
	                styles: instance.styles,
	                mapTypeId: instance.mapTypeId
	            }));
	        }
	    }
	})
	// Factory creating custom info box class.
	// Code courtesy of google-maps-utility-library-v3
	// Original code can be found at https://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/infobox/src/infobox.js?r=466
	.factory('aggInfoBoxFact', function() {
	    /**
	     * @name InfoBox
	     * @version 1.1.13 [March 19, 2014]
	     * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
	     * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
	     * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
	     *  <p>
	     *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
	     *  additional properties for advanced styling. An InfoBox can also be used as a map label.
	     *  <p>
	     *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
	     */

	    /**
	     * @name InfoBoxOptions
	     * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
	     * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
	     * @property {boolean} [disableAutoPan=false] Disable auto-pan on <tt>open</tt>.
	     * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
	     * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
	     *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
	     *  to the map pixel corresponding to <tt>position</tt>.
	     * @property {LatLng} position The geographic location at which to display the InfoBox.
	     * @property {number} zIndex The CSS z-index style value for the InfoBox.
	     *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
	     * @property {string} [boxClass="infoBox"] The name of the CSS class defining the styles for the InfoBox container.
	     * @property {Object} [boxStyle] An object literal whose properties define specific CSS
	     *  style values to be applied to the InfoBox. Style values defined here override those that may
	     *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
	     *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
	     *  are removed from the InfoBox before the new style values are applied.
	     * @property {string} closeBoxMargin The CSS margin style value for the close box.
	     *  The default is "2px" (a 2-pixel margin on all sides).
	     * @property {string} closeBoxURL The URL of the image representing the close box.
	     *  Note: The default is the URL for Google's standard close box.
	     *  Set this property to "" if no close box is required.
	     * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
	     *  map edge after an auto-pan.
	     * @property {boolean} [isHidden=false] Hide the InfoBox on <tt>open</tt>.
	     *  [Deprecated in favor of the <tt>visible</tt> property.]
	     * @property {boolean} [visible=true] Show the InfoBox on <tt>open</tt>.
	     * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
	     *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
	     * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
	     *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
	     *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
	     * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
	     *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
	     *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
	     *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
	     */

	    /**
	     * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
	     *  Call <tt>InfoBox.open</tt> to add the box to the map.
	     * @constructor
	     * @param {InfoBoxOptions} [opt_opts]
	     */
	    function InfoBox(opt_opts) {

	        opt_opts = opt_opts || {};

	        google.maps.OverlayView.apply(this, arguments);

	        // Standard options (in common with google.maps.InfoWindow):
	        //
	        this.content_ = opt_opts.content || "";
	        this.disableAutoPan_ = opt_opts.disableAutoPan || false;
	        this.maxWidth_ = opt_opts.maxWidth || 0;
	        this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
	        this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
	        this.zIndex_ = opt_opts.zIndex || null;

	        // Additional options (unique to InfoBox):
	        //
	        this.boxClass_ = opt_opts.boxClass || "infoBox";
	        this.boxStyle_ = opt_opts.boxStyle || {};
	        this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
	        this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
	        if (opt_opts.closeBoxURL === "") {
	            this.closeBoxURL_ = "";
	        }
	        this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);

	        if (typeof opt_opts.visible === "undefined") {
	            if (typeof opt_opts.isHidden === "undefined") {
	                opt_opts.visible = true;
	            } else {
	                opt_opts.visible = !opt_opts.isHidden;
	            }
	        }
	        this.isHidden_ = !opt_opts.visible;

	        this.alignBottom_ = opt_opts.alignBottom || false;
	        this.pane_ = opt_opts.pane || "floatPane";
	        this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;

	        this.div_ = null;
	        this.closeListener_ = null;
	        this.moveListener_ = null;
	        this.contextListener_ = null;
	        this.eventListeners_ = null;
	        this.fixedWidthSet_ = null;
	    }

	    /* InfoBox extends OverlayView in the Google Maps API v3.
	     */
	    InfoBox.prototype = new google.maps.OverlayView();

	    /**
	     * Creates the DIV representing the InfoBox.
	     * @private
	     */
	    InfoBox.prototype.createInfoBoxDiv_ = function () {

	        var i;
	        var events;
	        var bw;
	        var me = this;

	        // This handler prevents an event in the InfoBox from being passed on to the map.
	        //
	        var cancelHandler = function (e) {
	            e.cancelBubble = true;
	            if (e.stopPropagation) {
	                e.stopPropagation();
	            }
	        };

	        // This handler ignores the current event in the InfoBox and conditionally prevents
	        // the event from being passed on to the map. It is used for the contextmenu event.
	        //
	        var ignoreHandler = function (e) {

	            e.returnValue = false;

	            if (e.preventDefault) {

	                e.preventDefault();
	            }

	            if (!me.enableEventPropagation_) {

	                cancelHandler(e);
	            }
	        };

	        if (!this.div_) {

	            this.div_ = document.createElement("div");

	            this.setBoxStyle_();

	            if (typeof this.content_.nodeType === "undefined") {
	                this.div_.innerHTML = /* this.getCloseBoxImg_() + */ this.content_; // Removed the close button
	            } else {
	                // this.div_.innerHTML = this.getCloseBoxImg_(); Removed the close button
	                this.div_.appendChild(this.content_);
	            }

	            // Add the InfoBox DIV to the DOM
	            this.getPanes()[this.pane_].appendChild(this.div_);

	            this.addClickHandler_();

	            if (this.div_.style.width) {

	                this.fixedWidthSet_ = true;

	            } else {

	                if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {

	                    this.div_.style.width = this.maxWidth_;
	                    this.div_.style.overflow = "auto";
	                    this.fixedWidthSet_ = true;

	                } else { // The following code is needed to overcome problems with MSIE

	                    bw = this.getBoxWidths_();

	                    this.div_.style.width = (this.div_.offsetWidth - bw.left - bw.right) + "px";
	                    this.fixedWidthSet_ = false;
	                }
	            }

	            this.panBox_(this.disableAutoPan_);

	            if (!this.enableEventPropagation_) {

	                this.eventListeners_ = [];

	                // Cancel event propagation.
	                //
	                // Note: mousemove not included (to resolve Issue 152)
	                events = ["mousedown", "mouseover", "mouseout", "mouseup",
	                    "click", "dblclick", "touchstart", "touchend", "touchmove"];

	                for (i = 0; i < events.length; i++) {

	                    this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
	                }

	                // Workaround for Google bug that causes the cursor to change to a pointer
	                // when the mouse moves over a marker underneath InfoBox.
	                this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
	                    this.style.cursor = "default";
	                }));
	            }

	            this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);

	            /**
	             * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
	             * @name InfoBox#domready
	             * @event
	             */
	            google.maps.event.trigger(this, "domready");
	        }
	    };

	    /**
	     * Returns the HTML <IMG> tag for the close box.
	     * @private
	     */
	    InfoBox.prototype.getCloseBoxImg_ = function () {

	        var img = "";

	        if (this.closeBoxURL_ !== "") {

	            img  = "<img";
	            img += " src='" + this.closeBoxURL_ + "'";
	            img += " align=right"; // Do this because Opera chokes on style='float: right;'
	            img += " style='";
	            img += " position: relative;"; // Required by MSIE
	            img += " cursor: pointer;";
	            img += " margin: " + this.closeBoxMargin_ + ";";
	            img += "'>";
	        }

	        return img;
	    };

	    /**
	     * Adds the click handler to the InfoBox close box.
	     * @private
	     */
	    InfoBox.prototype.addClickHandler_ = function () {

	        var closeBox;

	        if (this.closeBoxURL_ !== "") {

	            closeBox = this.div_.firstChild;
	            this.closeListener_ = google.maps.event.addDomListener(closeBox, "click", this.getCloseClickHandler_());

	        } else {

	            this.closeListener_ = null;
	        }
	    };

	    /**
	     * Returns the function to call when the user clicks the close box of an InfoBox.
	     * @private
	     */
	    InfoBox.prototype.getCloseClickHandler_ = function () {

	        var me = this;

	        return function (e) {

	            // 1.0.3 fix: Always prevent propagation of a close box click to the map:
	            e.cancelBubble = true;

	            if (e.stopPropagation) {

	                e.stopPropagation();
	            }

	            /**
	             * This event is fired when the InfoBox's close box is clicked.
	             * @name InfoBox#closeclick
	             * @event
	             */
	            google.maps.event.trigger(me, "closeclick");

	            me.close();
	        };
	    };

	    /**
	     * Pans the map so that the InfoBox appears entirely within the map's visible area.
	     * @private
	     */
	    InfoBox.prototype.panBox_ = function (disablePan) {

	        var map;
	        var bounds;
	        var xOffset = 0, yOffset = 0;

	        if (!disablePan) {

	            map = this.getMap();

	            if (map instanceof google.maps.Map) { // Only pan if attached to map, not panorama

	                if (!map.getBounds().contains(this.position_)) {
	                    // Marker not in visible area of map, so set center
	                    // of map to the marker position first.
	                    map.setCenter(this.position_);
	                }

	                bounds = map.getBounds();

	                var mapDiv = map.getDiv();
	                var mapWidth = mapDiv.offsetWidth;
	                var mapHeight = mapDiv.offsetHeight;
	                var iwOffsetX = this.pixelOffset_.width;
	                var iwOffsetY = this.pixelOffset_.height;
	                var iwWidth = this.div_.offsetWidth;
	                var iwHeight = this.div_.offsetHeight;
	                var padX = this.infoBoxClearance_.width;
	                var padY = this.infoBoxClearance_.height;
	                var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);

	                if (pixPosition.x < (-iwOffsetX + padX)) {
	                    xOffset = pixPosition.x + iwOffsetX - padX;
	                } else if ((pixPosition.x + iwWidth + iwOffsetX + padX) > mapWidth) {
	                    xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
	                }
	                if (this.alignBottom_) {
	                    if (pixPosition.y < (-iwOffsetY + padY + iwHeight)) {
	                        yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
	                    } else if ((pixPosition.y + iwOffsetY + padY) > mapHeight) {
	                        yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
	                    }
	                } else {
	                    if (pixPosition.y < (-iwOffsetY + padY)) {
	                        yOffset = pixPosition.y + iwOffsetY - padY;
	                    } else if ((pixPosition.y + iwHeight + iwOffsetY + padY) > mapHeight) {
	                        yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
	                    }
	                }

	                if (!(xOffset === 0 && yOffset === 0)) {

	                    // Move the map to the shifted center.
	                    //
	                    var c = map.getCenter();
	                    map.panBy(xOffset, yOffset);
	                }
	            }
	        }
	    };

	    /**
	     * Sets the style of the InfoBox by setting the style sheet and applying
	     * other specific styles requested.
	     * @private
	     */
	    InfoBox.prototype.setBoxStyle_ = function () {

	        var i, boxStyle;

	        if (this.div_) {

	            // Apply style values from the style sheet defined in the boxClass parameter:
	            this.div_.className = this.boxClass_;

	            // Clear existing inline style values:
	            this.div_.style.cssText = "";

	            // Apply style values defined in the boxStyle parameter:
	            boxStyle = this.boxStyle_;
	            for (i in boxStyle) {

	                if (boxStyle.hasOwnProperty(i)) {

	                    this.div_.style[i] = boxStyle[i];
	                }
	            }

	            // Fix for iOS disappearing InfoBox problem.
	            // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
	            this.div_.style.WebkitTransform = "translateZ(0)";

	            // Fix up opacity style for benefit of MSIE:
	            //
	            if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
	                // See http://www.quirksmode.org/css/opacity.html
	                this.div_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (this.div_.style.opacity * 100) + ")\"";
	                this.div_.style.filter = "alpha(opacity=" + (this.div_.style.opacity * 100) + ")";
	            }

	            // Apply required styles:
	            //
	            this.div_.style.position = "absolute";
	            this.div_.style.visibility = 'hidden';
	            if (this.zIndex_ !== null) {

	                this.div_.style.zIndex = this.zIndex_;
	            }
	        }
	    };

	    /**
	     * Get the widths of the borders of the InfoBox.
	     * @private
	     * @return {Object} widths object (top, bottom left, right)
	     */
	    InfoBox.prototype.getBoxWidths_ = function () {

	        var computedStyle;
	        var bw = {top: 0, bottom: 0, left: 0, right: 0};
	        var box = this.div_;

	        if (document.defaultView && document.defaultView.getComputedStyle) {

	            computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");

	            if (computedStyle) {

	                // The computed styles are always in pixel units (good!)
	                bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
	                bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
	                bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
	                bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
	            }

	        } else if (document.documentElement.currentStyle) { // MSIE

	            if (box.currentStyle) {

	                // The current styles may not be in pixel units, but assume they are (bad!)
	                bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
	                bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
	                bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
	                bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
	            }
	        }

	        return bw;
	    };

	    /**
	     * Invoked when <tt>close</tt> is called. Do not call it directly.
	     */
	    InfoBox.prototype.onRemove = function () {

	        if (this.div_) {

	            this.div_.parentNode.removeChild(this.div_);
	            this.div_ = null;
	        }
	    };

	    /**
	     * Draws the InfoBox based on the current map projection and zoom level.
	     */
	    InfoBox.prototype.draw = function () {

	        this.createInfoBoxDiv_();

	        var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);

	        this.div_.style.left = (pixPosition.x + this.pixelOffset_.width) + "px";

	        if (this.alignBottom_) {
	            this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
	        } else {
	            this.div_.style.top = (pixPosition.y + this.pixelOffset_.height) + "px";
	        }

	        if (this.isHidden_) {

	            this.div_.style.visibility = "hidden";

	        } else {

	            this.div_.style.visibility = "visible";
	        }
	    };

	    /**
	     * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
	     *  <tt>closeBoxMargin</tt>, <tt>closeBoxURL</tt>, and <tt>enableEventPropagation</tt>
	     *  properties have no affect until the current InfoBox is <tt>close</tt>d and a new one
	     *  is <tt>open</tt>ed.
	     * @param {InfoBoxOptions} opt_opts
	     */
	    InfoBox.prototype.setOptions = function (opt_opts) {
	        if (typeof opt_opts.boxClass !== "undefined") { // Must be first

	            this.boxClass_ = opt_opts.boxClass;
	            this.setBoxStyle_();
	        }
	        if (typeof opt_opts.boxStyle !== "undefined") { // Must be second

	            this.boxStyle_ = opt_opts.boxStyle;
	            this.setBoxStyle_();
	        }
	        if (typeof opt_opts.content !== "undefined") {

	            this.setContent(opt_opts.content);
	        }
	        if (typeof opt_opts.disableAutoPan !== "undefined") {

	            this.disableAutoPan_ = opt_opts.disableAutoPan;
	        }
	        if (typeof opt_opts.maxWidth !== "undefined") {

	            this.maxWidth_ = opt_opts.maxWidth;
	        }
	        if (typeof opt_opts.pixelOffset !== "undefined") {

	            this.pixelOffset_ = opt_opts.pixelOffset;
	        }
	        if (typeof opt_opts.alignBottom !== "undefined") {

	            this.alignBottom_ = opt_opts.alignBottom;
	        }
	        if (typeof opt_opts.position !== "undefined") {

	            this.setPosition(opt_opts.position);
	        }
	        if (typeof opt_opts.zIndex !== "undefined") {

	            this.setZIndex(opt_opts.zIndex);
	        }
	        if (typeof opt_opts.closeBoxMargin !== "undefined") {

	            this.closeBoxMargin_ = opt_opts.closeBoxMargin;
	        }
	        if (typeof opt_opts.closeBoxURL !== "undefined") {

	            this.closeBoxURL_ = opt_opts.closeBoxURL;
	        }
	        if (typeof opt_opts.infoBoxClearance !== "undefined") {

	            this.infoBoxClearance_ = opt_opts.infoBoxClearance;
	        }
	        if (typeof opt_opts.isHidden !== "undefined") {

	            this.isHidden_ = opt_opts.isHidden;
	        }
	        if (typeof opt_opts.visible !== "undefined") {

	            this.isHidden_ = !opt_opts.visible;
	        }
	        if (typeof opt_opts.enableEventPropagation !== "undefined") {

	            this.enableEventPropagation_ = opt_opts.enableEventPropagation;
	        }

	        if (this.div_) {

	            this.draw();
	        }
	    };

	    /**
	     * Sets the content of the InfoBox.
	     *  The content can be plain text or an HTML DOM node.
	     * @param {string|Node} content
	     */
	    InfoBox.prototype.setContent = function (content) {
	        this.content_ = content;

	        if (this.div_) {

	            if (this.closeListener_) {

	                google.maps.event.removeListener(this.closeListener_);
	                this.closeListener_ = null;
	            }

	            // Odd code required to make things work with MSIE.
	            //
	            if (!this.fixedWidthSet_) {

	                this.div_.style.width = "";
	            }

	            if (typeof content.nodeType === "undefined") {
	                this.div_.innerHTML = this.getCloseBoxImg_() + content;
	            } else {
	                this.div_.innerHTML = this.getCloseBoxImg_();
	                this.div_.appendChild(content);
	            }

	            // Perverse code required to make things work with MSIE.
	            // (Ensures the close box does, in fact, float to the right.)
	            //
	            if (!this.fixedWidthSet_) {
	                this.div_.style.width = this.div_.offsetWidth + "px";
	                if (typeof content.nodeType === "undefined") {
	                    this.div_.innerHTML = this.getCloseBoxImg_() + content;
	                } else {
	                    this.div_.innerHTML = this.getCloseBoxImg_();
	                    this.div_.appendChild(content);
	                }
	            }

	            this.addClickHandler_();
	        }

	        /**
	         * This event is fired when the content of the InfoBox changes.
	         * @name InfoBox#content_changed
	         * @event
	         */
	        google.maps.event.trigger(this, "content_changed");
	    };

	    /**
	     * Sets the geographic location of the InfoBox.
	     * @param {LatLng} latlng
	     */
	    InfoBox.prototype.setPosition = function (latlng) {

	        this.position_ = latlng;

	        if (this.div_) {

	            this.draw();
	        }

	        /**
	         * This event is fired when the position of the InfoBox changes.
	         * @name InfoBox#position_changed
	         * @event
	         */
	        google.maps.event.trigger(this, "position_changed");
	    };

	    /**
	     * Sets the zIndex style for the InfoBox.
	     * @param {number} index
	     */
	    InfoBox.prototype.setZIndex = function (index) {

	        this.zIndex_ = index;

	        if (this.div_) {

	            this.div_.style.zIndex = index;
	        }

	        /**
	         * This event is fired when the zIndex of the InfoBox changes.
	         * @name InfoBox#zindex_changed
	         * @event
	         */
	        google.maps.event.trigger(this, "zindex_changed");
	    };

	    /**
	     * Sets the visibility of the InfoBox.
	     * @param {boolean} isVisible
	     */
	    InfoBox.prototype.setVisible = function (isVisible) {

	        this.isHidden_ = !isVisible;
	        if (this.div_) {
	            this.div_.style.visibility = (this.isHidden_ ? "hidden" : "visible");
	        }
	    };

	    /**
	     * Returns the content of the InfoBox.
	     * @returns {string}
	     */
	    InfoBox.prototype.getContent = function () {

	        return this.content_;
	    };

	    /**
	     * Returns the geographic location of the InfoBox.
	     * @returns {LatLng}
	     */
	    InfoBox.prototype.getPosition = function () {

	        return this.position_;
	    };

	    /**
	     * Returns the zIndex for the InfoBox.
	     * @returns {number}
	     */
	    InfoBox.prototype.getZIndex = function () {

	        return this.zIndex_;
	    };

	    /**
	     * Returns a flag indicating whether the InfoBox is visible.
	     * @returns {boolean}
	     */
	    InfoBox.prototype.getVisible = function () {

	        var isVisible;

	        if ((typeof this.getMap() === "undefined") || (this.getMap() === null)) {
	            isVisible = false;
	        } else {
	            isVisible = !this.isHidden_;
	        }
	        return isVisible;
	    };

	    /**
	     * Shows the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
	     */
	    InfoBox.prototype.show = function () {

	        this.isHidden_ = false;
	        if (this.div_) {
	            this.div_.style.visibility = "visible";
	        }
	    };

	    /**
	     * Hides the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
	     */
	    InfoBox.prototype.hide = function () {

	        this.isHidden_ = true;
	        if (this.div_) {
	            this.div_.style.visibility = "hidden";
	        }
	    };

	    /**
	     * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
	     *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
	     *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
	     *  anchor is dragged to a new location, the InfoBox moves as well.
	     * @param {Map|StreetViewPanorama} map
	     * @param {MVCObject} [anchor]
	     */
	    InfoBox.prototype.open = function (map, anchor) {

	        var me = this;

	        if (anchor) {

	            this.position_ = anchor.getPosition();
	            this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function () {
	                me.setPosition(this.getPosition());
	            });
	        }

	        this.setMap(map);

	        if (this.div_) {

	            this.panBox_();
	        }
	    };

	    /**
	     * Removes the InfoBox from the map.
	     */
	    InfoBox.prototype.close = function () {

	        var i;

	        if (this.closeListener_) {

	            google.maps.event.removeListener(this.closeListener_);
	            this.closeListener_ = null;
	        }

	        if (this.eventListeners_) {

	            for (i = 0; i < this.eventListeners_.length; i++) {

	                google.maps.event.removeListener(this.eventListeners_[i]);
	            }
	            this.eventListeners_ = null;
	        }

	        if (this.moveListener_) {

	            google.maps.event.removeListener(this.moveListener_);
	            this.moveListener_ = null;
	        }

	        if (this.contextListener_) {

	            google.maps.event.removeListener(this.contextListener_);
	            this.contextListener_ = null;
	        }

	        this.setMap(null);
	    };
	    return InfoBox;
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var gPlacesTemp = __webpack_require__(13);

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
/* 13 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/gPlaces.html';
	var html = "<div ng-include=\"agg.tempUrl\"></div>\n\n<nav id=\"pagination\" aria-label=\"Page navigation\" ng-show=\"agg.needsPagination()\">\n    <ul class=\"pagination\">\n        <li>\n            <a href=\"#\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n            </a>\n        </li>\n\n        <li ng-repeat=\"page in agg.numPages track by $index\">\n            <a href=\"\" ng-click=\"agg.getPage($index)\">{{$index+1}}</a>\n        </li>\n\n        <li>\n            <a href=\"#\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n            </a>\n        </li>\n    </ul>\n</nav>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 14 */
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
	    function loadScript($document) {
	        var scripts = {
	            fontLoader: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js',
	            gMaps: 'https://maps.googleapis.com/maps/api/js?key='+ apiKey + '&libraries=' + libraries + '&callback=mapReady&language=' + language
	        };
	        for(var script in scripts) {
	            var scriptTag = $document.createElement('script');
	            scriptTag.src = scripts[script];
	            $document.getElementsByTagName('body')[0].appendChild(scriptTag);
	        }
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	var aggMenuView = __webpack_require__(16);
	var aggMenuSearchTemp = __webpack_require__(17);

	angular.module('aggMapMenu', [])

	.directive('aggMenu', function(aggMenuFact, aggMapServ) {
	    return {
	        restrict: 'E',
	        templateUrl: aggMenuView,
	        controllerAs: 'aggMenu',
	        bindToController: true,
	        controller: function() {

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
	        link: function() {
	            WebFont.load({
	                google: {
	                    families: ['Baloo Bhaina', 'Oswald']
	                }
	            })
	        }
	    }
	})

	.directive('aggMenuSearch', function() {
	    return {
	        restrict: 'E',
	        templateUrl: aggMenuSearchTemp,
	        controllerAs: 'search',
	        bindToController: true,
	        controller: function(aggMenuFact, aggMapServ) {
	            var self = this,
	                markers = aggMenuFact.menuObj.searchMarkers,
	                map = aggMapServ.maps[0];

	            // Create the SearchBox
	            var input = document.getElementById('menuSearchInput'),
	                searchBox = new google.maps.places.SearchBox(input);

	            // Bias the SearchBox results towards current map's viewport.
	            // Change the SearchBox bounds on map bounds change
	            searchBox.setBounds(map.getBounds());
	            map.addListener('bounds_changed', function() {
	                searchBox.setBounds(map.getBounds());
	            });

	            // Add listener to handle search results
	            searchBox.addListener('places_changed', function() {
	                aggMenuFact.handleSearch(searchBox, map).then(function(){
	                    self.results = aggMenuFact.menuObj.searchResults;
	                });
	            });

	            // Check if business is open
	            this.isOpen = function(open) {
	                var answer = '';
	                if(open) {
	                    answer =  'Open Now';
	                }else{
	                    answer = 'Closed Now';
	                }
	                return answer;
	            };

	            // Opens associated marker when clicking on results in list and animates marker
	            this.openMarker = function(id) {
	                google.maps.event.trigger(aggMenuFact.menuObj.searchMarkers[id], 'click');
	            };

	            // Calculate Star Rating
	            this.getStars = function(rating) {
	                // Get the value
	                var val = parseFloat(rating);
	                // Turn value into number/100
	                var size = val/5*100;
	                return size + '%';
	            };
	        }
	    }
	})
	.factory('aggMenuFact', function($q, aggPlacesFact, aggInfoBoxFact) {
	    var menu = {};

	    menu.menuObj = {
	        searchMarkers: [],
	        searchResults: []
	    };

	    menu.handleSearch = function(box, map) {
	        var places = box.getPlaces(),
	            bounds = new google.maps.LatLngBounds(),
	            deferred = $q.defer();
	        console.log(box);

	        // Alert if no results
	        if (places.length == 0){
	            alert('No places found');
	        }

	        // Activate more button and attach click handler


	        // Clear out the old markers and search results
	        menu.menuObj.searchResults = [];
	        menu.menuObj.searchMarkers.forEach(function(marker) {
	            marker.setMap(null);
	        });
	        menu.menuObj.searchMarkers = [];

	        // Create Info Box and map click handler for closing info box
	        var infoBox = new aggInfoBoxFact();
	        google.maps.event.addListener(map, 'click', function () {
	            infoBox.close();
	        });

	        // For each place, create an icon, marker, and info box
	        // Push the markers and results to arrays for viewing
	        places.forEach(function(place) {
	            if (!place.geometry) {
	                console.log("Returned place contains no geometry");
	                return;
	            }
	            var icon = {
	                url: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
	                size: new google.maps.Size(80, 80),
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(17, 34),
	                scaledSize: new google.maps.Size(25, 25)
	            };

	            // Create a marker for each place.
	            var marker = new google.maps.Marker({
	                map: map,
	                icon: icon,
	                title: place.name,
	                placeId: place.place_id,
	                position: place.geometry.location
	            });

	            // Create info box and click handler for marker
	            marker.addListener('click', function(){
	                // Animate Marker
	                if (marker.getAnimation() !== null) {
	                    marker.setAnimation(null);
	                } else {
	                    marker.setAnimation(google.maps.Animation.BOUNCE);
	                }
	                // Lookup place details for place associated with marker then fill info box with details
	                aggPlacesFact.getPlace(place.place_id)
	                    .then(function(results) {
	                        // Info Box Content
	                        var content = '<div class="ibHeader">' +
	                                         '<h3>' + results.name + '</h3>' +
	                                      '</div>' +
	                                      '<div class="ibBody">' +
	                                         '<img src="' + results.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 300}) + '" width="100%" height="auto">' +
	                                         '<ul>' +
	                                             '<li>' + results.formatted_phone_number + '</li>' +
	                                             '<li>' + results.vicinity + '</li>' +
	                                             '<li>' + results.rating + '</li>' +
	                                         '</ul>' +
	                                      '</div> ';
	                        // Set content of InfoBox
	                        infoBox.setContent(content);
	                        // Open Info Box on marker click
	                        infoBox.open(map, marker);
	                })
	            });

	            // Set bounds to include all results
	            if (place.geometry.viewport) {
	                // Only geocodes have viewport.
	                bounds.union(place.geometry.viewport);
	            } else {
	                bounds.extend(place.geometry.location);
	            }

	            // Push markers and search results to arrays.
	            // The directives will watch these arrays and update the DOM as necessary
	            menu.menuObj.searchMarkers.push(marker);
	            menu.menuObj.searchResults.push(place);

	            deferred.resolve(menu.menuObj);
	        });
	        map.fitBounds(bounds);
	        return deferred.promise;
	    };

	    menu.search = function(search, type) {
	        var map = aggMapServ.maps[0],
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
/* 16 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/aggMenu.html';
	var html = "<div id=\"aggMenuBtn\" role=\"button\" ng-click=\"aggMenu.toggle()\" ng-class=\"{animateBtn: aggMenu.isOpen}\">\n    <i class=\"fa fa-4x\" ng-class=\"aggMenu.isOpen ? 'fa-chevron-right' : 'fa-bars'\"></i>\n</div>\n\n<div id=\"aggMenu\" ng-class=\"{animateMenu: aggMenu.isOpen}\">\n    <!-- Use ng-switch to switch between the different directives -->\n    <div ng-switch=\"aggMenu.view\" style=\"height: 100%;\">\n\n        <div ng-switch-when=\"search\" class=\"slide\" style=\"height: 100%;\">\n            <agg-menu-search></agg-menu-search>\n        </div>\n\n        <div ng-switch-when=\"directions\" class=\"slide\">\n            <agg-directions></agg-directions>\n        </div>\n\n        <div ng-switch-default class=\"slide\" style=\"height: 100%;\">\n            <div class=\"aggMenuChoices\">\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.view = 'search'\">Search the Map</button>\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.view = 'directions'\">Get Directions</button>\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.clearMap()\">Clear the Map</button>\n            </div>\n        </div>\n    </div>\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/angular-gmap-gplaces/master/src/templates/aggMenuSearch.html';
	var html = "<div class=\"genSearch\">\n    <i role=\"button\" class=\"fa fa-arrow-left fa-4x\" style=\"color: white;\" ng-click=\"aggMenu.view = 'default'\"></i>\n    <input id=\"menuSearchInput\" type=\"text\" placeholder=\"Search for something close by.\">\n</div>\n\n<div class=\"searchResults\">\n\n    <ul class=\"resultsList\">\n        <li class=\"aggResult\" ng-repeat=\"result in search.results track by $index\" ng-click=\"search.openMarker($index)\" role=\"button\">\n\n            <img ng-src=\"{{result.photos[0].getUrl({'maxWidth': 120, 'maxHeight': 240})}}\">\n            <ul>\n                <li>{{result.name}}</li>\n                <li>\n                    <span class=\"stars\">\n                        <span ng-style=\"{'width':search.getStars(result.rating)}\"></span>\n                    </span>\n                </li>\n                <li class=\"openNow\">{{search.isOpen(result.opening_hours.open_now)}}</li>\n            </ul>\n\n        </li>\n    </ul>\n\n</div>\n\n\n\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ }
/******/ ]);