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
            isOpenedTilesNow: [],
            counterPair: 0,
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
        let tilesOnTheBoard = this.state.tilesOnTheBoard.slice();
        let isOpenedTilesNow = this.state.isOpenedTilesNow.slice();

        if (isOpenedTilesNow.length === 2) {
            return;
        }

        tilesOnTheBoard[i].isOpened = true;
        isOpenedTilesNow.push(tilesOnTheBoard[i]);

        this.setState({
            tilesOnTheBoard: tilesOnTheBoard,
            isOpenedTilesNow: isOpenedTilesNow
        })

        if (isOpenedTilesNow.length === 2) {
            this.compareTiles(isOpenedTilesNow); 
        }
    }

    compareTiles = (openedTilesIndex) => {
        let [firstTile, secondTile] = openedTilesIndex;
        
        if (firstTile.color === secondTile.color) {
            this.setState({
                isOpenedTilesNow: [],
                counterPair: this.state.counterPair+1,
            });
        } else {
            setTimeout(() => {
                [firstTile.isOpened, secondTile.isOpened] = [false, false] 
                this.setState({
                    isOpenedTilesNow: []
                })
            }, 500)
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
        const counterPair = this.state.counterPair;
        const tilePair = this.state.tilesOnTheBoard.length/2;
        if (tilePair > counterPair) {
            return (
                <div>
                    <button className="btn-new-game" onClick={() => {this.props.init()}} >New Game</button>
                <div 
                    style={{
                        gridTemplateColumns: `repeat(${this.props.gridSize[0]}, auto)`, 
                        gridTemplateRows: `repeat(${this.props.gridSize[1]}, auto)`
                    }} 
                    className="board"
                >{this.renderTile(this.state.tilesOnTheBoard)}
                </div>
                </div>
            )
        } else {
            return (
                <div className="show" >
                    <p>Congratulations!</p>
                    <button className="btn-new-game" onClick={() => {this.props.init()}} >New Game</button>
                </div>    
            )         
        }
    }
}

export default Board;

