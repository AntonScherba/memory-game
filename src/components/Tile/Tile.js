import React, { Component } from 'react';
import './Tile.css';

class Tile extends Component {
    render() {
      return (
        <div className="tile">
          <div className="front-face" >front</div>
          <div className="back-face" >Back</div>
        </div>
      )
    }
}
  
export default Tile;