const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

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

    const padding = width * 0.05;
    const drawWidth = width - (padding * 2);
    
    const speed = 3;
    const nItems = 20;

    const size = drawWidth / nItems;
    const itemWidth = size * 0.8;
    const itemHeight = size * 0.1;

    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItems; j++) {
        let x = padding + size * i;
        let y = padding + size * j;
        
        // Go to the center of the item
        x = x + size * 0.5;
        y = y + size * 0.5;
        context.save();
        context.translate(x, y);

        // Rotate with offset
        let rad = playhead * Math.PI * speed;
        let offsetI = radOffset(i, nItems * 2);
        let offsetJ = radOffset(j, nItems * 2);
        let angle = rad + offsetI + offsetJ;
        context.rotate(angle);

        context.fillStyle = "black";

        context.beginPath();
        context.scale(1, 1);
        context.rect(-itemWidth * 0.5, -itemHeight * 0.5, itemWidth, itemHeight);
        context.fill();

        context.restore();
      }
    }

    function radOffset(index, tot){
      return ((2 * Math.PI / tot) * (index));
    };

  };
};

canvasSketch(sketch, settings);
