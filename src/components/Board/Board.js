import React, { useContext } from 'react';
import Tile from '../Tile/Tile';
import { Context } from '../../context'

import './Board.css';

const Board = ({tiles, column, row}) => {
    const dispatch = useContext(Context);
    
       

    return (
        <div>
            <button className="btn-new-game" onClick={() => dispatch({type: 'NEW_GAME'})}>New Game</button>
            <div 
                style={{
                    gridTemplateColumns: `repeat(${column}, auto)`, 
                    gridTemplateRows: `repeat(${row}, auto)`
                }} 
                className="board"
            >
            {tiles.map((tile, i) => {
               return <Tile key={i} color={tile.color} isOpened={tile.isOpened} />
            })}
            </div>
        </div>
    )
}

export default Board;

