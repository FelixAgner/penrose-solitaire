/**
 * Board Manager
 * 
 * This module loads and jsonifys the boards from the assets folder through the exported loadBoard function.
 * 
 * @module boardManager
 */
import { boardSize } from './config.js';
import { smallRhombs, smallMoves, mediumRhombs, mediumMoves, largeRhombs, largeMoves} from '../assets/boardData.js';


function parseCsv(csv) {
    let lines = csv.split('\n');
    let result = [];
    let headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

function scaleRhombus(rhombus) {
    return {
        corners : rhombus.corners.map(corner => ({
            x: 1/2 + corner.x * boardSize.scaleFactor,
            y: 1/2 + corner.y * boardSize.scaleFactor
        })),
        center: {
            x: 1/2 + rhombus.center.x * boardSize.scaleFactor,
            y: 1/2 + rhombus.center.y * boardSize.scaleFactor
        }
    }
}

function cleanRhombus(rhombus) {
    let mx = (rhombus.x_1 / 4 + rhombus.x_2 / 4 + rhombus.x_3 / 4 + rhombus.x_4 / 4);
    let my = (rhombus.y_1 / 4 + rhombus.y_2 / 4 + rhombus.y_3 / 4 + rhombus.y_4 / 4);
    return {
        corners: [
            {x: rhombus.x_1, y: rhombus.y_1},
            {x: rhombus.x_2, y: rhombus.y_2},
            {x: rhombus.x_3, y: rhombus.y_3},
            {x: rhombus.x_4, y: rhombus.y_4},
        ],
        center: {
            x: mx,
            y: my
        }
    }
}

function findMidpoint(r1, r2) {
    // find shared corners between r1 and r2
    let sharedCorners = [];
    r1.corners.forEach(c1 => {
        r2.corners.forEach(c2 => {
            if ( Math.abs(c1.x - c2.x) < 0.01 && Math.abs(c1.y - c2.y) < 0.01) {
                sharedCorners.push(c1);
            }
        });
    });
    if (sharedCorners.length !== 2) {
        throw new Error("Couldn't find shared corners between rhombus");
    }
    return {
        x: (sharedCorners[0].x + sharedCorners[1].x) / 2,
        y: (sharedCorners[0].y + sharedCorners[1].y) / 2
    }

}

function cleanMove(move, rhombs) {    
    return {
        jump_from: parseInt(move.jump_from),
        jump_over: parseInt(move.jump_over),
        jump_to: parseInt(move.jump_to),
        point_1: rhombs[move.jump_from].center,
        point_2: findMidpoint(rhombs[move.jump_from], rhombs[move.jump_over]),
        point_3: rhombs[move.jump_over].center,
        point_4: findMidpoint(rhombs[move.jump_over], rhombs[move.jump_to]),
        point_5: rhombs[move.jump_to].center
    }
}

export function loadBoard(size) {
    let rhombData;
    let moveData;
    if (size == "small") {
        rhombData = smallRhombs;
        moveData = smallMoves;
    } else if (size == "medium") {
        rhombData = mediumRhombs;
        moveData = mediumMoves;
    } else if (size == "large") {
        rhombData = largeRhombs;
        moveData = largeMoves;
    } else {
        throw new Error("Invalid board size");
    }
    let rhombs = parseCsv(rhombData).map(cleanRhombus).map(scaleRhombus);
    let moves = parseCsv(moveData).map(move => cleanMove(move, rhombs));
    return {
        rhombs: rhombs,
        moves: moves
    };
}