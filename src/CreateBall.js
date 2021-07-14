import elements from './elements';

const CreateBall = (givenAngle) => {
  const radius = elements.ballRadius;
  const speed = 8;
  const angle = givenAngle;
  let x = elements.width / 2;
  let y = elements.height - radius;
  let dx = speed * Math.cos(angle);
  let dy = -1 * speed * Math.sin(angle);

  const draw = () => {
    elements.ctx.beginPath();
    elements.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    elements.ctx.fillStroke = '#121F2B';
    elements.ctx.fill();
  };

  const update = () => {
    if (x > elements.width - radius || x < radius) {
      dx = -dx;
    }

    if (y > elements.height - radius || y < radius) {
      dy = -dy;
    }

    x += dx;
    y += dy;

    draw();
  };

  return { update };
};

export default CreateBall;
