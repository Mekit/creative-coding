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
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Variables
    let padding = width * 0.1;
    let gridCount = 10;
    let gridSize = (width - padding) / gridCount;
    let unit = gridSize * 0.1;
    let gridGap = unit * 1.5;
    let gridSizeInner = gridSize - gridGap;

    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        let x = gridSize * i + padding * 0.5;
        let y = gridSize * j + padding * 0.5;
        
        // Translate the context
        context.save();
        context.translate(x, y);

        // Draw
        // drawGrid();
        drawSquare();
        drawCircle();
        
        // Restore the context
        context.restore();
      }
    }

    function drawGrid(){
      context.strokeStyle = 'gray';
      context.setLineDash([unit * 0.5, unit * 1]);
      context.lineWidth = unit * 0.25;
      context.beginPath();
      context.rect(0, 0, gridSize, gridSize);
      context.stroke();
    }

    function drawSquare(){
      context.fillStyle = randomColor();
      context.fillRect(
        gridGap * 0.5,
        gridGap * 0.5,
        gridSizeInner,
        gridSizeInner,
      );
    }

    function drawCircle(){
      context.beginPath();
      context.fillStyle = randomColor();
      context.arc(
        gridSize * 0.5,
        gridSize * 0.5,
        (gridSizeInner) * 0.4,
        0, 
        2 * Math.PI
      );
      context.fill();
    }

    function randomColor(){
      let number = Math.floor(Math.random() * colors.length);
      return colors[number];  
    }

  };
};

canvasSketch(sketch, settings);
