import React from 'react';
import './Tile.css';

const Tile = ({color, onClick}) => {

  const onBtn = () => onClick(color);
  
  return (
    <button
      className="tile"
      style={{background: `hsl(${color}, 90%, 60%)`}} 
      onClick={onBtn}
  />
  )
} 

export default Tile;