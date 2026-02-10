import { createContext, useContext, useEffect, useState } from "react";
import { defaultGameState } from "./default";
import { type GameState } from "./schema";

export function GameProvider({ children }: { children: React.ReactNode }) {
  //TODO, retieve from storage
  const savedState = null; //gameStateSchema.parse(JSON.parse(storedState));
  const savedContentUnlocked = false; //TODO

  const [gameState, setGameState] = useState<GameState>(
    savedState ?? defaultGameState(),
  );
  const [contentUnlocked, setContentUnlocked] = useState<boolean>(
    savedContentUnlocked ?? false,
  );
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const updateGameState = (newGameState: GameState) => {
    setGameState(newGameState);
    //TODO, sync to storage
  };

  const updateContentUnlocked = (newContentUnlocked: boolean) => {
    setContentUnlocked(newContentUnlocked);
    //TODO, sync to storage
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateGameState,
        contentUnlocked,
        updateContentUnlocked,
        isReady,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

const GameContext = createContext<{
  gameState: GameState;
  updateGameState: (gameState: GameState) => void;
  contentUnlocked: boolean;
  updateContentUnlocked: (contentUnlocked: boolean) => void;
  isReady: boolean;
}>({
  gameState: defaultGameState(),
  updateGameState: () => {},
  contentUnlocked: false,
  updateContentUnlocked: () => {},
  isReady: false,
});
