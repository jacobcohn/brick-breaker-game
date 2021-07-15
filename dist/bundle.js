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

/***/ "./src/CreateBall.js":
/*!***************************!*\
  !*** ./src/CreateBall.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n\n\nconst CreateBall = (givenAngle, givenStartingX) => {\n  let radius = _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius;\n  const speed = 8;\n  let angle = givenAngle;\n  if (angle < _elements__WEBPACK_IMPORTED_MODULE_0__.default.smallestAngle) angle = _elements__WEBPACK_IMPORTED_MODULE_0__.default.smallestAngle;\n  if (angle > _elements__WEBPACK_IMPORTED_MODULE_0__.default.largestAngle) angle = _elements__WEBPACK_IMPORTED_MODULE_0__.default.largestAngle;\n\n  let x = givenStartingX;\n  let y = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - radius;\n  let dx = speed * Math.cos(angle);\n  let dy = -1 * speed * Math.sin(angle);\n\n  let inGame = true;\n  let inFinish = false;\n  let endingX;\n\n  const getInGame = () => inGame;\n  const getX = () => x;\n\n  const draw = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.beginPath();\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.arc(x, y, radius, 0, Math.PI * 2, true);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.fillStroke = '#121F2B';\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.fill();\n  };\n\n  const update = () => {\n    if (inGame) {\n      if (x > _elements__WEBPACK_IMPORTED_MODULE_0__.default.width - radius || x < radius) {\n        dx = -dx;\n      }\n\n      if (y < radius) {\n        dy = -dy;\n      }\n\n      if (y > _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - radius) {\n        inGame = false;\n      }\n\n      x += dx;\n      y += dy;\n\n      draw();\n    }\n    if (inFinish) {\n      x += dx;\n      if (Math.abs(endingX - x) < 1) {\n        x = endingX;\n        dx = 0;\n      }\n\n      draw();\n    }\n  };\n\n  const finish = (givenX) => {\n    if (endingX === undefined) {\n      inFinish = true;\n      endingX = givenX;\n\n      radius *= 0.975; // fixes hexagon bug\n      y = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - radius;\n      dy = 0;\n      dx = (endingX - x) / 18;\n    }\n\n    update();\n  };\n\n  return { getInGame, getX, draw, update, finish };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateBall);\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/CreateBall.js?");

/***/ }),

/***/ "./src/CreateLine.js":
/*!***************************!*\
  !*** ./src/CreateLine.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n\n\nconst CreateLine = (givenAngle, givenStartingX) => {\n  let startingX = givenStartingX;\n  let startingY = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius;\n  let x;\n  let y;\n\n  const draw = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.beginPath();\n    const lineDashDistance = _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius;\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.setLineDash([lineDashDistance, lineDashDistance * 0.75]);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.lineWidth = _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius / 6;\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.strokeStyle = '#004A8F';\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.moveTo(startingX, startingY);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.lineTo(x, y);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.stroke();\n  };\n\n  const update = () => {\n    let angle = givenAngle;\n    if (angle < _elements__WEBPACK_IMPORTED_MODULE_0__.default.smallestAngle) angle = _elements__WEBPACK_IMPORTED_MODULE_0__.default.smallestAngle;\n    if (angle > _elements__WEBPACK_IMPORTED_MODULE_0__.default.largestAngle) angle = _elements__WEBPACK_IMPORTED_MODULE_0__.default.largestAngle;\n\n    const topRightAngle = Math.atan2(\n      _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius,\n      _elements__WEBPACK_IMPORTED_MODULE_0__.default.width - startingX,\n    );\n    const topLeftAngle = Math.atan2(_elements__WEBPACK_IMPORTED_MODULE_0__.default.height - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius, -1 * startingX);\n\n    if (angle < topRightAngle) {\n      x = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width;\n\n      const adjacent = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width - startingX;\n      const opposite = Math.tan(angle) * adjacent;\n\n      y = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius - opposite;\n    } else if (angle > topRightAngle && angle < topLeftAngle) {\n      y = 0;\n\n      const opposite = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius;\n      const adjacent = (1 / Math.tan(angle)) * opposite;\n\n      if (angle <= Math.PI) x = startingX + adjacent;\n      if (angle > Math.PI) x = startingX - adjacent;\n    } else if (angle > topLeftAngle) {\n      x = 0;\n\n      const adjacent = -1 * startingX;\n      const opposite = Math.tan(angle) * adjacent;\n\n      y = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius - opposite;\n    }\n\n    // changing the starting positions so line does not draw over the ball\n    startingX += 2 * _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius * Math.cos(angle);\n    startingY -= 2 * _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius * Math.sin(angle);\n\n    draw();\n  };\n\n  return { update };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateLine);\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/CreateLine.js?");

/***/ }),

/***/ "./src/elements.js":
/*!*************************!*\
  !*** ./src/elements.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst elements = (() => {\n  const canvas = document.getElementById('gameCanvasContent');\n  const ctx = canvas.getContext('2d');\n  const width = 800;\n  const height = width * 0.75;\n  const ballRadius = 10;\n  const smallestAngle = Math.PI / 12;\n  const largestAngle = Math.PI - smallestAngle;\n\n  return { canvas, ctx, width, height, ballRadius, smallestAngle, largestAngle };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elements);\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/elements.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n/* harmony import */ var _CreateBall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateBall */ \"./src/CreateBall.js\");\n/* harmony import */ var _CreateLine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateLine */ \"./src/CreateLine.js\");\n\n\n\n\nconst logic = (() => {\n  const createCanvasDimension = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.width = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width;\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.height = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height;\n  };\n\n  const mouse = {\n    x: undefined,\n    y: undefined,\n  };\n\n  let gamePlaying = false;\n  let score = 0;\n  let frames = 0;\n  let ballsArray = [];\n  let startingX = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width / 2;\n  let newStartingX;\n  let isMouseInCanvas = false;\n\n  const updateMouseCoordinates = (event) => {\n    const rect = _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.getBoundingClientRect();\n    mouse.x = event.x - rect.left;\n    mouse.y = event.y - rect.top;\n  };\n\n  const findAngle = function findAngleFromCenterOfBallToMouse() {\n    const xCoordinateFromCenterOfBall = mouse.x - startingX;\n    const yCoordinateFromCenterOfBall = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - mouse.y - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius;\n    const angle = Math.atan2(yCoordinateFromCenterOfBall, xCoordinateFromCenterOfBall);\n    return angle;\n  };\n\n  window.addEventListener('mousemove', (e) => {\n    isMouseInCanvas = e.target === _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas;\n    if (!gamePlaying && e.target === _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas) updateMouseCoordinates(e);\n  });\n\n  _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.addEventListener('click', (e) => {\n    if (gamePlaying) return;\n    updateMouseCoordinates(e);\n    for (let i = 0; i < score; i += 1) {\n      ballsArray.push((0,_CreateBall__WEBPACK_IMPORTED_MODULE_1__.default)(findAngle(), startingX));\n      // if (i < 1) {\n      //   ballsArray.push(CreateBall(Math.PI / 3, startingX));\n      // } else {\n      //   ballsArray.push(CreateBall(findAngle(), startingX));\n      // }\n    }\n    gamePlaying = true;\n  });\n\n  const isRoundDone = () => {\n    let roundDoneAsOfNow = true;\n\n    ballsArray.forEach((ball) => {\n      if (ball.getX() !== newStartingX) {\n        roundDoneAsOfNow = false;\n      }\n    });\n\n    return roundDoneAsOfNow;\n  };\n\n  const startNewRound = () => {\n    gamePlaying = false;\n    score += 1;\n    frames = 0;\n    ballsArray = [];\n    if (newStartingX !== undefined) {\n      startingX = newStartingX;\n    }\n    newStartingX = undefined;\n  };\n\n  const animate = () => {\n    requestAnimationFrame(animate);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.clearRect(0, 0, _elements__WEBPACK_IMPORTED_MODULE_0__.default.width, _elements__WEBPACK_IMPORTED_MODULE_0__.default.height);\n\n    if (!gamePlaying) {\n      (0,_CreateBall__WEBPACK_IMPORTED_MODULE_1__.default)(0, startingX).draw();\n\n      if (isMouseInCanvas) {\n        const line = (0,_CreateLine__WEBPACK_IMPORTED_MODULE_2__.default)(findAngle(), startingX);\n        line.update();\n      }\n    } else if (gamePlaying) {\n      frames += 1;\n      for (let i = 0; i < Math.min(frames / 4, ballsArray.length); i += 1) {\n        ballsArray[i].update();\n\n        if (!ballsArray[i].getInGame()) {\n          if (newStartingX === undefined) {\n            newStartingX = ballsArray[i].getX();\n          }\n          ballsArray[i].finish(newStartingX);\n        }\n\n        if (isRoundDone()) startNewRound();\n      }\n    }\n  };\n\n  const initiate = () => {\n    createCanvasDimension();\n    startNewRound();\n    animate();\n  };\n\n  return { initiate };\n})();\n\nlogic.initiate();\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/index.js?");

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