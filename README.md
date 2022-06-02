# Creative Coding

### Links

- [Canvas Sketch Docs](https://github.com/mattdesl/canvas-sketch/blob/master/docs/README.md)
- [Canvas Sketch Repository](https://github.com/mattdesl/canvas-sketch)
- [Canvas Sketch Examples](https://github.com/mattdesl/canvas-sketch/tree/master/examples)

### Sketches

- `sketch-01-a.js` - Grid with boxes
- `sketch-01-b.js` - Grid using translate
- `sketch-01-c.js` - Grid animated
- `sketch-02.js` - Rotating lines

### Some basic commands

```
# open a terminal and navigate to your project folder
cd /path/to/your/folder

# install dependencies
npm install

# create a sketch
canvas-sketch my-sketch.js --new

# open a sketch
canvas-sketch sketch-01-a.js --open

# Start the tool on an existing file and change PNG export folder
canvas-sketch sketch-01-a.js --output=media

# Save the output
cmd + s or ctrl + s (in the browser)

# Export Video
canvas-sketch sketch-01-c.js --output=media --stream

# Save the output
cmd + shift + s or ctrl + shift + s (in the browser)

```