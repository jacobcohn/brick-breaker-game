import elements from './elements';
import CreateBall from './CreateBall';
import CreateLine from './CreateLine';

const logic = (() => {
  const createCanvasDimension = () => {
    elements.canvas.width = elements.width;
    elements.canvas.height = elements.height;
  };

  const mouse = {
    x: undefined,
    y: undefined,
  };

  let gamePlaying = false;
  let score = 0;
  let frames = 0;
  let ballsArray = [];
  let startingX = elements.width / 2;
  let newStartingX;
  let isMouseInCanvas = false;

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

  window.addEventListener('mousemove', (e) => {
    isMouseInCanvas = e.target === elements.canvas;
    if (!gamePlaying && e.target === elements.canvas) updateMouseCoordinates(e);
  });

  elements.canvas.addEventListener('click', (e) => {
    if (gamePlaying) return;
    updateMouseCoordinates(e);
    for (let i = 0; i < score; i += 1) {
      ballsArray.push(CreateBall(findAngle(), startingX));
      // if (i < 1) {
      //   ballsArray.push(CreateBall(Math.PI / 3, startingX));
      // } else {
      //   ballsArray.push(CreateBall(findAngle(), startingX));
      // }
    }
    gamePlaying = true;
  });

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
  };

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
      for (let i = 0; i < Math.min(frames / 4, ballsArray.length); i += 1) {
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

  const initiate = () => {
    createCanvasDimension();
    startNewRound();
    animate();
  };

  return { initiate };
})();

logic.initiate();
