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

  // functions for collisionsWithBricks
  const findDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const isSideCollisionDetection = (brickStartingX, brickEndingX, brickStartingY, brickEndingY) => {
    if (x + radius >= brickStartingX && x - radius <= brickEndingX && y >= brickStartingY && y <= brickEndingY) {
      return true;
    }
    return false;
  };

  const isVerticalCollisionDetection = (brickStartingX, brickEndingX, brickStartingY, brickEndingY) => {
    if (x >= brickStartingX && x <= brickEndingX && y + radius >= brickStartingY && y - radius <= brickEndingY) {
      return true;
    }
    return false;
  };

  const isCornerCollisionDetection = (brickStartingX, brickEndingX, brickStartingY, brickEndingY) => {
    if (
      findDistance(x, y, brickStartingX, brickStartingY) < radius ||
      findDistance(x, y, brickStartingX, brickEndingY) < radius ||
      findDistance(x, y, brickEndingX, brickStartingY) < radius ||
      findDistance(x, y, brickEndingX, brickEndingY) < radius
    ) {
      return true;
    }
    return false;
  };

  const isBrickHit = (brickStartingX, brickEndingX, brickStartingY, brickEndingY) => {
    if (isSideCollisionDetection(brickStartingX, brickEndingX, brickStartingY, brickEndingY)) return true;
    if (isVerticalCollisionDetection(brickStartingX, brickEndingX, brickStartingY, brickEndingY)) return true;
    if (isCornerCollisionDetection(brickStartingX, brickEndingX, brickStartingY, brickEndingY)) return true;
    return false;
  };

  const resolveXConflictingCollision = (brickX, brickYWithRadius, leftResult, rightResult) => {
    const ratio = (y - brickYWithRadius) / dy;
    const collisionX = x - ratio * dx;
    if (collisionX < brickX) return leftResult;
    if (collisionX > brickX) return rightResult;
    return 'vertical';
  };

  const resolveYConflictingCollision = (brickXWithRadius, brickY, topResult, bottomResult) => {
    const ratio = (x - brickXWithRadius) / dx;
    const collisionY = y - ratio * dy;
    if (collisionY < brickY) return topResult;
    if (collisionY > brickY) return bottomResult;
    return 'side';
  };

  const conflictingCollision = (brickStartingX, brickEndingX, brickStartingY, brickEndingY) => {
    if ((x <= brickStartingX && x - dx >= brickStartingX) || (x >= brickStartingX && x - dx <= brickStartingX)) {
      if (y <= brickStartingY) {
        // top left corner and top section
        return resolveXConflictingCollision(brickStartingX, brickStartingY - radius, 'corner', 'vertical');
      }
      // bottom left corner and bottom section
      return resolveXConflictingCollision(brickStartingX, brickEndingY + radius, 'corner', 'vertical');
    }

    if ((x <= brickEndingX && x - dx >= brickEndingX) || (x >= brickEndingX && x - dx <= brickEndingX)) {
      if (y <= brickStartingY) {
        // top right corner and top section
        return resolveXConflictingCollision(brickEndingX, brickStartingY - radius, 'vertical', 'corner');
      }
      // bottom right corner and bottom section
      return resolveXConflictingCollision(brickEndingX, brickEndingY + radius, 'vertical', 'corner');
    }

    if ((y <= brickStartingY && y - dy >= brickStartingY) || (y >= brickStartingY && y - dy <= brickStartingY)) {
      if (x <= brickStartingX) {
        // top left corner and left section
        return resolveYConflictingCollision(brickStartingX - radius, brickStartingY, 'corner', 'side');
      }
      // top right corner and right section
      return resolveYConflictingCollision(brickEndingX + radius, brickStartingY, 'corner', 'side');
    }

    if ((y <= brickEndingY && y - dy >= brickEndingY) || (y >= brickEndingY && y - dy <= brickEndingY)) {
      if (x <= brickStartingX) {
        // bottom left corner and left section
        return resolveYConflictingCollision(brickStartingX - radius, brickEndingY, 'side', 'corner');
      }
      // bottom right corner and right section
      return resolveYConflictingCollision(brickEndingX + radius, brickEndingY, 'side', 'corner');
    }

    return false;
  };

  const findTypeOfCollision = (brickStartingX, brickEndingX, brickStartingY, brickEndingY) => {
    const conflictingCollisionResult = conflictingCollision(brickStartingX, brickEndingX, brickStartingY, brickEndingY);
    if (conflictingCollisionResult) return conflictingCollisionResult;
    if (y < brickEndingY && y > brickStartingY) return 'side';
    if (x < brickEndingX && x > brickStartingX) return 'vertical';
    return 'corner';
  };

  const cornerCollision = () => {
    dx = -dx;
    dy = -dy;
  };

  const newBallDirection = (typeOfCollision) => {
    if (typeOfCollision === 'side') dx = -dx;
    if (typeOfCollision === 'vertical') dy = -dy;
    if (typeOfCollision === 'corner') cornerCollision();
  };

  const collisionsWithBricks = (bricksArray) => {
    const bricksHitArray = [];

    for (let i = 0; i < elements.numberOfRowsOfBricks; i += 1) {
      for (let j = 0; j < elements.numberOfBricksPerRow; j += 1) {
        if (bricksArray[i][j].getHealth() > 0) {
          const brickStartingX = j * elements.brickWidth;
          const brickEndingX = (j + 1) * elements.brickWidth;
          const brickStartingY = i * elements.brickHeight + elements.brickHeightRoom;
          const brickEndingY = (i + 1) * elements.brickHeight + elements.brickHeightRoom;

          let brickHit = false;
          if (isBrickHit(brickStartingX, brickEndingX, brickStartingY, brickEndingY)) brickHit = true;

          if (brickHit) {
            bricksHitArray.push([i, j]);
            newBallDirection(findTypeOfCollision(brickStartingX, brickEndingX, brickStartingY, brickEndingY));
          }
        }
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
