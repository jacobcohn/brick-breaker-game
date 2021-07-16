import elements from './elements';
import CreateBall from './CreateBall';
import CreateLine from './CreateLine';

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
  let ballsArray = [];
  let startingX = elements.width / 2;
  let newStartingX;
  let isMouseInCanvas = false;
  const mouse = {
    x: undefined,
    y: undefined,
  };

  // functions
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

  const startNewRound = () => {
    gamePlaying = false;
    score += 1;
    frames = 0;
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
    startNewRound();
    animate();
  };

  return { init };
})();

dom.init();
logic.init();
