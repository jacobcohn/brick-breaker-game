import elements from './elements';

const CreateBrick = (givenX, givenY, givenHealth) => {
  const x = givenX;
  let y = givenY;
  let health = givenHealth;
  let score = givenHealth;

  const getHealth = () => health;

  const brickHit = () => {
    health -= 1;
  };

  const nextRound = () => {
    y += elements.brickHeight;
    score += 1;
  };

  const findRectColor = () => {
    let currentRed = 227;
    let currentGreen = 100;
    let currentBlue = 113;
    const finalRed = 243;
    const finalGreen = 186;
    const finalBlue = 189;

    currentRed += Math.floor((finalRed - currentRed) * (1 - health / score));
    currentGreen += Math.floor((finalGreen - currentGreen) * (1 - health / score));
    currentBlue += Math.floor((finalBlue - currentBlue) * (1 - health / score));

    return `rgb(${currentRed}, ${currentGreen}, ${currentBlue})`;
  };

  const drawRect = () => {
    elements.ctx.beginPath();
    elements.ctx.fillStyle = findRectColor();
    elements.ctx.rect(
      x + elements.brickBorderSize,
      y + elements.brickBorderSize,
      elements.brickWidth - elements.brickBorderSize * 2,
      elements.brickHeight - elements.brickBorderSize * 2,
    );
    elements.ctx.fill();
  };

  const drawText = () => {
    elements.ctx.beginPath();
    elements.ctx.font = `${elements.brickHeight * 0.45}px Trebuchet MS`;
    elements.ctx.textAlign = 'center';
    elements.ctx.textBaseline = 'middle';
    elements.ctx.fillStyle = '#ECEBF3';
    elements.ctx.fillText(health, x + elements.brickWidth / 2, y + elements.brickHeight / 2);
  };

  const draw = () => {
    if (health <= 0) return;
    drawRect();
    drawText();
  };

  return { getHealth, brickHit, nextRound, draw };
};

export default CreateBrick;
