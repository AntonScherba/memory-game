import React, { Component } from 'react';
import Board from './components/Board/Board';

class App extends Component {
  constructor() {
    super();
    this.state = {
      grid: 8,
      colors: [],
    }
  }

  // Fisher–Yates Shuffle Function
  shuffleColors = (colors) => {
    for (let i = colors.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
  }

  // Generator Random Number for Hue Color
  generateColors = (numberOfColors) => {
    let colorsArray = [];
    for (let index = 0; index < numberOfColors; index++) {
      const hueColor = index * 360/numberOfColors;
      colorsArray.push(hueColor);
    }
    // duplicate colors 
    colorsArray = colorsArray.concat(colorsArray);
    this.shuffleColors(colorsArray);

    this.setState({colors: colorsArray});
  }

  componentDidMount() {
    this.generateColors(this.state.grid);
  }

  onTileClick = (color) => {
    
    console.log(color);
  }

  render() {
    return <Board onClick={this.onTileClick} colors={this.state.colors} />;
  }
}

export default App;
