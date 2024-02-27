/**
 * Game Logic
 * 
 * This module handles the game logic, such as legal moves, board state, win/loss-conditions, removal of pegs etc.
 * 
 * @module gameLogic
 */
import { boardSize} from './config.js';
import { dist } from './utils.js';
import { loadBoard } from './boardManager.js';

export function Game() {
    this.size = "small"
    loadGame(this, this.size)
    this.reset = function() {
        loadGame(this, this.size);
    }
    this.changeBoardSize = function(size) {
        if (this.size != size) {
            this.size = size;
            loadGame(this, size);
        }
    }
    this.handleClick = function(clickPos) {
        handleClick(this, clickPos);
    }
    this.canUndo = function() {
        return this.moveHistory.length > 0;
    }
    this.undo = function() {
        undo(this);
    }
    this.activatePeg = function(peg) {
        this.activePeg = peg;
    }
    this.score = function() {
        // length of move history equates number of removed pegs
        return this.moveHistory.length;
    }

}

function loadGame(game, size) {
    let board = loadBoard(size);
    game.rhombs = board.rhombs;
    game.moves = board.moves;
    // Add one peg for each rhombus, with index 0, ... 
    game.pegs = board.rhombs.map((rhombus, index) => {
        return {
            position: rhombus.center,
            index: index,
            removed: false,
            active: false
        }
    });
    game.activePeg = null;
    game.moveHistory = [];
    game.firstRemoved = false;
}

/**
 * Handles the click event on the game board.
 * 
 * @param {Game} game - The current game state
 * @param {Object} clickPos - The position of the click event
 */
function handleClick(game, clickPos) {
    // Check if the click is on a peg
    let peg = game.pegs.find(peg => dist(peg.position, clickPos) < boardSize.pegSize);
    if (peg) {
        // Check if there is an active peg
        if (!game.firstRemoved) {
            peg.removed = true;
            game.firstRemoved = true;
        } else if (game.activePeg) {
            let legalMove = game.moves.find(move => isLegalMove(game, move, peg));
            if (legalMove) {
                // make the move
                makeMove(game, legalMove);
            } else if (!peg.removed) {
                // select the peg
                game.activatePeg(peg);
            }
        } else if (!peg.removed){
            // select the peg
            game.activatePeg(peg);
        }
    } else {
        // no peg was clicked, deselect the active peg
        if (game.activePeg) {
            game.activatePeg(null);
        }
    }
}

function isLegalMove(game, move, targetPeg) {
    return move.jump_from === game.activePeg.index && game.pegs[move.jump_over].removed === false && game.pegs[move.jump_to].removed === true && targetPeg.index === move.jump_to;
}

function undo(game) {
    let lastMove = game.moveHistory.pop();
    game.pegs[lastMove.jump_from].removed = false;
    game.pegs[lastMove.jump_over].removed = false;
    game.pegs[lastMove.jump_to].removed = true;
    game.activePeg = null;
}

function makeMove(game, move) {
    game.pegs[move.jump_from].removed = true;
    game.pegs[move.jump_over].removed = true;
    game.pegs[move.jump_to].removed = false;
    game.activePeg = null;
    game.moveHistory.push(move); 
}