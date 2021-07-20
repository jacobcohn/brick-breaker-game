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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n\n\nconst CreateBall = (givenAngle, givenStartingX) => {\n  let radius = _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius;\n  const speed = radius;\n  let angle = givenAngle;\n  if (angle < _elements__WEBPACK_IMPORTED_MODULE_0__.default.smallestAngle) angle = _elements__WEBPACK_IMPORTED_MODULE_0__.default.smallestAngle;\n  if (angle > _elements__WEBPACK_IMPORTED_MODULE_0__.default.largestAngle) angle = _elements__WEBPACK_IMPORTED_MODULE_0__.default.largestAngle;\n\n  let x = givenStartingX;\n  let y = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - radius;\n  let dx = speed * Math.cos(angle);\n  let dy = -1 * speed * Math.sin(angle);\n\n  let isInPlay = true;\n  let endingX;\n\n  const getIsInPlay = () => isInPlay;\n  const getX = () => x;\n\n  const draw = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.beginPath();\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.arc(x, y, radius, 0, Math.PI * 2, true);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.fillStyle = '#121F2B';\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.fill();\n  };\n\n  const update = () => {\n    if (isInPlay) {\n      if (x > _elements__WEBPACK_IMPORTED_MODULE_0__.default.width - radius || x < radius) {\n        dx = -dx;\n      }\n\n      if (y < radius) {\n        dy = -dy;\n      }\n\n      if (y > _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - radius) {\n        isInPlay = false;\n      }\n\n      x += dx;\n      y += dy;\n\n      draw();\n    } else if (!isInPlay) {\n      x += dx;\n\n      if (Math.abs(endingX - x) < 1) {\n        x = endingX;\n        dx = 0;\n      }\n\n      draw();\n    }\n  };\n\n  const finish = (givenX) => {\n    if (endingX === undefined) {\n      endingX = givenX;\n\n      radius *= 0.975; // fixes hexagon bug\n      y = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - radius;\n      dy = 0;\n      dx = (endingX - x) / 18;\n    }\n\n    update();\n  };\n\n  return { getIsInPlay, getX, draw, update, finish };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateBall);\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/CreateBall.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst elements = (() => {\n  const canvas = document.getElementById('gameCanvasContent');\n  const ctx = canvas.getContext('2d');\n  const width = 800;\n  const height = width * 0.75;\n  const ballRadius = width / 80;\n  const smallestAngle = Math.PI / 18;\n  const largestAngle = Math.PI - smallestAngle;\n  const numberOfBricksPerRow = 6;\n  const numberOfRowsOfBricks = 6;\n  const brickWidth = width / numberOfBricksPerRow;\n  const brickHeight = height / (numberOfRowsOfBricks + 2);\n\n  return {\n    canvas,\n    ctx,\n    width,\n    height,\n    ballRadius,\n    smallestAngle,\n    largestAngle,\n    numberOfBricksPerRow,\n    numberOfRowsOfBricks,\n    brickWidth,\n    brickHeight,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elements);\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/elements.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.js\");\n/* harmony import */ var _CreateBall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateBall */ \"./src/CreateBall.js\");\n/* harmony import */ var _CreateLine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateLine */ \"./src/CreateLine.js\");\n\n\n\n\nconst dom = (() => {\n  const createCanvasDimension = () => {\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.width = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width;\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.height = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height;\n  };\n\n  const displayScores = (currentScore) => {\n    const highScore = localStorage.getItem('highScore');\n    const currentScoreContent = document.getElementById('currentScoreContent');\n    const highScoreContent = document.getElementById('highScoreContent');\n\n    currentScoreContent.textContent = currentScore;\n    if (currentScore > highScore) {\n      highScoreContent.textContent = currentScore;\n      localStorage.setItem('highScore', currentScore);\n    } else if (currentScore <= highScore) {\n      highScoreContent.textContent = highScore;\n    }\n  };\n\n  const updateBallCounter = (ballsLeft, startingX) => {\n    const ballCounterContent = document.getElementById('ballCounterContent');\n    if (ballsLeft > 0) {\n      ballCounterContent.textContent = `x${ballsLeft}`;\n    } else {\n      ballCounterContent.textContent = '';\n    }\n\n    let pixelsShifted = Math.floor(startingX * 2 - _elements__WEBPACK_IMPORTED_MODULE_0__.default.width);\n    if (pixelsShifted > 0) {\n      ballCounterContent.style.marginLeft = `${pixelsShifted}px`;\n      ballCounterContent.style.marginRight = '0px';\n    } else if (pixelsShifted < 0) {\n      pixelsShifted *= -1;\n      ballCounterContent.style.marginLeft = '0px';\n      ballCounterContent.style.marginRight = `${pixelsShifted}px`;\n    }\n  };\n\n  const init = () => {\n    createCanvasDimension();\n    const highScore = localStorage.getItem('highScore');\n    if (highScore === null) {\n      localStorage.setItem('highScore', 0);\n    }\n  };\n\n  return { displayScores, updateBallCounter, init };\n})();\n\nconst logic = (() => {\n  // variables\n  let gamePlaying = false;\n  let score = 0;\n  let frames = 0;\n  const bricksArray = [];\n  let ballsArray = [];\n  let startingX = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width / 2;\n  let newStartingX;\n  let isMouseInCanvas = false;\n  const mouse = {\n    x: undefined,\n    y: undefined,\n  };\n\n  // functions\n  const resetBricksArray = () => {\n    while (bricksArray.length) bricksArray.pop();\n\n    for (let i = 0; i < _elements__WEBPACK_IMPORTED_MODULE_0__.default.numberOfRowsOfBricks; i += 1) {\n      const newBricksRow = [];\n\n      for (let j = 0; j < _elements__WEBPACK_IMPORTED_MODULE_0__.default.numberOfBricksPerRow; j += 1) {\n        newBricksRow.push(0);\n      }\n\n      bricksArray.push(newBricksRow);\n    }\n  };\n\n  const updateMouseCoordinates = (event) => {\n    const rect = _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.getBoundingClientRect();\n    mouse.x = event.x - rect.left;\n    mouse.y = event.y - rect.top;\n  };\n\n  const findAngle = function findAngleFromCenterOfBallToMouse() {\n    const xCoordinateFromCenterOfBall = mouse.x - startingX;\n    const yCoordinateFromCenterOfBall = _elements__WEBPACK_IMPORTED_MODULE_0__.default.height - mouse.y - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius;\n    const angle = Math.atan2(yCoordinateFromCenterOfBall, xCoordinateFromCenterOfBall);\n    return angle;\n  };\n\n  const updateNewStartingX = (index) => {\n    if (newStartingX === undefined) {\n      newStartingX = ballsArray[index].getX();\n\n      // fixes the ball if it gets stuck on one of the walls\n      if (newStartingX < _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius) {\n        newStartingX = _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius + 0.1;\n      } else if (newStartingX > _elements__WEBPACK_IMPORTED_MODULE_0__.default.width - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius) {\n        newStartingX = _elements__WEBPACK_IMPORTED_MODULE_0__.default.width - _elements__WEBPACK_IMPORTED_MODULE_0__.default.ballRadius - 0.1;\n      }\n    }\n  };\n\n  const isRoundDone = () => {\n    let roundDoneAsOfNow = true;\n\n    ballsArray.forEach((ball) => {\n      if (ball.getX() !== newStartingX) {\n        roundDoneAsOfNow = false;\n      }\n    });\n\n    return roundDoneAsOfNow;\n  };\n\n  const gameOver = () => {};\n\n  const nextRoundOfBricks = () => {\n    const lastRowOfBricks = bricksArray[bricksArray.length];\n    if (lastRowOfBricks) {\n      lastRowOfBricks.forEach((brick) => {\n        if (brick !== 0) gameOver();\n      });\n    }\n    bricksArray.pop();\n\n    let nonZeroBricks;\n    if (score <= 3) nonZeroBricks = 1;\n    if (score <= 10 && score > 3) nonZeroBricks = Math.floor(1 + 3 * Math.random());\n    if (score <= 20 && score > 10) nonZeroBricks = Math.floor(2 + 3 * Math.random());\n    if (score <= 32 && score > 20) nonZeroBricks = Math.floor(2 + 4 * Math.random());\n    if (score <= 50 && score > 32) nonZeroBricks = Math.floor(3 + 3 * Math.random());\n    if (score > 50) nonZeroBricks = Math.floor(4 + 2 * Math.random());\n\n    const makeNewBricksRow = () => {\n      const bricksRow = [];\n\n      for (let i = 0; i < _elements__WEBPACK_IMPORTED_MODULE_0__.default.numberOfBricksPerRow; i += 1) {\n        const randomNumber = Math.ceil(Math.random() * _elements__WEBPACK_IMPORTED_MODULE_0__.default.numberOfBricksPerRow);\n        bricksRow.push(randomNumber <= nonZeroBricks ? score : 0);\n      }\n\n      let currentNonZeroBricks = 0;\n      for (let i = 0; i < bricksRow.length; i += 1) {\n        if (bricksRow[i] !== 0) currentNonZeroBricks += 1;\n      }\n      if (currentNonZeroBricks === 0 || currentNonZeroBricks === _elements__WEBPACK_IMPORTED_MODULE_0__.default.numberOfBricksPerRow) {\n        return makeNewBricksRow();\n      }\n\n      return bricksRow;\n    };\n\n    const newBricksRow = makeNewBricksRow();\n    bricksArray.unshift(newBricksRow);\n  };\n\n  const startNewRound = () => {\n    gamePlaying = false;\n    score += 1;\n    frames = 0;\n    nextRoundOfBricks();\n    ballsArray = [];\n    if (newStartingX !== undefined) {\n      startingX = newStartingX;\n    }\n    newStartingX = undefined;\n\n    dom.displayScores(score);\n    dom.updateBallCounter(score, startingX);\n  };\n\n  // event listeners\n  window.addEventListener('mousemove', (e) => {\n    isMouseInCanvas = e.target === _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas;\n    if (!gamePlaying && e.target === _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas) updateMouseCoordinates(e);\n  });\n\n  _elements__WEBPACK_IMPORTED_MODULE_0__.default.canvas.addEventListener('click', (e) => {\n    if (!gamePlaying) {\n      updateMouseCoordinates(e);\n      for (let i = 0; i < score; i += 1) {\n        ballsArray.push((0,_CreateBall__WEBPACK_IMPORTED_MODULE_1__.default)(findAngle(), startingX));\n      }\n      gamePlaying = true;\n    }\n  });\n\n  // animate\n  const animate = () => {\n    requestAnimationFrame(animate);\n    _elements__WEBPACK_IMPORTED_MODULE_0__.default.ctx.clearRect(0, 0, _elements__WEBPACK_IMPORTED_MODULE_0__.default.width, _elements__WEBPACK_IMPORTED_MODULE_0__.default.height);\n\n    if (!gamePlaying) {\n      (0,_CreateBall__WEBPACK_IMPORTED_MODULE_1__.default)(undefined, startingX).draw();\n\n      if (isMouseInCanvas) {\n        const line = (0,_CreateLine__WEBPACK_IMPORTED_MODULE_2__.default)(findAngle(), startingX);\n        line.update();\n      }\n    } else if (gamePlaying) {\n      const framesTiming = frames / 4;\n      let ballsLeft;\n\n      for (let i = 0; i < Math.min(framesTiming, ballsArray.length); i += 1) {\n        ballsLeft = ballsArray.length - Math.ceil(Math.min(framesTiming, ballsArray.length));\n\n        if (ballsArray[i].getIsInPlay()) {\n          ballsArray[i].update();\n        } else if (!ballsArray[i].getIsInPlay()) {\n          updateNewStartingX(i);\n          ballsArray[i].finish(newStartingX);\n        }\n\n        if (isRoundDone()) startNewRound();\n      }\n\n      if (!isRoundDone()) dom.updateBallCounter(ballsLeft, startingX);\n      if (ballsLeft > 0) (0,_CreateBall__WEBPACK_IMPORTED_MODULE_1__.default)(undefined, startingX).draw();\n\n      frames += 1;\n    }\n  };\n\n  // init\n  const init = () => {\n    resetBricksArray();\n    startNewRound();\n    animate();\n  };\n\n  return { init };\n})();\n\ndom.init();\nlogic.init();\n\n\n//# sourceURL=webpack://brick-breaker-game/./src/index.js?");

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