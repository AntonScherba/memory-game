import React, { useContext } from 'react';
import Tile from '../Tile/Tile';
import { Context } from '../../context'

import './Board.css';

const Board = ({state}) => {
    const dispatch = useContext(Context);
    
    const onClick = (i) => {
        const tiles = JSON.parse(JSON.stringify(state.tilesOnTheBoard));
        let pairOpenedTiles = JSON.parse(JSON.stringify(state.pairOpenedTiles));

        console.log('board: ', pairOpenedTiles)
        if (pairOpenedTiles.length === 2) {
            return;
        }

        tiles[i].isOpened = true;
        pairOpenedTiles.push(i);

        dispatch({type: 'IS_OPENED', payload: {tiles, pairOpenedTiles}})

        if (pairOpenedTiles.length === 2) {
            compareTiles(pairOpenedTiles, tiles);
        }
    }

    const compareTiles = (pairOpenedTiles, tiles) => {
        let [firstTile, secondTile] = [tiles[pairOpenedTiles[0]], tiles[pairOpenedTiles[1]]];

        if (firstTile.color === secondTile.color) {
            dispatch({type: 'COMPARE_TRUE'})
        } else {
            setTimeout(() => {
                [firstTile.isOpened, secondTile.isOpened] = [false, false];
                dispatch({type: 'COMPARE_FALSE'})
            }, 500)
        }
    }

    if (state.pairCounter < state.tilesOnTheBoard.length/2) {
        return (
            <div>
                <button className="btn-new-game" onClick={() => dispatch({type: 'NEW_GAME'})}>New Game</button>
                <div 
                    style={{
                        gridTemplateColumns: `repeat(${state.column}, auto)`, 
                        gridTemplateRows: `repeat(${state.row}, auto)`
                    }} 
                    className="board"
                >
                {state.tilesOnTheBoard.map((tile, i) => {
                   return <Tile key={i} color={tile.color} isOpened={tile.isOpened} onClick={() => onClick(i)} />
                })}
                </div>
            </div>
        )
    } else {
        return (
            <div className="show" >
                <h1>Congratulations!</h1>
                <button className="btn-new-game" onClick={() => dispatch({type: 'NEW_GAME'})}>New Game</button>
            </div>    
        ) 
    }

}

export default Board;

