import elements from './elements';

const CreateLine = (givenAngle, givenStartingX) => {
  let startingX = givenStartingX;
  let startingY = elements.height - elements.ballRadius;
  let x;
  let y;

  const draw = () => {
    elements.ctx.beginPath();
    const lineDashDistance = elements.ballRadius;
    elements.ctx.setLineDash([lineDashDistance, lineDashDistance * 0.75]);
    elements.ctx.lineWidth = elements.ballRadius / 6;
    elements.ctx.strokeStyle = '#004A8F';
    elements.ctx.moveTo(startingX, startingY);
    elements.ctx.lineTo(x, y);
    elements.ctx.stroke();
  };

  const update = () => {
    let angle = givenAngle;
    if (angle < elements.smallestAngle) angle = elements.smallestAngle;
    if (angle > elements.largestAngle) angle = elements.largestAngle;

    const topRightAngle = Math.atan2(
      elements.height - elements.ballRadius,
      elements.width - startingX,
    );
    const topLeftAngle = Math.atan2(elements.height - elements.ballRadius, -1 * startingX);

    if (angle < topRightAngle) {
      x = elements.width;

      const adjacent = elements.width - startingX;
      const opposite = Math.tan(angle) * adjacent;

      y = elements.height - elements.ballRadius - opposite;
    } else if (angle > topRightAngle && angle < topLeftAngle) {
      y = 0;

      const opposite = elements.height - elements.ballRadius;
      const adjacent = (1 / Math.tan(angle)) * opposite;

      if (angle <= Math.PI) x = startingX + adjacent;
      if (angle > Math.PI) x = startingX - adjacent;
    } else if (angle > topLeftAngle) {
      x = 0;

      const adjacent = -1 * startingX;
      const opposite = Math.tan(angle) * adjacent;

      y = elements.height - elements.ballRadius - opposite;
    }

    // changing the starting positions so line does not draw over the ball
    startingX += 2 * elements.ballRadius * Math.cos(angle);
    startingY -= 2 * elements.ballRadius * Math.sin(angle);

    draw();
  };

  return { update };
};

export default CreateLine;
