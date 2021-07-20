const elements = (() => {
  const canvas = document.getElementById('gameCanvasContent');
  const ctx = canvas.getContext('2d');
  const width = 800;
  const height = width * 0.75;
  const ballRadius = width / 80;
  const smallestAngle = Math.PI / 18;
  const largestAngle = Math.PI - smallestAngle;
  const numberOfBricksPerRow = 6;
  const numberOfRowsOfBricks = 7;
  const brickWidth = width / numberOfBricksPerRow;
  const brickHeight = height / (numberOfRowsOfBricks + 1);

  return {
    canvas,
    ctx,
    width,
    height,
    ballRadius,
    smallestAngle,
    largestAngle,
    numberOfBricksPerRow,
    numberOfRowsOfBricks,
    brickWidth,
    brickHeight,
  };
})();

export default elements;
