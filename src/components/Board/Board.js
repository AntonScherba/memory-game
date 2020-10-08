import React, { Component } from 'react';
import Tile from '../Tile/Tile';
import {shuffleColors} from '../function'
import {colorsGenerator} from '../function'
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesOnTheBoard: [],
            isOpenedTilesNow: []
        }
    }    

    tilesGenerator = (colors) => {
        let tilesOnTheBoard = [];

        for (let i = 0; i < colors.length; i++) {
            let tile = {
                color: colors[i],
                isOpened: false
            };
            tilesOnTheBoard.push(tile);
        }

        return tilesOnTheBoard;
    }

    init = () => {
        // generate colors array for tiles
        let colors = colorsGenerator(this.props.gridSize);
        // duplicate colors array 
        colors = colors.concat(colors);
        // generate tiles array 
        let tilesOnTheBoard = this.tilesGenerator(colors);
        // shuffle tiles
        tilesOnTheBoard = shuffleColors(tilesOnTheBoard);

        this.setState({tilesOnTheBoard: tilesOnTheBoard});
    }

    componentDidMount() {
        this.init();
    }

    handleClick(i) { 
        const tilesOnTheBoard = this.state.tilesOnTheBoard.slice();
        let isOpenedTilesNow = this.state.isOpenedTilesNow.slice();

        if (isOpenedTilesNow.length === 2) {
            return;
        }

        tilesOnTheBoard[i].isOpened = true;
        isOpenedTilesNow.push(i);
        
        this.setState({
            tilesOnTheBoard: tilesOnTheBoard,
            isOpenedTilesNow: isOpenedTilesNow
        })

        if (isOpenedTilesNow.length === 2) {
            this.compareTiles(tilesOnTheBoard, isOpenedTilesNow);            
        }

    }

    compareTiles = (tilesOnTheBoard, openedTilesIndex) => {
        let [firstTileIndex, secondTileIndex] = openedTilesIndex;

        if (tilesOnTheBoard[firstTileIndex].color !== tilesOnTheBoard[secondTileIndex].color) {            
            setTimeout(() => {
                [tilesOnTheBoard[firstTileIndex].isOpened, tilesOnTheBoard[secondTileIndex].isOpened] = [false, false] 
                this.setState({
                    tilesOnTheBoard: tilesOnTheBoard,
                    isOpenedTilesNow: []
                })
            }, 500)
        } else {
            this.setState({
                isOpenedTilesNow: []
            })
        }
    }

    renderTile = (tilesOnTheBoard) => {
        const tile = tilesOnTheBoard.map((tile, i) => {
                return <Tile
                    key={i} 
                    color={tile.color}  
                    onClick={() => this.handleClick(i)} 
                    isOpened={this.state.tilesOnTheBoard[i].isOpened} 
                />
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

