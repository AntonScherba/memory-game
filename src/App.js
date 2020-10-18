import React, { useReducer } from "react";
import Form from "./components/Form/Form";
import Board from "./components/Board/Board";
import { Context } from "./context";
import reducer, { initialState } from "./reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    column,
    row,
    tilesOnBoard,
    pairOpenedTiles,
    isStart,
    isGameOver,
  } = state;

  if (isStart) {
    return (
      <Context.Provider value={dispatch}>
        <Board
          column={column}
          row={row}
          tilesOnBoard={tilesOnBoard}
          pairOpenedTiles={pairOpenedTiles}
          isGameOver={isGameOver}
        />
      </Context.Provider>
    );
  } else {
    return (
      <Context.Provider value={dispatch}>
        <Form column={column} row={row} />
      </Context.Provider>
    );
  }
};

export default App;
