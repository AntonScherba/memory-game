import React from 'react';
import './Tile.css';

const Tile = ({color}) => {
  return (
    <button className="tile" style={{background: color }}>Click</button>
  )
} 

export default Tile;