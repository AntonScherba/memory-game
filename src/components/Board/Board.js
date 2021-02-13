import React, { useContext } from "react";
import Tile from "../Tile/Tile";
import NewGameButton from "../NewGameButton/NewGameButton";
import { Context } from "../../context";
import "./Board.css";

const Board = ({
  column,
  row,
  tilesOnTheBoard,
  pairOpenedTiles,
  isGameOver,
}) => {

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

    dispatch({
      type: "IS_OPENED",
      payload: { tiles: tiles, pairOpenedTiles: pairOpenedTilesCopy },
    });

    // Deep copy tilesOnTheBoard and pairOpenedTiles arrays
    const tC = JSON.parse(JSON.stringify(tilesOnTheBoard));
    let pC = JSON.parse(JSON.stringify(pairOpenedTiles));

    if (pairOpenedTilesCopy.length === 2) {
      compareTiles(pC, tC);
    }
  };

  const compareTiles = (openedTiles, tiles) => {
    console.log(openedTiles, tiles);
    let [firstTile, secondTile] = [
      tiles[openedTiles[0]],
      tiles[openedTiles[1]],
    ];

    if (firstTile.color === secondTile.color) {
      [firstTile.isHidden, secondTile.isHidden] = [true, true];
      dispatch({ type: "INCREASE_PAIR_COUNTER" });
      dispatch({ type: "RESET_PAIR_OPENED_TILES" });
      dispatch({ type: "CHECK_GAME_OVER" });
    } else {
      setTimeout(() => {
        [firstTile.isOpened, secondTile.isOpened] = [false, false];
        dispatch({ type: "RESET_PAIR_OPENED_TILES" });
      }, 500);
    }
  };

  if (isGameOver) {
    return (
      <div className="show">
        <h1>Congratulations!</h1>
        <NewGameButton />
      </div>
    );
  } else {
    return (
      <div>
        <NewGameButton />
        <div className="board">
          {tilesOnTheBoard.map((tile, i) => {
            return (
              <Tile
                key={i}
                color={tile.color}
                isOpened={tile.isOpened}
                onClick={() => onTileClick(i)}
                column={column}
                row={row}
                isHidden={tile.isHidden}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default Board;
