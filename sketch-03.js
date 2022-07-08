const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

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

function randomColor(){
  let i = random.rangeFloor(0, colors.length);
  return colors[i];  
}

const sketch = ({context, width, height}) => {
  
  // Set up dei dati
  const items = [];
  for (let index = 0; index < 100; index++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    items.push(new Item(x, y));
  }
  
  // Loop di rendering
  return ({context, width, height, playhead}) => {

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    items.forEach(item => {
      item.draw(context);
    });

  };
};

canvasSketch(sketch, settings);

class Item{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = random.range(0, 30);
    this.color = randomColor();
  }

  draw(context){
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}