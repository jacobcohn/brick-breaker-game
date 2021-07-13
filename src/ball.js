import elements from './elements';

const ball = (() => {
  const radius = 10;
  let x = radius + Math.floor(Math.random() * (elements.width - 2 * radius));
  let y = radius + Math.floor(Math.random() * (elements.height - 2 * radius));
  let dx = 5 + Math.floor(Math.random() * 2);
  let dy = 5 + Math.floor(Math.random() * 2);

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
})();

export default ball;
