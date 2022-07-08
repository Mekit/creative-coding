const canvasSketch = require('canvas-sketch');

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
    let gridCount = 50;
    let gridSize = (width - padding) / gridCount;
    let unit = gridSize * 0.1;
    let gridGap = unit * 1.5;

    context.strokeStyle = 'gray';
    context.setLineDash([unit * 0.5, unit * 1]);
    context.lineWidth = unit * 0.25;

    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        let x = gridSize * i + padding * 0.5;
        let y = gridSize * j + padding * 0.5;

        // Grid
        context.beginPath();
        context.rect(x, y, gridSize, gridSize);
        context.stroke();

        // Let the computer decide
        // how many colored square
        let color = 'black';
        if (Math.random() > 0.8){
          color = colors[2];
        }
        
        // Let the computer decide
        // if the square should be drawn
        if (Math.random() > 0.2){
          context.fillStyle = color;
          context.fillRect(
            x + gridGap * 0.5,
            y + gridGap * 0.5,
            gridSize - gridGap,
            gridSize - gridGap,
          );
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
