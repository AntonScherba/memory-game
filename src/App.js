import React, { useReducer, useEffect } from 'react';
import Form from './components/Form/Form';
import Board from './components/Board/Board';
import { shuffleColors, colorsGenerator } from './functions';
import { Context } from './context';

import reducer from './reducer';

const initialState = {
  column: 4,
  row: 4,
  isStart: false,
  tilesOnTheBoard: [],
  pairOpenedTiles: [],
  pairCounter: 0,
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state)
  useEffect(() => {
    dispatch({type: 'INIT_TILES', payload: init(state.column, state.row)})
  }, [state.column, state.row])

  const tilesGenerator = (colors) => {
      let tilesOnTheBoard = [];
      for (let i = 0; i < colors.length; i++) {
          tilesOnTheBoard.push({color: colors[i], isOpened: false});
      }
      return tilesOnTheBoard;
  }

  const init = (column, row) => {
      // generate colors array for tiles
      let colors = colorsGenerator(column, row);
      // duplicate colors array 
      colors = colors.concat(colors);
      // generate tiles array 
      let tilesOnTheBoard = tilesGenerator(colors);
      // shuffle tiles
      tilesOnTheBoard = shuffleColors(tilesOnTheBoard);
      return tilesOnTheBoard;
  }

  if (state.isStart) {
    return (
      <Context.Provider value={dispatch}>
        <Board state={state} />
      </Context.Provider>
    )
  } else {
    return (
      <Context.Provider value={dispatch}>
        <Form column={state.column} row={state.row} />
      </Context.Provider>
    )
  }
}

export default App;
