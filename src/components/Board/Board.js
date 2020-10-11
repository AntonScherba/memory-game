import React, { useReducer } from 'react';
import Tile from '../Tile/Tile';
import {shuffleColors} from '../functions'
import {colorsGenerator} from '../functions'
import './Board.css';

const init = (gridSize) => {
    // generate colors array for tiles
    let colors = colorsGenerator(gridSize);
    // duplicate colors array 
    colors = colors.concat(colors);
    // generate tiles array 
    let tilesOnTheBoard = tilesGenerator(colors);
    // shuffle tiles
    tilesOnTheBoard = shuffleColors(tilesOnTheBoard);

    return {
        tilesOnTheBoard: tilesOnTheBoard,
        isOpenedTilesNow: [],
        counterPair: 0,
    } 
}

const tilesGenerator = (colors) => {
    let tilesOnTheBoard = [];

    for (let i = 0; i < colors.length; i++) {
        let tile = {
            color: colors[i],
            isOpened: false
        };
        tilesOnTheBoard.push(tile);
    }

    return tilesOnTheBoard;
}

function reducer (state, action) {
    switch (action.type) {
        case 'SELECT_TILE':
        return handleClick(action.payload, state);
        default:
        break;
    }
}

const handleClick = (i, state) => { 
    
    let tilesOnTheBoard = state.tilesOnTheBoard.slice();
    let isOpenedTilesNow = state.isOpenedTilesNow.slice();
   
    if (isOpenedTilesNow.length === 2) {
        console.log('two clock: ', state)
        return state;
    }
    console.log('every clisk: ', state)
    tilesOnTheBoard[i].isOpened = true;
    isOpenedTilesNow.push(tilesOnTheBoard[i]);
    
    // if (isOpenedTilesNow.length === 2) {
    //     compareTiles(isOpenedTilesNow); 
    // }

    if (isOpenedTilesNow.length === 2) {
        let [firstTile, secondTile] = isOpenedTilesNow;
    
        if (firstTile.color === secondTile.color) {
            return {
                ...state,
                isOpenedTilesNow: [],
                counterPair: state.counterPair+1,
            }
        } else {
            setTimeout(() => {
                [firstTile.isOpened, secondTile.isOpened] = [false, false]
                return {
                    ...state,
                    isOpenedTilesNow: []
                } 
            }, 500)
        }
    }

    return {
        ...state,
        tilesOnTheBoard: tilesOnTheBoard,
        isOpenedTilesNow: isOpenedTilesNow
    }

    
}

// const compareTiles = (openedTilesIndex) => {
//     let [firstTile, secondTile] = openedTilesIndex;
    
//     if (firstTile.color === secondTile.color) {
//         return {
//             ...state,
//             isOpenedTilesNow: [],
//             counterPair: this.state.counterPair+1,
//         }
//     } else {
//         setTimeout(() => {
//             [firstTile.isOpened, secondTile.isOpened] = [false, false]
//             return {
//                 ...state,
//                 isOpenedTilesNow: []
//             } 
//         }, 500)
//     }
// }

const Board = ({gridSize, newGame}) => {
    const [state, dispatch] = useReducer(reducer, gridSize, init);
    console.log('board: ', state);
    return (
        <div>
            <button className="btn-new-game" onClick={newGame} >New Game</button>
        <div 
            style={{
                gridTemplateColumns: `repeat(${gridSize[0]}, auto)`, 
                gridTemplateRows: `repeat(${gridSize[1]}, auto)`
            }} 
            className="board"
        >{
            state.tilesOnTheBoard.map((tile, i) => {
            return <Tile
                key={i} 
                color={tile.color}  
                onClick={() => dispatch({type: 'SELECT_TILE', payload: i})} 
                isOpened={tile.isOpened} 
            />
        })}
        </div>
        </div>
    )
}

export default Board;

