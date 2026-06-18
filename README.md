# Brick Breaker Game

A browser-based Brick Breaker game built with vanilla JavaScript and HTML5 Canvas.

**Live demo:** https://jacobcohn.github.io/brick-breaker-game/

## Gameplay

Players aim with the mouse and launch waves of balls to break procedurally generated brick rows before they reach the bottom of the board. Each round increases the score and difficulty, while the browser saves the player's high score with `localStorage`.

## Tech stack

- JavaScript ES Modules
- HTML5 Canvas API
- HTML/CSS
- Webpack
- ESLint + Prettier

## Technical highlights

- Custom ball, wall, brick, and corner collision handling
- Staggered multi-ball round system
- Dynamic brick health, colors, and row generation
- Canvas animation loop using `requestAnimationFrame`

## Source overview

- `src/index.js` — game setup, state, scoring, input, and animation loop
- `src/CreateBall.js` — ball physics, drawing, and collisions
- `src/CreateBrick.js` — brick rendering, health, and movement
- `src/CreateLine.js` — aiming guide
- `src/elements.js` — shared canvas references and constants
