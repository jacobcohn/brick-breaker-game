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

    ballCounterContent.style.fontSize = `${elements.width / 35}px`;
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

  // brick functions
  const resetBricksArray = () => {
    while (bricksArray.length) bricksArray.pop();

    for (let i = 0; i < elements.numberOfRowsOfBricks; i += 1) {
      const newBricksRow = [];
      for (let j = 0; j < elements.numberOfBricksPerRow; j += 1) {
        const x = elements.brickWidth * j;
        const y = elements.brickHeight * (elements.numberOfRowsOfBricks - i);
        newBricksRow.push(CreateBrick(x, y, 0));
      }
      bricksArray.push(newBricksRow);
    }
  };

  const nextRoundForExistingBricks = () => {
    bricksArray.forEach((brickRow) => {
      brickRow.forEach((brick) => {
        brick.nextRound();
      });
    });

    bricksArray.pop();
  };

  const getNonzeroBrickProbability = () => {
    let nonzeroBrickProbability;

    if (score <= 3) nonzeroBrickProbability = 1;
    if (score <= 10 && score > 3) nonzeroBrickProbability = Math.floor(1 + 3 * Math.random());
    if (score <= 20 && score > 10) nonzeroBrickProbability = Math.floor(2 + 3 * Math.random());
    if (score <= 30 && score > 20) nonzeroBrickProbability = Math.floor(2 + 4 * Math.random());
    if (score <= 40 && score > 30) nonzeroBrickProbability = Math.floor(3 + 3 * Math.random());
    if (score <= 50 && score > 40) nonzeroBrickProbability = Math.floor(4 + 2 * Math.random());
    if (score > 50) nonzeroBrickProbability = 5;

    return nonzeroBrickProbability;
  };

  const makeAcceptableBricksRow = (nonzeroBrickProbability) => {
    const bricksRow = [];
    let currentNonzeroBricksCounter = 0;

    const createBrickWhileUpdatingCounter = (position, randomNumber) => {
      const x = position * elements.brickWidth;
      const y = elements.brickHeightRoom;

      if (randomNumber <= nonzeroBrickProbability) {
        currentNonzeroBricksCounter += 1;
        return CreateBrick(x, y, score);
      }
      return CreateBrick(x, y, 0);
    };

    for (let i = 0; i < elements.numberOfBricksPerRow; i += 1) {
      const randomNumber = Math.ceil(Math.random() * elements.numberOfBricksPerRow);
      bricksRow.push(createBrickWhileUpdatingCounter(i, randomNumber));
    }

    if (currentNonzeroBricksCounter === 0 || currentNonzeroBricksCounter === elements.numberOfBricksPerRow) {
      return makeAcceptableBricksRow(nonzeroBrickProbability);
    }

    return bricksRow;
  };

  const addNewBricksRow = () => {
    const newBricksRow = makeAcceptableBricksRow(getNonzeroBrickProbability());
    bricksArray.unshift(newBricksRow);
  };

  const updateGameState = () => {
    let gameState = 'stillPlaying';

    const lastRowOfBricks = bricksArray[bricksArray.length - 1];
    lastRowOfBricks.forEach((brick) => {
      if (brick.getHealth() > 0) gameState = 'gameOver';
    });

    return gameState;
  };

  const nextRoundOfBricks = () => {
    let gameState = 'stillPlaying';

    nextRoundForExistingBricks();
    addNewBricksRow();
    gameState = updateGameState();

    return gameState;
  };

  // all other functions
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

  const gameOver = () => {
    setTimeout(() => {
      alert('Game Over');
    }, 50);
  };

  const startNewRound = () => {
    gamePlaying = false;
    score += 1;
    frames = 0;
    if (nextRoundOfBricks() === 'gameOver') gameOver();
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

    bricksArray.forEach((brickRow) => {
      brickRow.forEach((brick) => {
        brick.draw();
      });
    });

    if (!gamePlaying) {
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
          const bricksHitArray = ballsArray[i].update(bricksArray);
          bricksHitArray.forEach((brickCoordinateArray) => {
            bricksArray[brickCoordinateArray[0]][brickCoordinateArray[1]].brickHit();
          });
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
