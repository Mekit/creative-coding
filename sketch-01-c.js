const canvasSketch = require('canvas-sketch');
const { random } = require('canvas-sketch-util');

const settings = {
  dimensions: [ 1080, 1080 ]
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
    let gridCount = 15;
    let gridSize = (width - padding) / gridCount;
    let unit = gridSize * 0.1;

    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        let x = gridSize * i + padding * 0.5;
        let y = gridSize * j + padding * 0.5;
        
        // Translate the context
        context.save();
        context.translate(x, y);
        context.translate(gridSize * 0.5, gridSize * 0.5);

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
      context.setLineDash([unit * 0.25, unit * 1]);
      context.lineWidth = unit * 0.25;
      context.beginPath();
      context.rect(
        - gridSize * 0.5,
        - gridSize * 0.5,
        gridSize,
        gridSize
      );
      context.stroke();
    }

    function drawSquare(){
      context.fillStyle = randomColor();
      context.fillRect(
        - gridSize * 0.45,
        - gridSize * 0.45,
        gridSize * 0.9 * Math.random(),
        gridSize * 0.9 * Math.random(),
      );
    }

    function drawCircle(){
      context.beginPath();
      context.strokeStyle = randomColor();
      context.setLineDash([0, 0]);
      context.lineWidth = unit * 0.5;
      context.arc(
        gridSize * 0.25 * randomSign(),
        gridSize * 0.25 * randomSign(),
        gridSize * 0.5 * Math.random(),
        0, 
        2 * Math.PI
      );
      context.stroke();
    }

    function randomColor(){
      let number = Math.floor(Math.random() * colors.length);
      return colors[number];  
    }

    function randomSign(){
      let number = Math.random();
      if (Math.random() > 0.5){
        return - number;
      }
      return number;
    }

  };
};

canvasSketch(sketch, settings);
