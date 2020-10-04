import React from 'react';
import './Tile.css';

const Tile = ({ color, onClick, active}) => {
  return(
    <button
      disabled={active}
      style={{background: active ? `hsl(${color}, 90%, 60%)` : '#fff'}}
      onClick={onClick}
  >{color}</button>
  )
}

export default Tile;