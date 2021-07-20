import elements from './elements';
import CreateBall from './CreateBall';
import CreateLine from './CreateLine';
import CreateBrick from './CreateBrick';

const dom = (() => {
  const createCanvasDimension = () => {
    elements.canvas.width = elements.width;
    elements.canvas.height = elements.height;
  };

  const displayScores = (currentScore) => {
    const highScore = localStorage.getItem('highScore');
    const currentScoreContent = document.getElementById('currentScoreContent');
    const highScoreContent = document.getElementById('highScoreContent');

    currentScoreContent.textContent = currentScore;
    if (currentScore > highScore) {
      highScoreContent.textContent = currentScore;
      localStorage.setItem('highScore', currentScore);
    } else if (currentScore <= highScore) {
      highScoreContent.textContent = highScore;
    }
  };

  const updateBallCounter = (ballsLeft, startingX) => {
    const ballCounterContent = document.getElementById('ballCounterContent');
    if (ballsLeft > 0) {
      ballCounterContent.textContent = `x${ballsLeft}`;
    } else {
      ballCounterContent.textContent = '';
    }

    let pixelsShifted = Math.floor(startingX * 2 - elements.width);
    if (pixelsShifted > 0) {
      ballCounterContent.style.marginLeft = `${pixelsShifted}px`;
      ballCounterContent.style.marginRight = '0px';
    } else if (pixelsShifted < 0) {
      pixelsShifted *= -1;
      ballCounterContent.style.marginLeft = '0px';
      ballCounterContent.style.marginRight = `${pixelsShifted}px`;
    }
  };

  const init = () => {
    createCanvasDimension();
    const highScore = localStorage.getItem('highScore');
    if (highScore === null) {
      localStorage.setItem('highScore', 0);
    }
  };

  return { displayScores, updateBallCounter, init };
})();

const logic = (() => {
  // variables
  let gamePlaying = false;
  let score = 0;
  let frames = 0;
  const bricksArray = [];
  let ballsArray = [];
  let startingX = elements.width / 2;
  let newStartingX;
  let isMouseInCanvas = false;
  const mouse = {
    x: undefined,
    y: undefined,
  };

  // functions
  const resetBricksArray = () => {
    while (bricksArray.length) bricksArray.pop();

    for (let i = 0; i < elements.numberOfRowsOfBricks; i += 1) {
      const newBricksRow = [];

      for (let j = 0; j < elements.numberOfBricksPerRow; j += 1) {
        newBricksRow.push(0);
      }

      bricksArray.push(newBricksRow);
    }
  };

  const updateMouseCoordinates = (event) => {
    const rect = elements.canvas.getBoundingClientRect();
    mouse.x = event.x - rect.left;
    mouse.y = event.y - rect.top;
  };

  const findAngle = function findAngleFromCenterOfBallToMouse() {
    const xCoordinateFromCenterOfBall = mouse.x - startingX;
    const yCoordinateFromCenterOfBall = elements.height - mouse.y - elements.ballRadius;
    const angle = Math.atan2(yCoordinateFromCenterOfBall, xCoordinateFromCenterOfBall);
    return angle;
  };

  const updateNewStartingX = (index) => {
    if (newStartingX === undefined) {
      newStartingX = ballsArray[index].getX();

      // fixes the ball if it gets stuck on one of the walls
      if (newStartingX < elements.ballRadius) {
        newStartingX = elements.ballRadius + 0.1;
      } else if (newStartingX > elements.width - elements.ballRadius) {
        newStartingX = elements.width - elements.ballRadius - 0.1;
      }
    }
  };

  const isRoundDone = () => {
    let roundDoneAsOfNow = true;

    ballsArray.forEach((ball) => {
      if (ball.getX() !== newStartingX) {
        roundDoneAsOfNow = false;
      }
    });

    return roundDoneAsOfNow;
  };

  const gameOver = () => {};

  const nextRoundOfBricks = () => {
    let nonZeroBricks;
    if (score <= 3) nonZeroBricks = 1;
    if (score <= 10 && score > 3) nonZeroBricks = Math.floor(1 + 3 * Math.random());
    if (score <= 20 && score > 10) nonZeroBricks = Math.floor(2 + 3 * Math.random());
    if (score <= 32 && score > 20) nonZeroBricks = Math.floor(2 + 4 * Math.random());
    if (score <= 50 && score > 32) nonZeroBricks = Math.floor(3 + 3 * Math.random());
    if (score > 50) nonZeroBricks = Math.floor(4 + 2 * Math.random());

    const makeNewBricksRow = () => {
      const bricksRow = [];

      for (let i = 0; i < elements.numberOfBricksPerRow; i += 1) {
        const randomNumber = Math.ceil(Math.random() * elements.numberOfBricksPerRow);
        bricksRow.push(randomNumber <= nonZeroBricks ? score : 0);
      }

      let currentNonZeroBricks = 0;
      for (let i = 0; i < bricksRow.length; i += 1) {
        if (bricksRow[i] !== 0) currentNonZeroBricks += 1;
      }
      if (currentNonZeroBricks === 0 || currentNonZeroBricks === elements.numberOfBricksPerRow) {
        return makeNewBricksRow();
      }

      return bricksRow;
    };

    const newBricksRow = makeNewBricksRow();
    bricksArray.unshift(newBricksRow);

    // bricksArray.forEach(brickRow => {

    // })

    const lastRowOfBricks = bricksArray[bricksArray.length];
    if (lastRowOfBricks) {
      lastRowOfBricks.forEach((brick) => {
        if (brick !== 0) gameOver();
      });
    }
    bricksArray.pop();
  };

  const startNewRound = () => {
    gamePlaying = false;
    score += 1;
    frames = 0;
    nextRoundOfBricks();
    ballsArray = [];
    if (newStartingX !== undefined) {
      startingX = newStartingX;
    }
    newStartingX = undefined;

    dom.displayScores(score);
    dom.updateBallCounter(score, startingX);
  };

  // event listeners
  window.addEventListener('mousemove', (e) => {
    isMouseInCanvas = e.target === elements.canvas;
    if (!gamePlaying && e.target === elements.canvas) updateMouseCoordinates(e);
  });

  elements.canvas.addEventListener('click', (e) => {
    if (!gamePlaying) {
      updateMouseCoordinates(e);
      for (let i = 0; i < score; i += 1) {
        ballsArray.push(CreateBall(findAngle(), startingX));
      }
      gamePlaying = true;
    }
  });

  // animate
  const animate = () => {
    requestAnimationFrame(animate);
    elements.ctx.clearRect(0, 0, elements.width, elements.height);

    if (!gamePlaying) {
      // const brick1 = CreateBrick(0, elements.brickHeight, 12);
      // const brick2 = CreateBrick(elements.brickWidth, elements.brickHeight, 200);
      // const brick3 = CreateBrick(elements.brickWidth * 2, elements.brickHeight, 130);
      // brick1.newScore(200);
      // brick2.newScore(200);
      // brick3.newScore(200);
      // brick1.draw();
      // brick2.draw();
      // brick3.draw();
      CreateBall(undefined, startingX).draw();

      if (isMouseInCanvas) {
        const line = CreateLine(findAngle(), startingX);
        line.update();
      }
    } else if (gamePlaying) {
      const framesTiming = frames / 4;
      let ballsLeft;

      for (let i = 0; i < Math.min(framesTiming, ballsArray.length); i += 1) {
        ballsLeft = ballsArray.length - Math.ceil(Math.min(framesTiming, ballsArray.length));

        if (ballsArray[i].getIsInPlay()) {
          ballsArray[i].update();
        } else if (!ballsArray[i].getIsInPlay()) {
          updateNewStartingX(i);
          ballsArray[i].finish(newStartingX);
        }

        if (isRoundDone()) startNewRound();
      }

      if (!isRoundDone()) dom.updateBallCounter(ballsLeft, startingX);
      if (ballsLeft > 0) CreateBall(undefined, startingX).draw();

      frames += 1;
    }
  };

  // init
  const init = () => {
    resetBricksArray();
    startNewRound();
    animate();
  };

  return { init };
})();

dom.init();
logic.init();
