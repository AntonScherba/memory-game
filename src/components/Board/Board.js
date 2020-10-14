import React, { useContext } from 'react';
import Tile from '../Tile/Tile';
import NewGameButton from '../NewGameButton/NewGameButton';
import { Context } from '../../context';
import './Board.css';

const Board = ({ column, row, tilesOnTheBoard, pairOpenedTiles, pairCounter }) => {
    const dispatch = useContext(Context);
    
    const onTileClick = (i) => {
        // Deep copy tilesOnTheBoard and pairOpenedTiles arrays
        const tiles = JSON.parse(JSON.stringify(tilesOnTheBoard));
        let pairOpenedTilesCopy = JSON.parse(JSON.stringify(pairOpenedTiles));

        if (pairOpenedTilesCopy.length === 2) {
            return;
        }

        tiles[i].isOpened = true;
        pairOpenedTilesCopy.push(i);

        dispatch({type: 'IS_OPENED', payload: {tiles: tiles, pairOpenedTiles: pairOpenedTilesCopy}})

        if (pairOpenedTilesCopy.length === 2) {
            compareTiles(pairOpenedTilesCopy, tiles);
        }
    }

    const compareTiles = (openedTiles, tiles) => {
        let [firstTile, secondTile] = [tiles[openedTiles[0]], tiles[openedTiles[1]]];

        if (firstTile.color === secondTile.color) {
            dispatch({type: 'INCREASE_PAIR_COUNTER'})
            dispatch({type: 'RESET_PAIR_OPENED_TILES'})
        } else {
            setTimeout(() => {
                [firstTile.isOpened, secondTile.isOpened] = [false, false];
                dispatch({type: 'RESET_PAIR_OPENED_TILES'})
            }, 500)
        }
    }

    if (pairCounter < tilesOnTheBoard.length/2) {
        return (
            <div>
                <NewGameButton />
                <div 
                    style={{
                        gridTemplateColumns: `repeat(${column}, auto)`, 
                        gridTemplateRows: `repeat(${row}, auto)`
                    }} 
                    className="board"
                >
                {tilesOnTheBoard.map((tile, i) => {
                    return <Tile key={i} color={tile.color} isOpened={tile.isOpened} onClick={() => onTileClick(i)} />
                })}
                </div>
            </div>
        )
    } else {
        return (
            <div className="show" >
                <h1>Congratulations!</h1>
                <NewGameButton />
            </div>    
        )
    }

}

export default Board;

