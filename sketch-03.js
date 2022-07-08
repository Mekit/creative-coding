const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  duration: 5,
};

const colors = [
  '#495ED6', // Blue
  '#F94E50', // Red
  '#FFC700', // Yellow
];

const sketch = ({context, width, height}) => {
  
  // Set up of circles
  const circles = [];
  for (let index = 0; index < 1000; index++) {
    const radius = random.range(2, 20);
    const x = random.range(radius, width - radius);
    const y = random.range(radius, height - radius);
    const circle = new Circle(radius, x, y);
    circles.push(circle);
  }
  
  // Rendering loop
  return ({context, width, height, playhead}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Rendering the circles
    circles.forEach(circle => {
      circle.animate(playhead, width, height);
      circle.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Circle{
  constructor(radius, x, y){
    this.radius = radius; // random.range(20, 70);
    this.x = x;
    this.y = y;

    this.color = randomColor();
    
    this.moveX = random.range(-1, 1);
    this.moveY = random.range(-1, 1);
    
    this.aRadius = this.radius;
    this.timeOffset = random.rangeFloor(1, 8);
  }

  draw(context){
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  animate(playhead, width, height){
    // Animate the radius
    // const t = pingPongPlayhead(playhead);
    const t = pingPongPlayheadOffset(playhead, this.timeOffset);
    // this.aRadius = this.radius * t;
    this.aRadius = this.radius * t;
    
    // Moove the circle
    this.x = this.x + this.moveX;
    this.y = this.y + this.moveY;
    if ((this.x <= 0 + this.radius) || (this.x >= width - this.radius)){
      this.moveX = -this.moveX;
    }
    if ((this.y <= 0 + this.radius) || (this.y >= height - this.radius)){
      this.moveY = -this.moveY;
    }
  }
}

// ** UTILITIES **
// ---------------

// Get a random colors from the palette
function randomColor(){
  let i = random.rangeFloor(0, colors.length);
  return colors[i];  
}

// Get a seamless 0..1 value for our loop
function pingPongPlayhead(playhead){
  return Math.sin(playhead * Math.PI);
}

// Get a seamless 0..1 value for our loop with offset
function pingPongPlayheadOffset(playhead, offset = 1){
  return Math.abs(Math.sin(playhead * Math.PI + (Math.PI / 4) * offset));
}