import elements from './elements';

const CreateBall = (givenAngle, givenStartingX) => {
  let radius = elements.ballRadius;
  const speed = radius * 1.2;
  let angle = givenAngle;
  if (angle < elements.smallestAngle) angle = elements.smallestAngle;
  if (angle > elements.largestAngle) angle = elements.largestAngle;

  let x = givenStartingX;
  let y = elements.height - radius;
  let dx = speed * Math.cos(angle);
  let dy = -1 * speed * Math.sin(angle);

  let inGame = true;
  let inFinish = false;
  let endingX;

  const getInGame = () => inGame;
  const getX = () => x;

  const draw = () => {
    elements.ctx.beginPath();
    elements.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    elements.ctx.fillStyle = '#121F2B';
    elements.ctx.fill();
  };

  const update = () => {
    if (inGame) {
      if (x > elements.width - radius || x < radius) {
        dx = -dx;
      }

      if (y < radius) {
        dy = -dy;
      }

      if (y > elements.height - radius) {
        inGame = false;
      }

      x += dx;
      y += dy;

      draw();
    }
    if (inFinish) {
      x += dx;

      if (Math.abs(endingX - x) < 1) {
        x = endingX;
        dx = 0;
      }

      draw();
    }
  };

  const finish = (givenX) => {
    if (endingX === undefined) {
      inFinish = true;
      endingX = givenX;

      radius *= 0.975; // fixes hexagon bug
      y = elements.height - radius;
      dy = 0;
      dx = (endingX - x) / 15;
    }

    update();
  };

  return { getInGame, getX, draw, update, finish };
};

export default CreateBall;
