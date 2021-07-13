/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n\n\nconst ball = (() => {\n  const radius = 10;\n  let x = radius + Math.floor(Math.random() * (_elements__WEBPACK_IMPORTED_MODULE_0__.default.width - 2 * radius));\n  let y = radius + Math.floor(Math.random() * (_elements__WEBPACK_IMPORTED_MODULE_0__.default.height - 2 * radius));\n  let dx = 5 + Math.floor(Math.random() * 2);\n  let dy = 5 + Math.floor(Math.random() * 2);\n\n  const draw = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.beginPath();\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.arc(x, y, radius, 0, Math.PI * 2, true);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.fillStroke = '#121F2B';\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.fill();\n  };\n\n  const update = () => {\n    if (x > _elements__WEBPACK_IMPORTED_MODULE_0__.default.width - radius || x < radius) {\n      dx = -dx;\n    }\n\n    if (y > _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - radius || y < radius) {\n      dy = -dy;\n    }\n\n    x += dx;\n    y += dy;\n\n    draw();\n  };\n\n  return { update };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ball);\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/ball.js?");

/***/ }),

/***/ "./src/elements.js":
/*!*************************!*\
  !*** ./src/elements.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst elements = (() => {\n  const canvas = document.getElementById('gameCanvasContent');\n  const ctx = canvas.getContext('2d');\n  const width = 800;\n  const height = width * 0.75;\n\n  return { canvas, ctx, width, height };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elements);\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/elements.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\n\n\n\nconst main = (() => {\n  const createCanvasDimension = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.width = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width;\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.height = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height;\n  };\n\n  const animate = () => {\n    requestAnimationFrame(animate);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.clearRect(0, 0, _elements__WEBPACK_IMPORTED_MODULE_0__.default.width, _elements__WEBPACK_IMPORTED_MODULE_0__.default.height);\n    _ball__WEBPACK_IMPORTED_MODULE_1__.default.update();\n  };\n\n  const initiate = () => {\n    createCanvasDimension();\n    animate();\n  };\n\n  return { initiate };\n})();\n\nmain.initiate();\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;