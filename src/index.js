import elements from './elements';
import CreateBall from './CreateBall';

const main = (() => {
  const createCanvasDimension = () => {
    elements.canvas.width = elements.width;
    elements.canvas.height = elements.height;
  };

  let gamePlaying = false;
  const score = 60;
  const mouse = {
    x: undefined,
    y: undefined,
  };
  const ballsArray = [];
  let frames = 0;

  const updateMouseCoordinates = (event) => {
    const rect = elements.canvas.getBoundingClientRect();
    mouse.x = event.x - rect.left;
    mouse.y = event.y - rect.top;
  };

  elements.canvas.addEventListener('mousemove', (e) => {
    if (!gamePlaying) {
      updateMouseCoordinates(e);
    }
  });

  elements.canvas.addEventListener('click', (e) => {
    if (gamePlaying) return;
    updateMouseCoordinates(e);
    const xCoordinateFromCenterOfBall = mouse.x - elements.width / 2;
    const yCoordinateFromCenterOfBall = elements.height - mouse.y - elements.ballRadius;
    const angle = Math.atan2(yCoordinateFromCenterOfBall, xCoordinateFromCenterOfBall);
    for (let i = 0; i < score; i += 1) {
      ballsArray.push(CreateBall(angle));
    }
    gamePlaying = true;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    elements.ctx.clearRect(0, 0, elements.width, elements.height);

    if (!gamePlaying) {
      // code here
    } else if (gamePlaying) {
      frames += 1;
      for (let i = 0; i < frames / 4; i += 1) {
        ballsArray[i].update();
      }
    }
  };

  const initiate = () => {
    createCanvasDimension();
    animate();
  };

  return { initiate };
})();

main.initiate();
