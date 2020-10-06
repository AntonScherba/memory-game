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
    shuffleColors = (tiles) => {
        for (let i = tiles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    }

    generateTiles= (gridSize) => {
        let tilesOnTheBoard = [];
        
        for (let i = 0; i < gridSize[0]; i++) {
            let tilesOnTheRow = [];
            for (let j = 0; j < gridSize[1]; j++) {
                const hueColor = j * 360/8;
                let tile = {
                    color: hueColor,
                    isOpened:false
                };
                tilesOnTheRow.push(tile)
            }
            tilesOnTheBoard.push(tilesOnTheRow);
        }
        this.setState({tilesOnTheBoard: tilesOnTheBoard}, () => {
            // console.log('generate:', this.state.tilesOnTheBoard);
        });
    }

    componentDidMount() {
        this.generateTiles(this.props.gridSize);
    }

    handleClick(i, j) { 
        
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
            // console.log(i)
            return tilesOnTheRow.map((tile, j) => {
                return <Tile key={j} color={tile.color}  onClick={() => this.handleClick(i, j)} isOpened={this.state.tilesOnTheBoard[i][j].isOpened} />
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

