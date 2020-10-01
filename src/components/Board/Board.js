import React, { Component } from 'react';
import Tile from '../Tile/Tile';
import './Board.css'

class Board extends Component {
    
    renderTile = () => {
        return <Tile />
    }

    render () {
        return (
        <div className="board">
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
            {this.renderTile()}
        </div>
        )
    }
}

export default Board;
