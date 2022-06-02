const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  duration: 15,
};

const sketch = () => {
  return ({ context, width, height, playhead}) => {

    const radOffset = (index, tot) => {
      return ((Math.PI / tot) * (index));
    };

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";

    const padding = width * 0.05;
    const drawWidth = width - (padding * 2);
    
    const speed = 3;
    const nItems = 10;

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
        let deg = math.radToDeg(angle);
        console.debug(deg);

        if (deg > 90 && deg < 100){
          context.fillStyle = "red";
        } else {
          context.fillStyle = "black";
        }

        context.beginPath();
        context.rect(-itemWidth * 0.5, -itemHeight * 0.5, itemWidth, itemHeight);
        context.fill();

        context.restore();
      }
    }

  };
};

canvasSketch(sketch, settings);
