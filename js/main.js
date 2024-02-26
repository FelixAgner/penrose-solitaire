import { loadBoard } from './boardManager.js';
import { boardSketch } from './rendering.js';

// Instantiate the sketch
let board = loadBoard();


const sketch = boardSketch(board);
new p5(sketch);
