import { boardSketch } from './rendering.js';
import { Game } from './gameLogic.js';




document.addEventListener("DOMContentLoaded", () => {
    const canvasContainer = document.getElementById('canvas-container');
    // Instantiate the sketch
    let game = new Game();
    const sketch = boardSketch(game, canvasContainer);
    new p5(sketch);

    // Event listeners for buttons
    document.getElementById('small').addEventListener('click', () => game.changeBoardSize('small'));
    document.getElementById('medium').addEventListener('click', () => game.changeBoardSize('medium'));
    document.getElementById('large').addEventListener('click', () => game.changeBoardSize('large'));
    document.getElementById('reset').addEventListener('click', () => game.reset());
    document.getElementById('undo').addEventListener('click', () => game.undo());
});