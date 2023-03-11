import React, { useContext } from "react";
import game from "./game";

const ticTacInitial = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameContext = React.createContext(ticTacInitial);
GameContext.displayName = "Game Context";

export const GameContextProvider = ({ children }) => {
  return (
    <GameContext.Provider value={{ gameControl: game }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
