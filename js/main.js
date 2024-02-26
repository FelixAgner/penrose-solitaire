import { loadBoard } from './boardManager.js';
import { boardSketch } from './rendering.js';
import { handleClick } from './gameLogic.js';

// Instantiate the sketch
let board = loadBoard();
let pegs = board.rhombs.map(rhomb => ({
    active: true,
    removed: false,
    position: rhomb.center
}));
console.log(board);
let clickHandler = function(pos) {
    handleClick(board, pegs, pos);
}
const sketch = boardSketch(board, pegs, clickHandler);
new p5(sketch);
