import React from "react";
import "./Tile.css";

const Tile = ({ color, onClick, isOpened, column, row, isHidden }) => {
  return (
    <button
      className={isHidden ? "hidden" : null}
      disabled={isOpened}
      style={{
        width: `calc(100%/${column})`,
        height: `calc(100%/${row})`,
        background: isOpened ? `hsl(${color}, 90%, 60%)` : "#fff",
      }}
      onClick={onClick}
    />
  );
};

export default Tile;
