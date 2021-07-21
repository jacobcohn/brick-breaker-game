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

    // slows ball down before hitting ground
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
        if (bricksArray[i][j].getHealth() > 0) {
          let brickHit = false;
          const brickStartingX = j * elements.brickWidth;
          const brickEndingX = (j + 1) * elements.brickWidth;
          const brickStartingY = i * elements.brickHeight + elements.brickHeightRoom;
          const brickEndingY = (i + 1) * elements.brickHeight + elements.brickHeightRoom;

          if (
            x + radius >= brickStartingX &&
            x - radius <= brickEndingX &&
            y >= brickStartingY &&
            y <= brickEndingY
          ) {
            console.log('Side Hit', x, y);
            dx = -dx;
            brickHit = true;
          }

          if (
            x >= brickStartingX &&
            x <= brickEndingX &&
            y + radius >= brickStartingY &&
            y - radius <= brickEndingY
          ) {
            console.log('Vertical Hit', x, y);
            dy = -dy;
            brickHit += 1;
          }

          const findDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

          if (
            (findDistance(x, y, brickStartingX, brickStartingY) < radius ||
              findDistance(x, y, brickStartingX, brickEndingY) < radius ||
              findDistance(x, y, brickEndingX, brickStartingY) < radius ||
              findDistance(x, y, brickEndingX, brickEndingY) < radius) &&
            brickHit === 0
          ) {
            console.log('Corner Hit', x, y);
            dx = -dx;
            dy = -dy;
            brickHit += 1;
          }

          if (brickHit) {
            bricksHitArray.push([i, j]);
            console.log(brickStartingX, brickEndingX, brickStartingY, brickEndingY);
          }
        }
      }
    }

    return bricksHitArray;
  };

  const update = (bricksArray) => {
    console.log('Next Frame');
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
