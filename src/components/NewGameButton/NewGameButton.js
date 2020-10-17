import React, { useContext } from "react";
import { Context } from "..//../context";
import "./NewGameButton.css";

const NewGameButton = () => {
  const dispatch = useContext(Context);
  return (
    <button
      className="btn-new-game"
      onClick={() => dispatch({ type: "RESET" })}
    >
      New Game
    </button>
  );
};

export default NewGameButton;
