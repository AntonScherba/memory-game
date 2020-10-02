import React, { Component } from 'react';
import Board from './components/Board/Board';

class App extends Component {
  constructor() {
    super();
    this.state = {
      defaultGrid: 8,
      colors: [],
    }
  }

  generateColors = (numberOfColors) => {
    let colArr = [];
    for (let index = 0; index < numberOfColors; index++) {
      const hueColor = Math.floor(Math.random() * numberOfColors) * 360/numberOfColors;
      colArr.push(`hsl(${hueColor}, 90%, 60%)`);
    }
    this.setState({colors: colArr});
  }

  componentDidMount() {
    this.generateColors(this.state.defaultGrid);
  }

  render() {
    return <Board colors={this.state.colors} />;
  }
}

export default App;
