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

  const collisionsWithWalls = () => {
    if (x > elements.width - radius || x < radius) {
      dx = -dx;
    }

    if (y < radius) {
      dy = -dy;
    }

    if (y > elements.height - radius) {
      isInPlay = false;
    }

    if (y + dy + radius > elements.height) {
      const possibleError = 0.01;
      const ratio = (elements.height - y - radius + possibleError) / dy;
      dx *= ratio;
      dy *= ratio;
    }
  };

  const collisionsWithBricks = (bricksArray) => {
    const bricksHitArray = [];

    for (let i = 0; i < elements.numberOfRowsOfBricks; i += 1) {
      for (let j = 0; j < elements.numberOfBricksPerRow; j += 1) {
        if (bricksArray[i][j].getHealth() === 0) j += 1;

        // code here
      }
    }

    return bricksHitArray;
  };

  const update = (bricksArray) => {
    collisionsWithWalls();
    const bricksHitArray = collisionsWithBricks(bricksArray);

    x += dx;
    y += dy;

    draw();
    return bricksHitArray;
  };

  const finish = (givenX) => {
    if (endingX === undefined) {
      endingX = givenX;

      radius *= 0.975; // fixes hexagon bug
      y = elements.height - radius;
      dy = 0;
      dx = (endingX - x) / 18;
    }

    x += dx;

    const possibleError = 0.01;
    if (Math.abs(endingX - x) < possibleError) {
      x = endingX;
      dx = 0;
    }

    draw();
  };

  return { getIsInPlay, getX, draw, update, finish };
};

export default CreateBall;
