const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1024, 1024 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Variables
    let padding = width * 0.1;
    let gridCount = 20;
    let gridDimension = (width - padding) / gridCount;
    let unit = gridDimension * 0.1;
    let squareGap = unit * 1.5;

    // Colors
    let colors = [
      'black',
      'red',
      'white'
    ];

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
        context.stroke();

        // Color random
        // let number = Math.floor(Math.random() * 3);
        // let color = colors[number];
        // context.fillStyle = color;

        let color = colors[0];
        let number = Math.random();
        if (number > 0.9){
          color = colors[2];
        }
        // if (number < 0.1){
        //   color = colors[2];
        // }
        context.fillStyle = color;
        
        // Filled Square
        context.fillRect(
          x + squareGap * 0.5,
          y + squareGap * 0.5,
          gridDimension - squareGap,
          gridDimension - squareGap,
        );
      }
    }

    

    // context.beginPath();
    // context.strokeStyle = 'red';
    // context.lineWidth = 10;
    // context.rect(400, 100, 200, 200);
    // context.stroke();

    // context.beginPath();
    // context.lineTo(900, 700);
    // context.lineTo(700, 800);
    // context.lineTo(200, 800);
    // context.fill();
    // context.stroke();
  };
};

canvasSketch(sketch, settings);
