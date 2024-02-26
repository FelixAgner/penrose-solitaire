/**
 * Game Logic
 * 
 * This module handles the game logic, such as legal moves, board state, win/loss-conditions, removal of pegs etc.
 * 
 * @module gameLogic
 */
import { boardSize} from './config.js';

function dist(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function handleClick(board, pegs, clickPos) {
    // Check if the click is on a peg
    let clickedPeg = pegs.find(peg => dist(peg.position, clickPos) < boardSize.pegSize);

    if (clickedPeg) {
        // Check if the peg is active
        if (clickedPeg.removed) {
            clickedPeg.removed = false;
        } else {
            clickedPeg.removed = true;
        }
    }
}