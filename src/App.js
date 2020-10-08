import React, { Component } from 'react';
import Form from './components/Form/Form';
import Board from './components/Board/Board';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gridSize: [4, 4],
      isStart: false,
    }
  }

  handleChange = (event) => {
    let gridSize = event.target.value.split(/[^0-9-]+/g, 2);

    for (let i = 0; i < gridSize.length; i++) {
      gridSize[i] = Number(gridSize[i]);
    }
    
    this.setState({
      gridSize: gridSize,
    })
  }
  
  handleSubmit = () => {

    if ((this.state.gridSize[0]*this.state.gridSize[1])%2) {
      console.log('grid size must be an even!')
    } else {
      this.setState({
        isStart: true,
      })
    }
  }  

  render() {

    if (this.state.isStart) {
      return <Board gridSize={this.state.gridSize} />
    } else {
      return (
        <Form 
            onInputChange={this.handleChange} 
            onButtonSubmit={this.handleSubmit}
        />
      )
    }
  }
}

export default App;
