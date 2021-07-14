const elements = (() => {
  const canvas = document.getElementById('gameCanvasContent');
  const ctx = canvas.getContext('2d');
  const width = 800;
  const height = width * 0.75;
  const ballRadius = 10;

  return { canvas, ctx, width, height, ballRadius };
})();

export default elements;