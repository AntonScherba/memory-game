import React, { Component } from 'react';
import Tile from '../Tile/Tile';
import './Board.css';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            grid: 8,
            colors: [],
            activeTiles: Array(16).fill(false),
            openedTiles: []
        }
    }

    // Fisher–Yates Shuffle
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

    handleClick(i) {
        const activeTiles = this.state.activeTiles.slice();
        let openedTiles = this.state.openedTiles.slice();
        
        openedTiles.push(i);
        activeTiles[i] = !activeTiles[i];

        this.setState({ 
            activeTiles: activeTiles,
            openedTiles: openedTiles
        });

        if(openedTiles.length === 2) {
            this.compareColors(openedTiles, activeTiles);
            this.setState({
                openedTiles: []
            })
        }
    }

    compareColors = (openedTiles, tiles) => {
        let f = openedTiles[0];
        let s = openedTiles[1];
        
        if (this.state.colors[f] !== this.state.colors[s]) {            
            setTimeout(() => {
                [tiles[f], tiles[s]] = [!tiles[f], !tiles[s]] 
                this.setState({
                    activeTiles: tiles
                })
            }, 1000)
        }
    }

    renderTile = (colors) => {
        const tile = colors.map((color, i) => {
            return <Tile key={i} color={color}  onClick={(e) => this.handleClick(i)} active={this.state.activeTiles[i]} />
        });

        return tile;
    }

    render() {
        return (
            <div className="board">
                {this.renderTile(this.state.colors)}
            </div>
        )
    }
}

export default Board;

