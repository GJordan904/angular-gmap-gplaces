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

	(function(){'use strict';

	var animate = __webpack_require__(18);
	var sanitize = __webpack_require__(19);
	var styles = __webpack_require__(2);
	var aggDirections = __webpack_require__(7);
	var aggGeolocation = __webpack_require__(9);
	var aggMap = __webpack_require__(11);
	var aggPlaces = __webpack_require__(12);
	var aggUtils = __webpack_require__(14);
	var aggMapMenu = __webpack_require__(15);

	angular.module('angular-gmap-gplace', [
	    'ngAnimate',
	    'ngSanitize',
	    'aggGeolocation',
	    'aggMap',
	    'aggPlaces',
	    'aggDirections',
	    'aggUtils',
	    'aggMapMenu'
	]);

	}());




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
	exports.push([module.id, "@keyframes aggPulsate {\n  0% {\n    transform: scale(0.1);\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  to {\n    transform: scale(1.2);\n    opacity: 0; } }\n\n.locMarker {\n  position: absolute;\n  margin-top: -50px;\n  margin-left: -50px;\n  transform: rotateX(55deg); }\n\n.locMarker:after {\n  display: block;\n  width: 100px;\n  height: 100px;\n  content: '';\n  animation: aggPulsate 1s ease-out;\n  animation-delay: 1.1s;\n  animation-iteration-count: infinite;\n  opacity: 0;\n  border-radius: 50%;\n  box-shadow: 0 0 6px 3px #f93c11; }\n\n.markerCenter {\n  position: absolute;\n  height: 15px;\n  width: 15px;\n  margin-top: -7.5px;\n  margin-left: -7.5px; }\n\n/* Menu Button */\n#aggMenuBtn {\n  position: absolute;\n  text-align: center;\n  top: 5%;\n  right: 0;\n  color: rgba(39, 39, 39, 0.91);\n  width: 7%;\n  border-radius: 5px;\n  border: thin rgba(0, 0, 0, 0.91);\n  background-color: rgba(255, 75, 51, 0.76);\n  box-shadow: -3px 5px 2px 0 rgba(0, 0, 0, 0.35);\n  transition: .5s ease all; }\n\n/* Menu */\n#aggMenu {\n  background-color: #3f3f3f;\n  position: absolute;\n  top: 0;\n  right: -75%;\n  height: 100%;\n  width: 75%;\n  transition: .5s ease all;\n  border-radius: 5px;\n  font-family: 'Oswald', sans-serif;\n  overflow-x: hidden;\n  /* Search box and results */ }\n  #aggMenu .aggMenuChoices {\n    height: 50%;\n    background-color: #1d1d1d;\n    padding: 2%;\n    border-radius: 5px; }\n  #aggMenu .aggMenuItems {\n    display: block;\n    width: 80%;\n    height: 25%;\n    background-color: rgba(255, 75, 51, 0.76);\n    color: white;\n    margin: 2% auto;\n    border-radius: 5px;\n    border: thin;\n    font-size: 32px; }\n    #aggMenu .aggMenuItems:hover {\n      background-color: rgba(255, 75, 51, 0.76); }\n  #aggMenu ul {\n    list-style: none;\n    padding: 0;\n    display: inline-block;\n    margin-left: 5px; }\n  #aggMenu #menuSearchInput {\n    height: 50%;\n    width: 90%;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    background-color: #3f3f3f;\n    border: thin;\n    border-radius: 5px;\n    color: white;\n    font-size: 32px;\n    transform: translate(-50%, -50%); }\n  #aggMenu .genSearch {\n    width: 100%;\n    height: 25%;\n    background-color: #1d1d1d;\n    position: relative; }\n  #aggMenu .searchResults {\n    width: 100%;\n    height: 100%;\n    overflow-y: auto; }\n  #aggMenu .resultsList {\n    width: 100%; }\n    #aggMenu .resultsList li {\n      color: white; }\n  #aggMenu .aggResult {\n    margin: 5px auto;\n    border: outset rgba(255, 75, 51, 0.76);\n    width: 90%;\n    background-color: black; }\n    #aggMenu .aggResult li:first-child {\n      font-weight: bold;\n      font-size: 16px;\n      font-family: 'Oswald', sans-serif; }\n    #aggMenu .aggResult .openNow {\n      font-size: 12px;\n      color: #72a078; }\n    #aggMenu .aggResult span.stars, #aggMenu .aggResult span.stars span {\n      display: inline-block;\n      background: url(" + __webpack_require__(5) + ") 0 -16px repeat-x;\n      width: 80px;\n      height: 16px; }\n    #aggMenu .aggResult span.stars span {\n      background-position: 0 0; }\n\n/* Animations */\n@keyframes aggSlideOutLeft {\n  from {\n    transform: translateX(0); }\n  to {\n    transform: translateX(-100%); } }\n\n@keyframes aggSlideInRight {\n  from {\n    transform: translateX(100%); }\n  to {\n    transform: translateX(0); } }\n\n.animateMenu {\n  transform: translateX(-100%); }\n\n.animateBtn {\n  transform: translateX(-1071%); }\n\n.slide.ng-leave {\n  animation: aggSlideOutLeft 1s ease-in; }\n\n.slide.ng-enter {\n  animation: aggSlideInRight 1s ease-in; }\n\n.slide.ng-enter-active {\n  transform: translateX(100%); }\n\n.slide.ng-leave-active {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0; }\n\n/* Directions search box and results */\n/* Info Box */\n.infoBox {\n  background-color: #3f3f3f;\n  width: 300px;\n  border-radius: 15px; }\n\n.ibHeader {\n  width: 100%;\n  background-color: #1d1d1d;\n  font-family: 'Oswald', sans-serif;\n  color: #72a078;\n  padding: 2px;\n  border-radius: 15px 15px 0 0; }\n  .ibHeader h3, .ibHeader hr {\n    margin: 0; }\n\n.ibBody {\n  color: #72a078;\n  font-family: 'Baloo Bhaina', sans-serif;\n  font-size: 16px; }\n  .ibBody ul {\n    list-style: none; }\n\n.directControls {\n  background-color: #f93c11;\n  height: 150px;\n  width: 100%; }\n\n.directBtnBar {\n  height: 25%; }\n\n.directSearch {\n  height: 75%; }\n  .directSearch input {\n    display: block;\n    width: 75%;\n    height: 40%;\n    margin: auto;\n    background-color: #f93c11;\n    color: #1d1d1d;\n    border-top: none;\n    border-left: none;\n    border-right: none;\n    border-bottom: 1px solid #1d1d1d; }\n    .directSearch input:focus {\n      color: #1d1d1d;\n      outline: none; }\n    .directSearch input::-webkit-input-placeholder {\n      color: #1d1d1d; }\n    .directSearch input::-moz-placeholder {\n      color: #1d1d1d; }\n    .directSearch input:-ms-input-placeholder {\n      color: #1d1d1d; }\n    .directSearch input:-moz-placeholder {\n      color: #1d1d1d; }\n", ""]);

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

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABJRJREFUeNqEVFtoXEUY/uacOdmz7ta9JjXpNqttrSQmbbxQDFgt9EHFy0MpfRELBbUPYlHwQXwv+CIFX1QQwebJmiqoFKmashCTvrQItUmh3UTabNM0dZPm7Oyec+afGR92tzm5gD8Mc+Y/839z+b75GGMM7XhmEPjyJKJxtNWfjiaPfwJcumIAAOy3kSbAyI/AiWNYH6da/YfRZK0GfPM9sLcvAgAAyQTA+YNhbzz52FcA0KjNHgdwEwCIgJpYBeNrkAWQSDS/GcNwausLBcDAuz87bEwTQIi1W7TW79n3m6sQYX92675CtmtfgQj7iZr/1scGAKUARSh2uIU+bpk0t3S6w93WpwhFpTYCcGNwbn1SEvBwfqjHF/8AxmBLdqDn/lLlC2wS7PyIXQDwcaZrcPiJp97p49yKq7AKGA1Zn2uu4nYBRoPZMYSBaJSnfphe/ndmEsCn7PyI3T7KYZu7b+/oO9SXzRcLfqOChqzBDxsgkuB8C4L79+YWKxentZJfAxgFoO23DlkAYABcNZouVO9eKcZSXUWPbsZD5UEzH7AllGxU75THzxmjPwAw2apZpVEIAynNnJTG2+bfYfHkWr5qdcUWF5XnOGzOcRgSiaZ+eKWy5mo7bNsaymXCFNAAYzHAKBhDcDMspRQbCkPTAZhweblFo1It6pptIJVO5GK8ZqlQhxN/XL86MXbjqgoboesE1sMpN6cUBqI19isvAlo3mzF4rffRLS/VRRCMX7g17Xnh50LQxMyNlYLr2jHOLb6w4F9XGpfbNfarB1b3bwzeFYI6Z8sr40qZ9xnDBQB/EZmxyq16QQiVDgOtAPwSFVI0nq158hSA04whejkzxuBYzZNHAby3Rkhnz55FbeEMagvf4aH0EHr3fBb9P9zqJ9uJk2MfYaz6Nwa2DuDI44ebAADAOUcymVyv1COt/kw0+Wd5Ak/m+tc+ZyKClBJ81RCyiUTikaZGRBZAtT2vXbzBD4QQSLQMgTG2M5fLZQBgZWVlpzGm2p7zP37gg4hARLs6OzsznZ2dGSLaRUTwNzGETfxAgYhyrut227Ydt207HovFuokopzYxBG6MObE+SURIp9OpRqMBYwwymUxqeXn5zU39YHR0NAPg5Xw+v2NwcLCbc+5IKR8cBwBisRiMMbAsC2EYymvXrs1Xq9UZAL+y0dFRAGAAnuacP7979+7ufD6faTQaCIIAQRCAiMA5hxBiaX5+fl4pNQ7gMgDTZsEAuEREM1NTU2/09/fv1VonTEumnHMQkZibm5sG8BOApQ00CiEgpVySUvq+77M2ne0IgoAtLi76juMsOY7zgG5eqVTWXKpt29uz2Wy8pYXWIzNwHCeulNoehiEHQMstQ7CUUoi0nnQ6nXAchxERlUql26VS6baUkjo6OlgqlUoopXqiNfbBgwehtYbWGsaYPcVisb9er6tSqTTved6YEKJcLpczrus6nHNrYWHhrtb6ZruGm8h7Nsb0zs7O1mu12i0AP1uWda91/uuTk5OvJ5PJ7Vrr3vVCio6Lnuf9DuAiY0xH8veMMd96nvccgAPRgv8GAKLGfJfzmGrKAAAAAElFTkSuQmCC"

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
	/**
	 * @desc Takes in an origin, destination, and travel mode; outputs directions.
	 * Requires the aggMap directive to render directions
	 * @attrs none
	 */
	.directive('aggDirections', function(aggDirectionsServ, aggMapServ) {

	    function processAutoComp(origin, destination, mode) {
	        console.log('processing request');
	        return {
	            origin: new google.maps.LatLng(origin.geometry.location.lat(), origin.geometry.location.lng()),
	            destination: new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()),
	            travelMode: mode
	        }
	    }

	    return {
	        restrict: 'E',
	        templateUrl: aggDirectionsTemp,
	        scope: {
	            options: '=options'
	        },
	        controllerAs: 'direct',
	        bindToController: true,
	        controller: function(){
	            this.request = {
	                origin: {},
	                destination: {},
	                travelMode: 'DRIVING'
	            };
	            this.showDirect = false;
	            this.startLoc = '';
	            this.endLoc = '';
	            this.via = '';
	            this.distance = '';
	            this.duration = '';
	            this.steps = [];
	        },
	        link: function(scope, elem, attrs, ctrl) {
	            var mapId;
	            var setOptions = scope.$watch('direct.options', function(value){
	               mapId = value.mapId;
	               scope.inMenu = value.inMenu;
	                if(value.hasOwnProperty('goBack')) {
	                    scope.goBack = value.goBack;
	                }
	                setOptions();
	            });

	            scope.$watch('direct.request', function(newVal, oldVal) {
	                if(newVal.origin.hasOwnProperty('geometry') && newVal.destination.hasOwnProperty('geometry')) {
	                    var req = processAutoComp(newVal.origin, newVal.destination, newVal.travelMode);

	                    aggDirectionsServ.getSteps(req, aggMapServ.maps[mapId])
	                        .then(function(response) {
	                            var leg = response.routes[0].legs[0];

	                            ctrl.via = response.routes[0].summary;
	                            ctrl.distance = leg.distance.text;
	                            ctrl.duration = leg.duration.text;
	                            for(var i=0; i<leg.steps.length; i++) {
	                                ctrl.steps.push(leg.steps[i])
	                            }
	                            ctrl.showDirect = true;
	                            console.log(response);
	                        });
	                }

	            }, true)
	        }
	    }
	})
	/**
	 * @desc Turns an input box into a google place autocomplete box
	 * @attrs takes the model to be updated with place details as an attribute
	 */
	.directive('aggAutoComplete', function () {
	    return {
	        restrict: 'A',
	        scope: {
	            model: '=aggAutoComplete'
	        },
	        link: function (scope, elem, attrs) {
	           var input = document.getElementById(elem.attr('id'));
	           var autocomplete = new google.maps.places.Autocomplete(input, {});
	            autocomplete.addListener('place_changed', updateModel);

	            function updateModel() {
	                scope.model = autocomplete.getPlace();
	                scope.$apply();
	            }
	        }
	    }
	})

	.service('aggDirectionsServ', function($q){
	    var self = this;

	    function getDirections(request) {
	        var service = new google.maps.DirectionsService();
	        var q = $q.defer();

	        service.route(request, callback);

	        function callback(response, status) {
	            if(status === 'OK') {
	                q.resolve(response);
	            }else{
	                console.log("getDirections failed");
	            }
	        }
	        return q.promise;
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

	    this.renderer = new google.maps.DirectionsRenderer();

	    this.getSteps = function(request, map) {
	        var q = $q.defer(),
	            self = this;

	        this.renderer.setMap(map);
	        getDirections(request).then(function(response){
	            self.renderer.setDirections(response);
	            buildSteps(response, map);
	            q.resolve(response);
	        });
	        return q.promise;
	    };

	    this.getDirections = function(request, map) {
	        var q = $q.defer(),
	            self = this;

	        this.renderer.setMap(map);

	        getDirections(request).then(function(response) {
	            self.renderer.setDirections(response);
	            q.resolve(response);
	        });
	        return q.promise;
	    };
	});



/***/ },
/* 8 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/Libraries/angular-gmap-gplaces/master/src/templates/aggMenuDirections.html';
	var html = "<i ng-if=\"inMenu\" role=\"button\" class=\"fa fa-arrow-left fa-2x\" style=\"color: white;\" ng-click=\"goBack()\"></i>\n\n<div class=\"directControls\">\n    <div class=\"directBtnBar\">\n        <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'WALKING'\"><i class=\"fa fa-blind\" ></i></button>\n        <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'DRIVING'\"><i class=\"fa fa-car\"></i></button>\n        <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'BICYCLING'\"><i class=\"fa fa-bicycle\"></i></button>\n        <button class=\"searchType\" ng-click=\"direct.route.travelMode = 'TRANSIT'\"><i class=\"fa fa-bus\"></i></button>\n    </div>\n\n    <div class=\"directSearch\">\n        <input id=\"from\" agg-auto-complete=\"direct.request.origin\" type=\"text\" name=\"from\" placeholder=\"Choose a starting point\">\n        <input id=\"destination\" agg-auto-complete=\"direct.request.destination\" type=\"text\" name=\"to\" placeholder=\"Destination\">\n    </div>\n</div>\n\n<div class=\"directResults\" ng-if=\"direct.showDirect\">\n    <div class=\"overview\">\n        <div class=\"duration\">\n            {{direct.duration}}\n        </div>\n        <div class=\"distance\">\n            {{direct.distance}}\n        </div>\n        <div class=\"via\">\n           via {{direct.via}}\n        </div>\n    </div>\n    <hr>\n    <div class=\"route\">\n        <div class=\"start\">\n            {{direct.startLoc}}\n        </div>\n        <div class=\"steps\">\n            <div class=\"step\" ng-repeat=\"step in direct.steps\">\n                <div class=\"instruction\">\n                    <p ng-bind-html=\"step.instructions\"></p>\n                </div>\n                <div class=\"duration\">\n                    {{step.duration.text}}\n                </div>\n                <div class=\"distance\">\n                    {{step.distance.text}}\n                </div>\n            </div>\n        </div>\n        <div class=\"end\">\n            {{direct.endLoc}}\n        </div>\n    </div>\n</div>";
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
	            center: {lat: 0, lng: 0}
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
	            $scope.$watch('self.model', function(newVal, oldVal) {
	                if(newVal !== undefined) {
	                    aggPlacesFact.getPlaces(self.model).then(function (results) {
	                        self.details = results;
	                        self.pageNum = aggPlacesFact.pagination.pageNum;
	                        self.numPages = aggPlacesFact.pagination.getNumPages(aggPlacesFact.pagination.numPages);
	                    });
	                }
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

	var path = '/home/grant/Development/Projects/Libraries/angular-gmap-gplaces/master/src/templates/gPlaces.html';
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

	.directive('aggMenu', function(aggMenuFact, aggDirectionsServ) {
	    return {
	        restrict: 'E',
	        templateUrl: aggMenuView,
	        scope: {
	            mapId: '@mapId'
	        },
	        controllerAs: 'aggMenu',
	        bindToController: true,
	        controller: function($scope) {
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
	                aggDirectionsServ.markers.forEach(function(marker) {
	                    marker.setMap(null);
	                });
	                aggDirectionsServ.renderer.setMap(null);
	            }
	        },
	        link: function(scope, elem, attrs, ctrl) {
	            // Direction Options
	            attrs.$observe('mapId', function(value) {
	                ctrl.directOpt = {
	                    inMenu: true,
	                    mapId: value,
	                    goBack: function () {
	                        ctrl.view = 'default';
	                    }
	                };
	            });
	            WebFont.load({
	                google: {
	                    families: ['Baloo Bhaina', 'Oswald']
	                }
	            })
	        }
	    }
	})

	.directive('aggMenuSearch', function(aggMenuFact, aggMapServ) {
	    return {
	        restrict: 'E',
	        templateUrl: aggMenuSearchTemp,
	        controllerAs: 'search',
	        require: ['^aggMenu', 'aggMenuSearch'],
	        scope: {
	            mapId: '@mapId'
	        },
	        bindToController: true,
	        controller: function() {
	            var self = this,
	                markers = aggMenuFact.menuObj.searchMarkers;

	            this.results = [];

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

	            // Calculate Star Rating
	            this.getStars = function(rating) {
	                // Get the value
	                var val = parseFloat(rating);
	                // Turn value into number/100
	                var size = val/5*100;
	                return size + '%';
	            };
	        },
	        link: function(scope, elem, attrs, ctrls) {
	            // Create the SearchBox
	            var input = document.getElementById('menuSearchInput'),
	                searchBox = new google.maps.places.SearchBox(input),
	                map = aggMapServ.maps[parseInt(attrs.mapId)];

	            // Bias the SearchBox results towards current map's viewport.
	            // Change the SearchBox bounds on map bounds change
	            searchBox.setBounds(map.getBounds());
	            map.addListener('bounds_changed', function() {
	                searchBox.setBounds(map.getBounds());
	            });

	            // Add listener to handle search results
	            searchBox.addListener('places_changed', function() {
	                aggMenuFact.handleSearch(searchBox, map).then(function(){
	                    ctrls[1].results = aggMenuFact.menuObj.searchResults;
	                });
	            });

	            // Opens associated marker when clicking on results in list and animates marker
	            ctrls[1].openMarker = function(id) {
	                google.maps.event.trigger(aggMenuFact.menuObj.searchMarkers[id], 'click');
	                ctrls[0].toggle();
	            };

	            ctrls[1].goBack = function () {
	                ctrls[0].view = 'default'
	            }
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

	        // For each place, create an icon, marker, and info box
	        // Push the markers and results to arrays for viewing
	        places.forEach(function(place) {
	            if (!place.geometry) {
	                console.log("Returned place contains no geometry");
	                return;
	            }
	            var icon = {
	                url: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(17, 34)
	            };

	            // Create a marker for each place.
	            var marker = new google.maps.Marker({
	                map: map,
	                icon: icon,
	                title: place.name,
	                placeId: place.place_id,
	                position: place.geometry.location
	            });

	            // Add listener to map for closing infobox and stopping marker animation
	            google.maps.event.addListener(map, 'click', function () {
	                if(marker.getAnimation() !== null) marker.setAnimation(null);
	                infoBox.close();
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
	                                         '<img src="' + results.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}) + '" width="100%" height="auto">' +
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

	var path = '/home/grant/Development/Projects/Libraries/angular-gmap-gplaces/master/src/templates/aggMenu.html';
	var html = "<div id=\"aggMenuBtn\" role=\"button\" ng-click=\"aggMenu.toggle()\" ng-class=\"{animateBtn: aggMenu.isOpen}\">\n    <i class=\"fa fa-4x\" ng-class=\"aggMenu.isOpen ? 'fa-chevron-right' : 'fa-bars'\"></i>\n</div>\n\n<div id=\"aggMenu\" ng-class=\"{animateMenu: aggMenu.isOpen}\">\n    <!-- Use ng-switch to switch between the different directives -->\n    <div ng-switch=\"aggMenu.view\" style=\"height: 100%;\">\n\n        <div ng-switch-when=\"search\" class=\"slide\" style=\"height: 100%;\">\n            <agg-menu-search map-id=\"0\"></agg-menu-search>\n        </div>\n\n        <div ng-switch-when=\"directions\" class=\"slide\">\n            <agg-directions options=\"aggMenu.directOpt\"></agg-directions>\n        </div>\n\n        <div ng-switch-default class=\"slide\" style=\"height: 100%;\">\n            <div class=\"aggMenuChoices\">\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.view = 'search'\">Search the Map</button>\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.view = 'directions'\">Get Directions</button>\n                <button class=\"aggMenuItems\" ng-click=\"aggMenu.clearMap()\">Clear the Map</button>\n            </div>\n        </div>\n    </div>\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var path = '/home/grant/Development/Projects/Libraries/angular-gmap-gplaces/master/src/templates/aggMenuSearch.html';
	var html = "<div class=\"genSearch\">\n    <i role=\"button\" class=\"fa fa-arrow-left fa-4x\" style=\"color: white;\" ng-click=\"search.goBack()\"></i>\n    <input id=\"menuSearchInput\" type=\"text\" placeholder=\"Search for something close by.\">\n</div>\n\n<div class=\"searchResults\">\n\n    <ul class=\"resultsList\">\n        <li class=\"aggResult\" ng-repeat=\"result in search.results track by $index\" ng-click=\"search.openMarker($index)\" role=\"button\">\n\n            <img ng-src=\"{{result.photos[0].getUrl({'maxWidth': 120, 'maxHeight': 240})}}\">\n            <ul>\n                <li>{{result.name}}</li>\n                <li>\n                    <span class=\"stars\">\n                        <span ng-style=\"{'width':search.getStars(result.rating)}\"></span>\n                    </span>\n                </li>\n                <li class=\"openNow\">{{search.isOpen(result.opening_hours.open_now)}}</li>\n            </ul>\n\n        </li>\n    </ul>\n\n</div>\n\n\n\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
	 AngularJS v1.6.0
	 (c) 2010-2016 Google, Inc. http://angularjs.org
	 License: MIT
	*/
	(function(U,C){'use strict';function Ea(a,b,c){if(!a)throw Oa("areq",b||"?",c||"required");return a}function Fa(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;X(a)&&(a=a.join(" "));X(b)&&(b=b.join(" "));return a+" "+b}function Pa(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function Y(a,b,c){var d="";a=X(a)?a:a&&G(a)&&a.length?a.split(/\s+/):[];r(a,function(a,e){a&&0<a.length&&(d+=0<e?" ":"",d+=c?b+a:a+b)});return d}function Qa(a){if(a instanceof w)switch(a.length){case 0:return a;
	case 1:if(1===a[0].nodeType)return a;break;default:return w(ua(a))}if(1===a.nodeType)return w(a)}function ua(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1===c.nodeType)return c}}function Ra(a,b,c){r(b,function(b){a.addClass(b,c)})}function Sa(a,b,c){r(b,function(b){a.removeClass(b,c)})}function Z(a){return function(b,c){c.addClass&&(Ra(a,b,c.addClass),c.addClass=null);c.removeClass&&(Sa(a,b,c.removeClass),c.removeClass=null)}}function oa(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
	N;a.domOperation=function(){a.$$domOperationFired=!0;b();b=N};a.$$prepared=!0}return a}function ha(a,b){Ga(a,b);Ha(a,b)}function Ga(a,b){b.from&&(a.css(b.from),b.from=null)}function Ha(a,b){b.to&&(a.css(b.to),b.to=null)}function V(a,b,c){var d=b.options||{};c=c.options||{};var f=(d.addClass||"")+" "+(c.addClass||""),e=(d.removeClass||"")+" "+(c.removeClass||"");a=Ta(a.attr("class"),f,e);c.preparationClasses&&(d.preparationClasses=ea(c.preparationClasses,d.preparationClasses),delete c.preparationClasses);
	f=d.domOperation!==N?d.domOperation:null;va(d,c);f&&(d.domOperation=f);d.addClass=a.addClass?a.addClass:null;d.removeClass=a.removeClass?a.removeClass:null;b.addClass=d.addClass;b.removeClass=d.removeClass;return d}function Ta(a,b,c){function d(a){G(a)&&(a=a.split(" "));var b={};r(a,function(a){a.length&&(b[a]=!0)});return b}var f={};a=d(a);b=d(b);r(b,function(a,b){f[b]=1});c=d(c);r(c,function(a,b){f[b]=1===f[b]?null:-1});var e={addClass:"",removeClass:""};r(f,function(b,c){var d,f;1===b?(d="addClass",
	f=!a[c]||a[c+"-remove"]):-1===b&&(d="removeClass",f=a[c]||a[c+"-add"]);f&&(e[d].length&&(e[d]+=" "),e[d]+=c)});return e}function z(a){return a instanceof w?a[0]:a}function Ua(a,b,c){var d="";b&&(d=Y(b,"ng-",!0));c.addClass&&(d=ea(d,Y(c.addClass,"-add")));c.removeClass&&(d=ea(d,Y(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function pa(a,b){var c=b?"-"+b+"s":"";ka(a,[la,c]);return[la,c]}function wa(a,b){var c=b?"paused":"",d=$+"PlayState";ka(a,[d,c]);return[d,c]}function ka(a,
	b){a.style[b[0]]=b[1]}function ea(a,b){return a?b?a+" "+b:a:b}function Ia(a,b,c){var d=Object.create(null),f=a.getComputedStyle(b)||{};r(c,function(a,b){var c=f[a];if(c){var y=c.charAt(0);if("-"===y||"+"===y||0<=y)c=Va(c);0===c&&(c=null);d[b]=c}});return d}function Va(a){var b=0;a=a.split(/\s*,\s*/);r(a,function(a){"s"===a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function xa(a){return 0===a||null!=a}function Ja(a,b){var c=R,d=a+"s";b?c+="Duration":
	d+=" linear all";return[c,d]}function Ka(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function La(a,b,c){r(c,function(c){a[c]=ya(a[c])?a[c]:b.style.getPropertyValue(c)})}var R,za,$,Aa;void 0===U.ontransitionend&&void 0!==U.onwebkittransitionend?(R="WebkitTransition",za="webkitTransitionEnd transitionend"):(R="transition",za=
	"transitionend");void 0===U.onanimationend&&void 0!==U.onwebkitanimationend?($="WebkitAnimation",Aa="webkitAnimationEnd animationend"):($="animation",Aa="animationend");var qa=$+"Delay",Ba=$+"Duration",la=R+"Delay",Ma=R+"Duration",Oa=C.$$minErr("ng"),Wa={transitionDuration:Ma,transitionDelay:la,transitionProperty:R+"Property",animationDuration:Ba,animationDelay:qa,animationIterationCount:$+"IterationCount"},Xa={transitionDuration:Ma,transitionDelay:la,animationDuration:Ba,animationDelay:qa},Ca,va,
	r,X,ya,aa,Da,ra,G,K,w,N;C.module("ngAnimate",[],function(){N=C.noop;Ca=C.copy;va=C.extend;w=C.element;r=C.forEach;X=C.isArray;G=C.isString;ra=C.isObject;K=C.isUndefined;ya=C.isDefined;Da=C.isFunction;aa=C.isElement}).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,f,e,m){var A,y;b.$watchCollection(f.ngAnimateSwap||f["for"],function(f){A&&a.leave(A);y&&(y.$destroy(),y=null);if(f||0===f)y=b.$new(),m(y,
	function(b){A=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",["$interpolate",function(a){return{link:function(b,c,d){function f(a){c.data("$$ngAnimateChildren","on"===a||"true"===a)}var e=d.ngAnimateChildren;G(e)&&0===e.length?c.data("$$ngAnimateChildren",!0):(f(a(e)(b)),d.$observe("ngAnimateChildren",f))}}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),m=0;m<b.length;m++)b[m]();f||a(function(){f||c()})}}var d,
	f;d=b.queue=[];b.waitUntilQuiet=function(b){f&&f();f=a(function(){f=null;b();c()})};return b}]).provider("$$animateQueue",["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);r(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return e[a].some(function(a){return a(b,c,d)})}function f(a,b){var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?
	c&&d:c||d}var e=this.rules={skip:[],cancel:[],join:[]};e.join.push(function(a,b,c){return!b.structural&&f(b)});e.skip.push(function(a,b,c){return!b.structural&&!f(b)});e.skip.push(function(a,b,c){return"leave"===c.event&&b.structural});e.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});e.cancel.push(function(a,b,c){return c.structural&&b.structural});e.cancel.push(function(a,b,c){return 2===c.state&&b.structural});e.cancel.push(function(a,b,d){if(d.structural)return!1;a=
	b.addClass;b=b.removeClass;var f=d.addClass;d=d.removeClass;return K(a)&&K(b)||K(f)&&K(d)?!1:c(a,d)||c(b,f)});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow","$$isDocumentHidden",function(b,c,y,e,ba,Ya,O,v,H,S,P){function I(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function B(a,b,c){var g=z(b),d=z(a),E=[];(a=t[c])&&r(a,function(a){J.call(a.node,g)?E.push(a.callback):
	"leave"===c&&J.call(a.node,d)&&E.push(a.callback)});return E}function n(a,b,c){var g=ua(b);return a.filter(function(a){return!(a.node===g&&(!c||a.callback===c))})}function p(a,h,u){function p(c,g,d,h){y(function(){var c=B(S,a,g);c.length?b(function(){r(c,function(b){b(a,d,h)});"close"!==d||a[0].parentNode||sa.off(a)}):"close"!==d||a[0].parentNode||sa.off(a)});c.progress(g,d,h)}function n(b){var c=a,g=k;g.preparationClasses&&(c.removeClass(g.preparationClasses),g.preparationClasses=null);g.activeClasses&&
	(c.removeClass(g.activeClasses),g.activeClasses=null);Na(a,k);ha(a,k);k.domOperation();e.complete(!b)}var k=Ca(u),t,S;if(a=Qa(a))t=z(a),S=a.parent();var k=oa(k),e=new O,y=I();X(k.addClass)&&(k.addClass=k.addClass.join(" "));k.addClass&&!G(k.addClass)&&(k.addClass=null);X(k.removeClass)&&(k.removeClass=k.removeClass.join(" "));k.removeClass&&!G(k.removeClass)&&(k.removeClass=null);k.from&&!ra(k.from)&&(k.from=null);k.to&&!ra(k.to)&&(k.to=null);if(!t)return n(),e;u=[t.getAttribute("class"),k.addClass,
	k.removeClass].join(" ");if(!F(u))return n(),e;var s=0<=["enter","move","leave"].indexOf(h),x=P(),v=!ma||x||g.get(t);u=!v&&E.get(t)||{};var J=!!u.state;v||J&&1===u.state||(v=!L(a,S,h));if(v)return x&&p(e,h,"start"),n(),x&&p(e,h,"close"),e;s&&ta(a);x={structural:s,element:a,event:h,addClass:k.addClass,removeClass:k.removeClass,close:n,options:k,runner:e};if(J){if(d("skip",a,x,u)){if(2===u.state)return n(),e;V(a,u,x);return u.runner}if(d("cancel",a,x,u))if(2===u.state)u.runner.end();else if(u.structural)u.close();
	else return V(a,u,x),u.runner;else if(d("join",a,x,u))if(2===u.state)V(a,x,{});else return Ua(a,s?h:null,k),h=x.event=u.event,k=V(a,u,x),u.runner}else V(a,x,{});(J=x.structural)||(J="animate"===x.event&&0<Object.keys(x.options.to||{}).length||f(x));if(!J)return n(),l(a),e;var H=(u.counter||0)+1;x.counter=H;Q(a,1,x);c.$$postDigest(function(){var b=E.get(t),c=!b,b=b||{},g=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||f(b));if(c||b.counter!==H||!g){c&&(Na(a,k),ha(a,k));if(c||s&&b.event!==
	h)k.domOperation(),e.end();g||l(a)}else h=!b.structural&&f(b,!0)?"setClass":b.event,Q(a,2),b=Ya(a,h,b.options),e.setHost(b),p(e,h,"start",{}),b.done(function(b){n(!b);(b=E.get(t))&&b.counter===H&&l(z(a));p(e,h,"close",{})})});return e}function ta(a){a=z(a).querySelectorAll("[data-ng-animate]");r(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate"),10),c=E.get(a);if(c)switch(b){case 2:c.runner.end();case 1:E.remove(a)}})}function l(a){a=z(a);a.removeAttribute("data-ng-animate");E.remove(a)}
	function k(a,b){return z(a)===z(b)}function L(a,b,c){c=w(e[0].body);var d=k(a,c)||"HTML"===a[0].nodeName,h=k(a,y),f=!1,B,p=g.get(z(a));(a=w.data(a[0],"$ngAnimatePin"))&&(b=a);for(b=z(b);b;){h||(h=k(b,y));if(1!==b.nodeType)break;a=E.get(b)||{};if(!f){var n=g.get(b);if(!0===n&&!1!==p){p=!0;break}else!1===n&&(p=!1);f=a.structural}if(K(B)||!0===B)a=w.data(b,"$$ngAnimateChildren"),ya(a)&&(B=a);if(f&&!1===B)break;d||(d=k(b,c));if(d&&h)break;if(!h&&(a=w.data(b,"$ngAnimatePin"))){b=z(a);continue}b=b.parentNode}return(!f||
	B)&&!0!==p&&h&&d}function Q(a,b,c){c=c||{};c.state=b;a=z(a);a.setAttribute("data-ng-animate",b);c=(b=E.get(a))?va(b,c):c;E.put(a,c)}var E=new ba,g=new ba,ma=null,h=c.$watch(function(){return 0===v.totalPendingRequests},function(a){a&&(h(),c.$$postDigest(function(){c.$$postDigest(function(){null===ma&&(ma=!0)})}))}),t=Object.create(null),x=a.classNameFilter(),F=x?function(a){return x.test(a)}:function(){return!0},Na=Z(H),J=U.Node.prototype.contains||function(a){return this===a||!!(this.compareDocumentPosition(a)&
	16)},sa={on:function(a,b,c){var g=ua(b);t[a]=t[a]||[];t[a].push({node:g,callback:c});w(b).on("$destroy",function(){E.get(g)||sa.off(a,b,c)})},off:function(a,b,c){if(1!==arguments.length||G(arguments[0])){var g=t[a];g&&(t[a]=1===arguments.length?null:n(g,b,c))}else for(g in b=arguments[0],t)t[g]=n(t[g],b)},pin:function(a,b){Ea(aa(a),"element","not an element");Ea(aa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,g){c=c||{};c.domOperation=g;return p(a,b,c)},enabled:function(a,
	b){var c=arguments.length;if(0===c)b=!!ma;else if(aa(a)){var d=z(a);1===c?b=!g.get(d):g.put(d,!b)}else b=ma=!!a;return b}};return sa}]}]).provider("$$animation",["$animateProvider",function(a){var b=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,d,f,e,m,A){function y(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,n=d.parentNode;f.put(d,a);for(var p;n;){if(p=f.get(n)){p.processed||(p=b(p));break}n=n.parentNode}(p||
	c).children.push(a);return a}var c={children:[]},d,f=new m;for(d=0;d<a.length;d++){var e=a[d];f.put(e.domNode,a[d]={domNode:e.domNode,fn:e.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var f=0,e=[];for(d=0;d<c.length;d++){var k=c[d];0>=a&&(a=f,f=0,b.push(e),e=[]);e.push(k.fn);k.children.forEach(function(a){f++;c.push(a)});a--}e.length&&b.push(e);return b}(c)}var s=[],ba=Z(a);return function(m,O,v){function H(a){a=
	a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];r(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function S(a){var b=[],c={};r(a,function(a,d){var h=z(a.element),k=0<=["enter","move"].indexOf(a.event),h=a.structural?H(h):[];if(h.length){var f=k?"to":"from";r(h,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][f]={animationID:d,element:w(a)}})}else b.push(a)});var d={},k={};r(c,function(c,f){var e=c.from,
	B=c.to;if(e&&B){var p=a[e.animationID],n=a[B.animationID],l=e.animationID.toString();if(!k[l]){var m=k[l]={structural:!0,beforeStart:function(){p.beforeStart();n.beforeStart()},close:function(){p.close();n.close()},classes:P(p.classes,n.classes),from:p,to:n,anchors:[]};m.classes.length?b.push(m):(b.push(p),b.push(n))}k[l].anchors.push({out:e.element,"in":B.element})}else e=e?e.animationID:B.animationID,B=e.toString(),d[B]||(d[B]=!0,b.push(a[e]))});return b}function P(a,b){a=a.split(" ");b=b.split(" ");
	for(var c=[],d=0;d<a.length;d++){var k=a[d];if("ng-"!==k.substring(0,3))for(var f=0;f<b.length;f++)if(k===b[f]){c.push(k);break}}return c.join(" ")}function I(a){for(var c=b.length-1;0<=c;c--){var d=f.get(b[c])(a);if(d)return d}}function B(a,b){function c(a){(a=a.data("$$animationRunner"))&&a.setHost(b)}a.from&&a.to?(c(a.from.element),c(a.to.element)):c(a.element)}function n(){var a=m.data("$$animationRunner");!a||"leave"===O&&v.$$domOperationFired||a.end()}function p(b){m.off("$destroy",n);m.removeData("$$animationRunner");
	ba(m,v);ha(m,v);v.domOperation();L&&a.removeClass(m,L);m.removeClass("ng-animate");l.complete(!b)}v=oa(v);var ta=0<=["enter","move","leave"].indexOf(O),l=new e({end:function(){p()},cancel:function(){p(!0)}});if(!b.length)return p(),l;m.data("$$animationRunner",l);var k=Fa(m.attr("class"),Fa(v.addClass,v.removeClass)),L=v.tempClasses;L&&(k+=" "+L,v.tempClasses=null);var Q;ta&&(Q="ng-"+O+"-prepare",a.addClass(m,Q));s.push({element:m,classes:k,event:O,structural:ta,options:v,beforeStart:function(){m.addClass("ng-animate");
	L&&a.addClass(m,L);Q&&(a.removeClass(m,Q),Q=null)},close:p});m.on("$destroy",n);if(1<s.length)return l;d.$$postDigest(function(){var a=[];r(s,function(b){b.element.data("$$animationRunner")?a.push(b):b.close()});s.length=0;var b=S(a),c=[];r(b,function(a){c.push({domNode:z(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var b,c=a.close;if((a.anchors?a.from.element||a.to.element:a.element).data("$$animationRunner")){var d=I(a);d&&(b=d.start)}b?(b=b(),b.done(function(a){c(!a)}),B(a,b)):
	c()}})});A(y(c))});return l}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Ka(),c=Ka();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,f,e,m,A,y,s,ba){function C(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++P))+"-"+a.getAttribute("class")+"-"+b}function O(e,n,p,m){var l;0<b.count(p)&&(l=c.get(p),l||(n=Y(n,"-stagger"),f.addClass(e,n),l=Ia(a,e,m),l.animationDuration=
	Math.max(l.animationDuration,0),l.transitionDuration=Math.max(l.transitionDuration,0),f.removeClass(e,n),c.put(p,l)));return l||{}}function v(a){I.push(a);s.waitUntilQuiet(function(){b.flush();c.flush();for(var a=A(),d=0;d<I.length;d++)I[d](a);I.length=0})}function H(c,f,e){f=b.get(e);f||(f=Ia(a,c,Wa),"infinite"===f.animationIterationCount&&(f.animationIterationCount=1));b.put(e,f);c=f;e=c.animationDelay;f=c.transitionDelay;c.maxDelay=e&&f?Math.max(e,f):e||f;c.maxDuration=Math.max(c.animationDuration*
	c.animationIterationCount,c.transitionDuration);return c}var S=Z(f),P=0,I=[];return function(a,c){function d(){l()}function s(){l(!0)}function l(b){if(!(A||P&&J)){A=!0;J=!1;g.$$skipPreparationClasses||f.removeClass(a,ga);f.removeClass(a,ea);wa(h,!1);pa(h,!1);r(t,function(a){h.style[a[0]]=""});S(a,g);ha(a,g);Object.keys(I).length&&r(I,function(a,b){a?h.style.setProperty(b,a):h.style.removeProperty(b)});if(g.onDone)g.onDone();fa&&fa.length&&a.off(fa.join(" "),Q);var c=a.data("$$animateCss");c&&(m.cancel(c[0].timer),
	a.removeData("$$animateCss"));w&&w.complete(!b)}}function k(a){q.blockTransition&&pa(h,a);q.blockKeyframeAnimation&&wa(h,!!a)}function L(){w=new e({end:d,cancel:s});v(N);l();return{$$willAnimate:!1,start:function(){return w},end:d}}function Q(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-V,0)>=K&&b>=M&&(P=!0,l())}function E(){function b(){if(!A){k(!1);r(t,function(a){h.style[a[0]]=a[1]});S(a,g);f.addClass(a,ea);if(q.recalculateTimingStyles){na=
	h.getAttribute("class")+" "+ga;ja=C(h,na);D=H(h,na,ja);ca=D.maxDelay;u=Math.max(ca,0);M=D.maxDuration;if(0===M){l();return}q.hasTransitions=0<D.transitionDuration;q.hasAnimations=0<D.animationDuration}q.applyAnimationDelay&&(ca="boolean"!==typeof g.delay&&xa(g.delay)?parseFloat(g.delay):ca,u=Math.max(ca,0),D.animationDelay=ca,da=[qa,ca+"s"],t.push(da),h.style[da[0]]=da[1]);K=1E3*u;U=1E3*M;if(g.easing){var d,e=g.easing;q.hasTransitions&&(d=R+"TimingFunction",t.push([d,e]),h.style[d]=e);q.hasAnimations&&
	(d=$+"TimingFunction",t.push([d,e]),h.style[d]=e)}D.transitionDuration&&fa.push(za);D.animationDuration&&fa.push(Aa);V=Date.now();var E=K+1.5*U;d=V+E;var e=a.data("$$animateCss")||[],n=!0;if(e.length){var p=e[0];(n=d>p.expectedEndTime)?m.cancel(p.timer):e.push(l)}n&&(E=m(c,E,!1),e[0]={timer:E,expectedEndTime:d},e.push(l),a.data("$$animateCss",e));if(fa.length)a.on(fa.join(" "),Q);g.to&&(g.cleanupStyles&&La(I,h,Object.keys(g.to)),Ha(a,g))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=
	1;d<b.length;d++)b[d]();a.removeData("$$animateCss")}}if(!A)if(h.parentNode){var d=function(a){if(P)J&&a&&(J=!1,l());else if(J=!a,D.animationDuration)if(a=wa(h,J),J)t.push(a);else{var b=t,c=b.indexOf(a);0<=a&&b.splice(c,1)}},e=0<aa&&(D.transitionDuration&&0===W.transitionDuration||D.animationDuration&&0===W.animationDuration)&&Math.max(W.animationDelay,W.transitionDelay);e?m(b,Math.floor(e*aa*1E3),!1):b();G.resume=function(){d(!0)};G.pause=function(){d(!1)}}else l()}var g=c||{};g.$$prepared||(g=oa(Ca(g)));
	var I={},h=z(a);if(!h||!h.parentNode||!ba.enabled())return L();var t=[],x=a.attr("class"),F=Pa(g),A,J,P,w,G,u,K,M,U,V,fa=[];if(0===g.duration||!y.animations&&!y.transitions)return L();var ia=g.event&&X(g.event)?g.event.join(" "):g.event,Z="",T="";ia&&g.structural?Z=Y(ia,"ng-",!0):ia&&(Z=ia);g.addClass&&(T+=Y(g.addClass,"-add"));g.removeClass&&(T.length&&(T+=" "),T+=Y(g.removeClass,"-remove"));g.applyClassesEarly&&T.length&&S(a,g);var ga=[Z,T].join(" ").trim(),na=x+" "+ga,ea=Y(ga,"-active"),x=F.to&&
	0<Object.keys(F.to).length;if(!(0<(g.keyframeStyle||"").length||x||ga))return L();var ja,W;0<g.stagger?(F=parseFloat(g.stagger),W={transitionDelay:F,animationDelay:F,transitionDuration:0,animationDuration:0}):(ja=C(h,na),W=O(h,ga,ja,Xa));g.$$skipPreparationClasses||f.addClass(a,ga);g.transitionStyle&&(F=[R,g.transitionStyle],ka(h,F),t.push(F));0<=g.duration&&(F=0<h.style[R].length,F=Ja(g.duration,F),ka(h,F),t.push(F));g.keyframeStyle&&(F=[$,g.keyframeStyle],ka(h,F),t.push(F));var aa=W?0<=g.staggerIndex?
	g.staggerIndex:b.count(ja):0;(ia=0===aa)&&!g.skipBlocking&&pa(h,9999);var D=H(h,na,ja),ca=D.maxDelay;u=Math.max(ca,0);M=D.maxDuration;var q={};q.hasTransitions=0<D.transitionDuration;q.hasAnimations=0<D.animationDuration;q.hasTransitionAll=q.hasTransitions&&"all"===D.transitionProperty;q.applyTransitionDuration=x&&(q.hasTransitions&&!q.hasTransitionAll||q.hasAnimations&&!q.hasTransitions);q.applyAnimationDuration=g.duration&&q.hasAnimations;q.applyTransitionDelay=xa(g.delay)&&(q.applyTransitionDuration||
	q.hasTransitions);q.applyAnimationDelay=xa(g.delay)&&q.hasAnimations;q.recalculateTimingStyles=0<T.length;if(q.applyTransitionDuration||q.applyAnimationDuration)M=g.duration?parseFloat(g.duration):M,q.applyTransitionDuration&&(q.hasTransitions=!0,D.transitionDuration=M,F=0<h.style[R+"Property"].length,t.push(Ja(M,F))),q.applyAnimationDuration&&(q.hasAnimations=!0,D.animationDuration=M,t.push([Ba,M+"s"]));if(0===M&&!q.recalculateTimingStyles)return L();if(null!=g.delay){var da;"boolean"!==typeof g.delay&&
	(da=parseFloat(g.delay),u=Math.max(da,0));q.applyTransitionDelay&&t.push([la,da+"s"]);q.applyAnimationDelay&&t.push([qa,da+"s"])}null==g.duration&&0<D.transitionDuration&&(q.recalculateTimingStyles=q.recalculateTimingStyles||ia);K=1E3*u;U=1E3*M;g.skipBlocking||(q.blockTransition=0<D.transitionDuration,q.blockKeyframeAnimation=0<D.animationDuration&&0<W.animationDelay&&0===W.animationDuration);g.from&&(g.cleanupStyles&&La(I,h,Object.keys(g.from)),Ga(a,g));q.blockTransition||q.blockKeyframeAnimation?
	k(M):g.skipBlocking||pa(h,!1);return{$$willAnimate:!0,end:d,start:function(){if(!A)return G={end:d,cancel:s,resume:null,pause:null},w=new e(G),v(E),w}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,f,e,m,A){function y(a){return a.replace(/\bng-\S+\b/g,"")}function s(a,b){G(a)&&(a=a.split(" "));G(b)&&(b=b.split(" "));return a.filter(function(a){return-1===
	b.indexOf(a)}).join(" ")}function ba(c,e,f){function m(a){var b={},c=z(a).getBoundingClientRect();r(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=v.scrollTop;break;case "left":d+=v.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function n(){var c=y(f.attr("class")||""),d=s(c,l),c=s(l,c),d=a(A,{to:m(f),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function p(){A.remove();e.removeClass("ng-animate-shim");f.removeClass("ng-animate-shim")}
	var A=w(z(e).cloneNode(!0)),l=y(A.attr("class")||"");e.addClass("ng-animate-shim");f.addClass("ng-animate-shim");A.addClass("ng-anchor");H.append(A);var k;c=function(){var c=a(A,{addClass:"ng-anchor-out",delay:!0,from:m(e)});return c.$$willAnimate?c:null}();if(!c&&(k=n(),!k))return p();var L=c||k;return{start:function(){function a(){c&&c.end()}var b,c=L.start();c.done(function(){c=null;if(!k&&(k=n()))return c=k.start(),c.done(function(){c=null;p();b.complete()}),c;p();b.complete()});return b=new d({end:a,
	cancel:a})}}}function C(a,b,c,e){var f=O(a,N),m=O(b,N),y=[];r(e,function(a){(a=ba(c,a.out,a["in"]))&&y.push(a)});if(f||m||0!==y.length)return{start:function(){function a(){r(b,function(a){a.end()})}var b=[];f&&b.push(f.start());m&&b.push(m.start());r(y,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function O(c){var d=c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=
	e.domOperation));e.preparationClasses&&(e.event=ea(e.event,e.preparationClasses));c=a(d,e);return c.$$willAnimate?c:null}if(!e.animations&&!e.transitions)return N;var v=A[0].body;c=z(f);var H=w(c.parentNode&&11===c.parentNode.nodeType||v.contains(c)?c:v);return function(a){return a.from&&a.to?C(a.from,a.to,a.classes,a.anchors):O(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function f(c){c=X(c)?c:c.split(" ");for(var d=
	[],e={},f=0;f<c.length;f++){var r=c[f],w=a.$$registeredAnimations[r];w&&!e[r]&&(d.push(b.get(w)),e[r]=!0)}return d}var e=Z(d);return function(a,b,d,s){function w(){s.domOperation();e(a,s)}function C(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,G,P,f];break;case "addClass":b=[b,G,f];break;case "removeClass":b=[b,P,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,b))if(Da(a.start)&&(a=a.start()),a instanceof c)a.done(f);else if(Da(a))return a;return N}function z(a,
	b,d,e,f){var l=[];r(e,function(e){var m=e[f];m&&l.push(function(){var e,f,g=!1,h=function(a){g||(g=!0,(f||N)(a),e.complete(!a))};e=new c({end:function(){h()},cancel:function(){h(!0)}});f=C(m,a,b,d,function(a){h(!1===a)});return e})});return l}function v(a,b,d,e,f){var l=z(a,b,d,e,f);if(0===l.length){var h,m;"beforeSetClass"===f?(h=z(a,"removeClass",d,e,"beforeRemoveClass"),m=z(a,"addClass",d,e,"beforeAddClass")):"setClass"===f&&(h=z(a,"removeClass",d,e,"removeClass"),m=z(a,"addClass",d,e,"addClass"));
	h&&(l=l.concat(h));m&&(l=l.concat(m))}if(0!==l.length)return function(a){var b=[];l.length&&r(l,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){r(b,function(b){a?b.cancel():b.end()})}}}var H=!1;3===arguments.length&&ra(d)&&(s=d,d=null);s=oa(s);d||(d=a.attr("class")||"",s.addClass&&(d+=" "+s.addClass),s.removeClass&&(d+=" "+s.removeClass));var G=s.addClass,P=s.removeClass,I=f(d),B,n;if(I.length){var p,K;"leave"===b?(K="leave",p="afterLeave"):(K="before"+b.charAt(0).toUpperCase()+
	b.substr(1),p=b);"enter"!==b&&"move"!==b&&(B=v(a,b,s,I,K));n=v(a,b,s,I,p)}if(B||n){var l;return{$$willAnimate:!0,end:function(){l?l.end():(H=!0,w(),ha(a,s),l=new c,l.complete(!0));return l},start:function(){function b(c){H=!0;w();ha(a,s);l.complete(c)}if(l)return l;l=new c;var d,e=[];B&&e.push(function(a){d=B(a)});e.length?e.push(function(a){w();a(!0)}):w();n&&e.push(function(a){d=n(a)});l.setHost({end:function(){H||((d||N)(void 0),b(void 0))},cancel:function(){H||((d||N)(!0),b(!0))}});c.chain(e,
	b);return l}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),m=d(a.to);if(b||m)return{start:function(){function a(){return function(){r(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());m&&d.push(m.start());c.all(d,function(a){f.complete(a)});var f=new c({end:a(),cancel:a()});
	return f}}}else return d(a)}}]}])})(window,window.angular);
	//# sourceMappingURL=angular-animate.min.js.map


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
	 AngularJS v1.6.0
	 (c) 2010-2016 Google, Inc. http://angularjs.org
	 License: MIT
	*/
	(function(s,g){'use strict';function H(g){var l=[];t(l,A).chars(g);return l.join("")}var B=g.$$minErr("$sanitize"),C,l,D,E,q,A,F,t;g.module("ngSanitize",[]).provider("$sanitize",function(){function k(a,e){var b={},c=a.split(","),h;for(h=0;h<c.length;h++)b[e?q(c[h]):c[h]]=!0;return b}function I(a){for(var e={},b=0,c=a.length;b<c;b++){var h=a[b];e[h.name]=h.value}return e}function G(a){return a.replace(/&/g,"&amp;").replace(J,function(a){var b=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(b-55296)+
	(a-56320)+65536)+";"}).replace(K,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function x(a){for(;a;){if(a.nodeType===s.Node.ELEMENT_NODE)for(var e=a.attributes,b=0,c=e.length;b<c;b++){var h=e[b],d=h.name.toLowerCase();if("xmlns:ns1"===d||0===d.lastIndexOf("ns1:",0))a.removeAttributeNode(h),b--,c--}(e=a.firstChild)&&x(e);a=a.nextSibling}}var u=!1;this.$get=["$$sanitizeUri",function(a){u&&l(v,w);return function(e){var b=[];F(e,t(b,function(b,h){return!/^unsafe:/.test(a(b,
	h))}));return b.join("")}}];this.enableSvg=function(a){return E(a)?(u=a,this):u};C=g.bind;l=g.extend;D=g.forEach;E=g.isDefined;q=g.lowercase;A=g.noop;F=function(a,e){null===a||void 0===a?a="":"string"!==typeof a&&(a=""+a);f.innerHTML=a;var b=5;do{if(0===b)throw B("uinput");b--;s.document.documentMode&&x(f);a=f.innerHTML;f.innerHTML=a}while(a!==f.innerHTML);for(b=f.firstChild;b;){switch(b.nodeType){case 1:e.start(b.nodeName.toLowerCase(),I(b.attributes));break;case 3:e.chars(b.textContent)}var c;if(!(c=
	b.firstChild)&&(1===b.nodeType&&e.end(b.nodeName.toLowerCase()),c=b.nextSibling,!c))for(;null==c;){b=b.parentNode;if(b===f)break;c=b.nextSibling;1===b.nodeType&&e.end(b.nodeName.toLowerCase())}b=c}for(;b=f.firstChild;)f.removeChild(b)};t=function(a,e){var b=!1,c=C(a,a.push);return{start:function(a,d){a=q(a);!b&&z[a]&&(b=a);b||!0!==v[a]||(c("<"),c(a),D(d,function(b,d){var f=q(d),g="img"===a&&"src"===f||"background"===f;!0!==m[f]||!0===n[f]&&!e(b,g)||(c(" "),c(d),c('="'),c(G(b)),c('"'))}),c(">"))},
	end:function(a){a=q(a);b||!0!==v[a]||!0===y[a]||(c("</"),c(a),c(">"));a==b&&(b=!1)},chars:function(a){b||c(G(a))}}};var J=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,K=/([^#-~ |!])/g,y=k("area,br,col,hr,img,wbr"),d=k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),r=k("rp,rt"),p=l({},r,d),d=l({},d,k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),r=l({},r,k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
	w=k("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),z=k("script,style"),v=l({},y,d,r,p),n=k("background,cite,href,longdesc,src,xlink:href"),p=k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
	r=k("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
	!0),m=l({},n,r,p),f;(function(a){if(a.document&&a.document.implementation)a=a.document.implementation.createHTMLDocument("inert");else throw B("noinert");var e=(a.documentElement||a.getDocumentElement()).getElementsByTagName("body");1===e.length?f=e[0]:(e=a.createElement("html"),f=a.createElement("body"),e.appendChild(f),a.appendChild(e))})(s)});g.module("ngSanitize").filter("linky",["$sanitize",function(k){var l=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
	q=/^mailto:/i,x=g.$$minErr("linky"),u=g.isDefined,s=g.isFunction,t=g.isObject,y=g.isString;return function(d,g,p){function w(a){a&&m.push(H(a))}function z(a,b){var c,d=v(a);m.push("<a ");for(c in d)m.push(c+'="'+d[c]+'" ');!u(g)||"target"in d||m.push('target="',g,'" ');m.push('href="',a.replace(/"/g,"&quot;"),'">');w(b);m.push("</a>")}if(null==d||""===d)return d;if(!y(d))throw x("notstring",d);for(var v=s(p)?p:t(p)?function(){return p}:function(){return{}},n=d,m=[],f,a;d=n.match(l);)f=d[0],d[2]||
	d[4]||(f=(d[3]?"http://":"mailto:")+f),a=d.index,w(n.substr(0,a)),z(f,d[0].replace(q,"")),n=n.substring(a+d[0].length);w(n);return k(m.join(""))}}])})(window,window.angular);
	//# sourceMappingURL=angular-sanitize.min.js.map


/***/ }
/******/ ]);