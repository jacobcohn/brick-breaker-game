# Brick Breaker Game

A browser-based Brick Breaker game built with vanilla JavaScript and the HTML5 Canvas API. The project implements real-time rendering, custom collision physics, progressively generated brick rows, score tracking, and persistent high scores without a game engine.

Live preview: https://jacobcohn.github.io/brick-breaker-game/

## Features

- **Mouse-based aiming and launching**: Players aim with the cursor and click to launch each round of balls.
- **Progressive multi-ball gameplay**: The number of balls increases with the player's score, creating longer and more strategic rounds.
- **Dynamic brick generation**: New brick rows are generated each round, with difficulty increasing as the score rises.
- **Brick health system**: Bricks display their remaining health and visually change color as they take damage.
- **Custom collision physics**: Balls bounce off walls, brick faces, and brick corners using hand-written collision logic.
- **Aiming preview**: A dashed guide line shows the projected launch direction before the player shoots.
- **Round and game-over logic**: Bricks move downward after each round, and the game ends when active bricks reach the bottom row.
- **Score tracking**: The game displays the current score and saves the high score in browser `localStorage`.

## Technologies Used

- **JavaScript ES Modules** for game logic and code organization.
- **HTML5 Canvas API** for rendering balls, bricks, text, and aiming indicators.
- **HTML and CSS** for page layout, score display, and modal UI.
- **Webpack 5** for bundling source modules into `dist/bundle.js`.
- **ESLint, Airbnb config, and Prettier** for linting and formatting configuration.
- **Browser APIs** including `requestAnimationFrame`, DOM events, and `localStorage`.

## Skills Demonstrated

This project demonstrates practical experience with browser-based game development, including real-time rendering, animation loops, collision detection, vector math, procedural generation, and DOM integration. It also shows modular JavaScript organization, build tooling with Webpack, persistent browser storage, and careful management of game state across asynchronous animation frames and user input.

## How It Works

The game is organized around factory functions and small modules rather than a framework or external game engine.

- `src/index.js` coordinates application setup, DOM updates, input handling, game state, round progression, and the animation loop.
- `src/elements.js` centralizes canvas references and game constants such as dimensions, ball radius, brick sizes, and angle limits.
- `src/CreateBall.js` encapsulates ball state, movement, rendering, wall collision, brick collision, and end-of-round positioning.
- `src/CreateBrick.js` encapsulates brick state, health updates, downward movement, and drawing logic.
- `src/CreateLine.js` computes and renders the dashed aiming guide based on the mouse angle.

At startup, the canvas is sized to a fixed 800x600 play area, the initial brick grid is created, and the animation loop begins through `requestAnimationFrame`. When the player clicks the canvas, the game creates one ball per current score value and launches them sequentially over several frames. Each ball updates independently until it reaches the bottom of the canvas. The first ball to land determines the next round's launch position, and the remaining balls slide into that position before the next round starts.

After every completed round, the score increments, existing bricks move down one row, a new top row is generated, and the game checks whether any brick has reached the bottom row. If so, the game-over modal is displayed.

## Technical Highlights

- **Custom collision system:** Ball-brick collisions distinguish side, vertical, and corner impacts. Side and vertical impacts reflect the appropriate velocity component, while corner impacts use vector projection to reflect the velocity around the collision normal.
- **Corner collision approximation:** The ball estimates the point of contact with a brick corner by iteratively adjusting along its movement vector until the ball radius matches the distance to the corner.
- **Multi-hit collision handling:** When a ball hits multiple bricks in one update, the code adjusts the resulting direction based on whether the impacts are horizontally or vertically adjacent.
- **Angle clamping:** Launch angles are constrained between `Math.PI / 18` and `Math.PI - Math.PI / 18` to prevent nearly horizontal shots that would stall gameplay.
- **Procedural difficulty scaling:** Brick row generation changes the probability of non-empty bricks based on the score, while preventing rows that are either completely empty or completely full.
- **Stateful round management:** The game separates active play from aiming mode, tracks all balls in an array, and advances rounds only after every ball has finished returning to the shared starting position.
- **Persistent score storage:** High scores are saved locally in the browser with `localStorage` and updated whenever the current score exceeds the stored value.

## Project Structure

```text
.
├── dist/
│   ├── index.html      # Browser entry point and game UI markup
│   ├── style.css       # Layout, score display, canvas, and modal styling
│   └── bundle.js       # Webpack-generated JavaScript bundle
├── src/
│   ├── CreateBall.js   # Ball physics, rendering, and collision handling
│   ├── CreateBrick.js  # Brick health, movement, color, and drawing
│   ├── CreateLine.js   # Dashed aiming guide calculation and rendering
│   ├── elements.js     # Canvas references and shared game constants
│   └── index.js        # Main game loop, state management, DOM updates, and input handling
├── package.json        # npm scripts and development dependencies
├── webpack.config.js   # Webpack entry/output configuration
├── .eslintrc.json      # ESLint, Airbnb, and Prettier configuration
└── README.md
```
