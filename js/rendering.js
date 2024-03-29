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
import { boardSize, colors } from './config.js';

// Define a sketch function
export function boardSketch(game, container) {

    return (p) => {
        p.setup = function() {
            
            let maxWidth = container.offsetWidth;
            maxWidth = Math.min(maxWidth, boardSize.width);
            let canvas = p.createCanvas(maxWidth, maxWidth);
            canvas.parent(container);
            canvas.id("boardCanvas")
        };
        p.draw = function() {
            p.background(colors.background);
            
            // draw all the rhombs in board
            game.rhombs.forEach(rhombus => {
                drawRhombus(p, rhombus);
            });

            // draw all the moves on the board
            game.moves.forEach(move => {
                drawMove(p, move);
            });

            // draw all the pegs in pegs
            game.pegs.forEach(peg => {
                drawPeg(p, peg, game.size);
            });
            
            // draw the active peg on top of everything else
            drawActivePeg(p, game);

            if (!game.firstRemoved) {
                drawRemoveFirst(p, game);
            }

            // draw the score on top right corner
            drawScore(p, game);

            // draw the win message
            if (game.isWon) {
                drawWinMessage(p);
            }
        };

        p.mouseClicked = function() {
            let mousePos = {
                x: p.mouseX / p.width,
                y: p.mouseY / p.width
            };
            game.handleClick(mousePos);
        };

        p.touchStarted = function() {
            let mousePos = {
                x: p.mouseX / p.width,
                y: p.mouseY / p.width
            };
            game.handleClick(mousePos);
            return false;
        };
        
    };
};

function drawRemoveFirst(p, game) {
    // Draw a message at the bottom center of the screen
    p.fill(255);
    p.textSize(32 * p.width / boardSize.width);
    p.text('Remove a peg to start', p.width * 0.3, p.width * 0.95);
}

function drawWinMessage(p) {
    p.fill(255);
    p.textSize(128 * p.width / boardSize.width);
    p.text('You Win!', p.width * 0.375, p.width / 2);
}

function drawScore(p, game) {
    // write game.score() on top right corner
    p.fill(255);
    p.textSize(32 * p.width / boardSize.width);
    p.text('Score: ' + game.score(), p.width * 0.77, p.width * 0.08);
}

function drawActivePeg(p, game) {
    if (game.activePeg) {
        p.fill(colors.pegSelected);
        p.stroke(colors.pegLine);
        p.ellipse(
            game.activePeg.position.x * p.width, 
            game.activePeg.position.y * p.width, 
            boardSize.pegSize[game.size] * p.width, 
            boardSize.pegSize[game.size] * p.width);
    }
}

function drawPeg(p, peg, size) {
    if (peg.removed) {
        p.fill(colors.pegHole);
    } else {
        p.fill(colors.pegFill);
    }
    p.stroke(colors.pegLine);
    p.ellipse(
        peg.position.x * p.width, 
        peg.position.y * p.width, 
        boardSize.pegSize[size] * p.width, 
        boardSize.pegSize[size] * p.width
        );
}

function drawRhombus(p, rhombus) {
    p.stroke(colors.rhombusLine);
    p.fill(colors.rhombus); 
    p.beginShape();
    rhombus.corners.forEach(coord => {
        p.vertex(
            coord.x * p.width, 
            coord.y * p.width
            );
    });
    p.endShape(p.CLOSE); // Use p.CLOSE to close the shape
}

function drawMove(p, move) {
    p.stroke(colors.moveLine);
    // start a quadratic curve for the first part of the move.
    p.noFill()
    p.beginShape();
    p.vertex(
        move.point_1.x * p.width,
        move.point_1.y * p.width
        );
    p.quadraticVertex(
        move.point_2.x * p.width,
        move.point_2.y * p.width,
        move.point_3.x * p.width,
        move.point_3.y * p.width
        );
    p.endShape();
}