import React, { useReducer } from 'react';
import Form from './components/Form/Form';
import Board from './components/Board/Board';

const initialState = {
  gridSize: [4, 4],
  isStart: false,
}

function reducer (state, action) {
  switch (action.type) {
    case 'START':
      return handleSubmit(state);
    case 'CHANGE':
      return  handleChange(action.payload, state);
    case 'NEW_GAME':
      return initialState;
    default:
      return state;
  }
}

function handleChange(event, state) {
  console.log(state);
  let gridSize = event.split(/[^0-9-]+/g, 2);

  for (let i = 0; i < gridSize.length; i++) {
    gridSize[i] = Number(gridSize[i]);
  }

  return {...state,
    gridSize: gridSize,
  }
}

function handleSubmit(state) {
  
  if (state.gridSize[0] === 0 || state.gridSize[1] === 0) {
    alert('Row or column is 0!');
    return {
      ...state
    }
  } else if ((state.gridSize[0]*state.gridSize[1])%2) {
    alert('Grid size must be an even!');
    return {
      ...state
    }
  } else {
    return {...state,
      isStart: true,
    }
  }
} 

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const newGame = () => dispatch({type: 'NEW_GAME'});

  const onInputChange = (event) => dispatch({type: 'CHANGE', payload: event.target.value});

  const onButtonSubmit = () => dispatch({type: 'START'});

  if (state.isStart) {
    return <Board newGame={newGame}  gridSize={state.gridSize} />
  } else {
    return (
      <Form
          onInputChange={onInputChange} 
          onButtonSubmit={onButtonSubmit}
      />
    )
  }
}

export default App;
