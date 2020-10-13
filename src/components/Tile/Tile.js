import React from 'react';

const Tile = ({ color, onClick, isOpened }) => {
  return(
    <button
      disabled={isOpened}
      style={{background: isOpened ? `hsl(${color}, 90%, 60%)` : '#fff'}}
      onClick={onClick}
    >{color}</button>
  )
}

export default Tile;