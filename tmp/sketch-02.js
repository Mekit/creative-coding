const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1920 ],
  animate: true,
  duration: 15,
};

const sketch = () => {
  return ({ context, width, height, playhead}) => {

    const speed = 6;

    const pingPongPlayhead = (index, tot) => {
      return Math.abs(Math.sin(playhead * speed * Math.PI + ((Math.PI / 4) * index) / tot));
    }

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let unit = width * 0.01;
    
    let nItems = 12;
    let gap = unit * 2;
    let marginH = unit * 5;
    let size = (width - (marginH * 2) - (gap * (nItems - 1))) / nItems;
    let nItemsV = Math.abs(height / (size + gap));
    
    // Hardcoded margins
    let marginV = - size * 0.5;
    marginH  = - size * 0.5;
    nItems = nItems + 2;

    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItemsV; j++) {
        let x = marginH + (size + gap) * i;
        let y = marginV + (size + gap) * j;
        let deltaI = pingPongPlayhead(i, nItems);
        let deltaJ = pingPongPlayhead(j, nItems * 0.5);

        context.beginPath();
        context.strokeStyle = 'black'
        context.lineWidth = unit * 0.5;
        context.rect(x, y, size, size);
        context.stroke();

        context.beginPath();
        let innerSize = size;
        let iWidth = innerSize * deltaI;
        let iHeight = innerSize * deltaJ;
        context.rect(x, y, iWidth, iHeight);
        context.fillStyle = 'black';
        context.fill();
      }
    }

    

  };
};

canvasSketch(sketch, settings);
