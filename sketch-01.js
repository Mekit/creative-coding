const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1024, 1024 ]
};

const colors = [
  '#495ED6', // Blue
  '#F94E50', // Red
  '#FFC700', // Yellow
];

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = colors[2];
    context.fillRect(0, 0, width, height);

    // Variables
    let padding = width * 0.1;
    let gridCount = 20;
    let gridDimension = (width - padding) / gridCount;
    let unit = gridDimension * 0.1;
    let squareGap = unit * 1.5;

    context.strokeStyle = 'gray';
    context.setLineDash([unit * 0.5, unit * 1]);
    context.lineWidth = unit * 0.25;

    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        let x = gridDimension * i + padding * 0.5;
        let y = gridDimension * j + padding * 0.5;

        // Grid
        context.beginPath();
        context.rect(x, y, gridDimension, gridDimension);
        // context.stroke();

        // Random color
        // let number = Math.floor(Math.random() * colors.length);
        // let color = colors[number];

        // Controlled color
        let color = 'black';
        let number = Math.random();
        if (number > 0.9){
          color = colors;
        }
        
        // Filled Square
        context.fillStyle = color;
        context.fillRect(
          x + squareGap * 0.5,
          y + squareGap * 0.5,
          gridDimension - squareGap,
          gridDimension - squareGap,
        );
      }
    }
  };
};

canvasSketch(sketch, settings);
