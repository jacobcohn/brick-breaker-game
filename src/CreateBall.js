import elements from './elements';

const CreateBall = (givenAngle, givenStartingX) => {
  let radius = elements.ballRadius;
  const speed = radius;
  let angle = givenAngle;
  if (angle < elements.smallestAngle) angle = elements.smallestAngle;
  if (angle > elements.largestAngle) angle = elements.largestAngle;

  let x = givenStartingX;
  let y = elements.height - radius;
  let dx = speed * Math.cos(angle);
  let dy = -1 * speed * Math.sin(angle);

  let isInPlay = true;
  let endingX;

  const getIsInPlay = () => isInPlay;
  const getX = () => x;

  const draw = () => {
    elements.ctx.beginPath();
    elements.ctx.fillStyle = '#121F2B';
    elements.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    elements.ctx.fill();
  };

  const update = () => {
    if (isInPlay) {
      if (x > elements.width - radius || x < radius) {
        dx = -dx;
      }

      if (y < radius) {
        dy = -dy;
      }

      if (y > elements.height - radius) {
        isInPlay = false;
      }

      x += dx;
      y += dy;

      draw();
    } else if (!isInPlay) {
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
      endingX = givenX;

      radius *= 0.975; // fixes hexagon bug
      y = elements.height - radius;
      dy = 0;
      dx = (endingX - x) / 18;
    }

    update();
  };

  return { getIsInPlay, getX, draw, update, finish };
};

export default CreateBall;
