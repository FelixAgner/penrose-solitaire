/**
 * Renderer Module
 * 
 * This module provides the rendering functionality for the game, drawing game objects
 * and UI elements to the screen using the HTML5 Canvas API.
 * 
 * @module renderer
 */


// Import p5.js as a module
import p5 from 'https://cdn.skypack.dev/p5';

const boardSize = {
    width: 800,
    height: 800,
    scaleFactor: 0.1
}

const colors = {
    rhombus: 'rgba(50, 50, 150, 0.5)',
    background: 'rgba(150, 150, 255, 0.1)'
}

// Define a sketch function
export function boardSketch(gameboard) {
    let diameter = 100;
    let board = gameboard;
    let size = {
        x: boardSize.width,
        y: boardSize.height
    }
    return (p) => {
        p.setup = function() {
            p.createCanvas(size.x, size.y);
        
          p.draw = function() {
            p.background(colors.background);
            // draw all the rhombs in board
            board.rhombs.forEach(rhomb => {
                drawRhombus(p, rhomb);
            });
          };
        }
    }
};

function scaleRhomb(rhomb) {
    let f = (i, j) => ({
        x: boardSize.width * (1/2 + i * boardSize.scaleFactor), 
        y: boardSize.height * (1/2 + j * boardSize.scaleFactor), 
    });
    return [ 
        f(rhomb.x_1, rhomb.y_1), 
        f(rhomb.x_2, rhomb.y_2), 
        f(rhomb.x_3, rhomb.y_3), 
        f(rhomb.x_4, rhomb.y_4)
    ];
}

function drawRhombus(p, rhomb) {
    // draw a rhombus using x1, y1, x2, y2, x3, y3, x4, y4   
    let coords = scaleRhomb(rhomb);
    p.fill(colors.rhombus); // Example: semi-transparent red
    p.beginShape();
    coords.forEach(coord => {
        p.vertex(coord.x, coord.y);
    });
    p.endShape(p.CLOSE); // Use p.CLOSE to close the shape
}