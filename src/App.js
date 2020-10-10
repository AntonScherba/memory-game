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
    if (this.state.gridSize[0] === 0 || this.state.gridSize[1] === 0) {
      alert('Row or column is 0!');
    } else if ((this.state.gridSize[0]*this.state.gridSize[1])%2) {
      alert('Grid size must be an even!');
    } else {
      this.setState({
        isStart: true,
      })
    }
  }  

  init = () => {
    this.setState({
      gridSize: [4, 4],
      isStart: false,
    })
  }

  render() {
    if (this.state.isStart) {
      return <Board init={this.init} gridSize={this.state.gridSize} />
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
