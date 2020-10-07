import React, { Component } from 'react';
import Tile from '../Tile/Tile';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesOnTheBoard: []
        }
    }

    // Fisher–Yates Shuffle
    shuffleColors = (colors) => {
        for (let i = colors.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [colors[i], colors[j]] = [colors[j], colors[i]];
        }
        return colors;
    }

    colorsGenerator = (gridSize) => {
        const numberOfColors = (gridSize[0]*gridSize[1])/2;
        let colors = [];

        for (let i = 0; i < numberOfColors; i++) {
            const hueColor = i * 360/numberOfColors;
            colors.push(hueColor);
        }
        // return duplicate colors     
        return colors.concat(colors); 
    }

    tilesGenerator = (gridSize) => {
        let [row, column] = gridSize;
        let tilesOnTheBoard = [];
        
        for (let i = 0; i < row; i++) {
            let tilesOnTheRow = [];
            for (let j = 0; j < column; j++) {
                let tile = {
                    color: 0,
                    isOpened:false
                };
                tilesOnTheRow.push(tile);
            }
            tilesOnTheBoard.push(tilesOnTheRow);
        }
        return tilesOnTheBoard;
    }

    init = () => {
        const tilesOnTheBoard = this.tilesGenerator(this.props.gridSize);
        this.setState({tilesOnTheBoard: tilesOnTheBoard});
    }

    componentDidMount() {
        this.init();
    }

    handleClick(i, j) { 
        const tilesOnTheBoard = this.state.tilesOnTheBoard.slice();
        tilesOnTheBoard[i][j].isOpened = !tilesOnTheBoard[i][j].isOpened;
        
        this.setState({
            tilesOnTheBoard: tilesOnTheBoard
        })
        
    }

    compareColors = (openedTiles, activeTiles) => {
        let [f, s] = openedTiles;
        
        if (this.state.colors[f] !== this.state.colors[s]) {            
            setTimeout(() => {
                [activeTiles[f], activeTiles[s]] = [!activeTiles[f], !activeTiles[s]] 
                this.setState({ activeTiles: activeTiles })
            }, 1000)
        }
    }

    renderTile = (tilesOnTheBoard) => {
        const tile = tilesOnTheBoard.map((tilesOnTheRow, i) => {
            return tilesOnTheRow.map((tile, j) => {
                return <Tile
                    key={j} 
                    color={tile.color}  
                    onClick={() => this.handleClick(i, j)} 
                    isOpened={this.state.tilesOnTheBoard[i][j].isOpened} 
                />
            }, i)
        })
        return tile;
    }

    render() {
        return (
            <div 
                style={{
                    gridTemplateColumns: `repeat(${this.props.gridSize[0]}, auto)`, 
                    gridTemplateRows: `repeat(${this.props.gridSize[1]}, auto)`
                }} 
                className="board" >{this.renderTile(this.state.tilesOnTheBoard)}
            </div>
        )
    }
}

export default Board;

