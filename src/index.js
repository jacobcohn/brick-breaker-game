import elements from './elements';
import ball from './ball';

const main = (() => {
  const createCanvasDimension = () => {
    elements.canvas.width = elements.width;
    elements.canvas.height = elements.height;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    elements.ctx.clearRect(0, 0, elements.width, elements.height);
    ball.update();
  };

  const initiate = () => {
    createCanvasDimension();
    animate();
  };

  return { initiate };
})();

main.initiate();
