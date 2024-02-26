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
export function boardSketch(board, pegs, clickHandler) {

    return (p) => {
        p.setup = function() {
            p.createCanvas(boardSize.width, boardSize.height);
        };
        p.draw = function() {
            p.background(colors.background);
            
            // draw all the rhombs in board
            board.rhombs.forEach(rhombus => {
                drawRhombus(p, rhombus);
            });
                
            // draw all the moves on the board
            board.moves.forEach(move => {
                drawMove(p, move);
            });

            // draw all the pegs in pegs
            pegs.forEach(peg => {
                drawPeg(p, peg);
            });
        };

        p.mouseClicked = function() {
            // Check if the mouse is over a peg
            let mousePos = {
                x: p.mouseX,
                y: p.mouseY
            };
            clickHandler(mousePos);
        };
        
    };
};

function drawPeg(p, peg) {
    if (peg.removed) {
        p.fill(colors.pegHole);
    } else if (peg.active) {
        p.fill(colors.pegFill);
    } else {
        p.fill(colors.pegSelected);
    }
    p.stroke(colors.pegLine);
    p.ellipse(peg.position.x, peg.position.y, 20, 20);
}

function drawRhombus(p, rhombus) {
    p.stroke(colors.rhombusLine);
    p.fill(colors.rhombus); 
    p.beginShape();
    rhombus.corners.forEach(coord => {
        p.vertex(coord.x, coord.y);
    });
    p.endShape(p.CLOSE); // Use p.CLOSE to close the shape
}

function drawMove(p, move) {
    p.stroke(colors.moveLine);
    // start a quadratic curve for the first part of the move.
    p.noFill()
    p.beginShape();
    p.vertex(
        move.point_1.x,
        move.point_1.y
        );
    p.quadraticVertex(
        move.point_2.x,
        move.point_2.y,
        move.point_3.x,
        move.point_3.y
        );
    p.endShape();
}