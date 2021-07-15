import elements from './elements';
import CreateBall from './CreateBall';
import CreateLine from './CreateLine';

const dom = (() => {
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

  const init = () => {
    const highScore = localStorage.getItem('highScore');
    if (highScore === null) {
      localStorage.setItem('highScore', 0);
    }
  };

  return { init, displayScores };
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
  const createCanvasDimension = () => {
    elements.canvas.width = elements.width;
    elements.canvas.height = elements.height;
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
        // in order to have balls end at different x coordinates without bricks
        // if (i < 1) {
        //   ballsArray.push(CreateBall(Math.PI / 3, startingX));
        // } else {
        //   ballsArray.push(CreateBall(findAngle(), startingX));
        // }
      }
      gamePlaying = true;
    }
  });

  // animate
  const animate = () => {
    requestAnimationFrame(animate);
    elements.ctx.clearRect(0, 0, elements.width, elements.height);

    if (!gamePlaying) {
      CreateBall(0, startingX).draw();

      if (isMouseInCanvas) {
        const line = CreateLine(findAngle(), startingX);
        line.update();
      }
    } else if (gamePlaying) {
      frames += 1;
      for (let i = 0; i < Math.min(frames / 3, ballsArray.length); i += 1) {
        ballsArray[i].update();

        if (!ballsArray[i].getInGame()) {
          if (newStartingX === undefined) {
            newStartingX = ballsArray[i].getX();
          }
          ballsArray[i].finish(newStartingX);
        }

        if (isRoundDone()) startNewRound();
      }
    }
  };

  // init
  const init = () => {
    createCanvasDimension();
    startNewRound();
    animate();
  };

  return { init };
})();

dom.init();
logic.init();
