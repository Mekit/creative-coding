const canvasSketch = require('canvas-sketch');
const { color } = require('canvas-sketch-util');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  duration: 15,
};

const colors = [
  '#495ED6', // Blue
  '#F94E50', // Red
  '#FFC700', // Yellow
];

const sketch = () => {
  return ({ context, width, height, playhead}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Variables
    let padding = width * 0.1;
    let gridCount = 10;
    let gridSize = (width - padding) / gridCount;
    let unit = gridSize * 0.1;
    let gridGap = unit * 1.5;
    let gridSizeInner = gridSize - gridGap;

    let i = 0;
    let j = 0;

    for (i = 0; i < gridCount; i++) {
      for (j = 0; j < gridCount; j++) {
        let x = gridSize * i + padding * 0.5;
        let y = gridSize * j + padding * 0.5;      
        
        // Translate the context
        context.save();
        context.translate(x + gridSize * 0.5, y + gridSize * 0.5);

        // Draw
        drawSquare();
        drawSquareInner();

        // drawCircle();
        // drawCircleInner();
        
        // drawGrid();
        
        // Restore the context
        context.restore();
      }
    }

    function drawGrid(){
      context.strokeStyle = 'gray';
      context.setLineDash([unit * 0.5, unit * 1]);
      context.lineWidth = unit * 0.25;

      context.save();
      context.translate(
        - gridSize * 0.5,
        - gridSize * 0.5
      );
      context.beginPath();
      context.rect(0, 0, gridSize, gridSize);
      context.stroke();
      context.restore();
    }

    function drawSquare(){
      let p = pingPongPlayheadOffset(4, (i + j) * 4, gridCount);

      context.save();
      context.translate(
        - gridSizeInner * 0.5 * p,
        - gridSizeInner * 0.5 * p
      );
      
      context.fillStyle = 'black';
      context.fillRect(
        0,
        0,
        gridSizeInner,
        gridSizeInner,
      );

      context.restore();
    }

    function drawSquareInner(){
      let p = pingPongPlayheadOffset(8, (i + j) * 2, gridCount);
      
      context.save();
      context.translate(
        - (gridSizeInner) * 0.5 * p,
        - (gridSizeInner) * 0.5 * p
      );

      context.fillStyle = 'white';

      context.fillRect(
        0,
        0,
        (gridSizeInner) * p,
        (gridSizeInner) * p,
      );

      context.restore();
    }

    function drawCircle(){
      let p = pingPongPlayheadOffset(8, (i + j) * 4, gridCount);
      context.beginPath();
      context.fillStyle = colors[1];
      context.arc(
        0,
        0,
        (gridSizeInner) * 0.5 * p,
        0, 
        2 * Math.PI
      );
      context.fill();
    }

    function drawCircleInner(){
      let p = pingPongPlayheadOffset(2, (i + j) * 2, gridCount);
      context.beginPath();
      context.fillStyle = colors[2];
      context.arc(
        0,
        0,
        (gridSizeInner) * 0.2 * p,
        0, 
        2 * Math.PI
      );
      context.fill();
    }

    function randomColor(){
      let number = Math.floor(Math.random() * colors.length);
      return colors[number];  
    }

    // ** ANIMATION **
    // ---------------

    function pingPongPlayheadOffset(sp = 1, offset = 1, tot = 1){
      return Math.abs(Math.sin(playhead * sp * Math.PI + ((Math.PI / 4) * offset) / tot));
    }

  };
};

canvasSketch(sketch, settings);
