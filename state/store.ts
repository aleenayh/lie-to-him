import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultGameState } from "./default";
import type { GameState } from "./schema";

type GameStore = {
    gameState: GameState;
    updateGameState: (newGameState: GameState) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameState: defaultGameState(),
      updateGameState: (newGameState: GameState) => set({ gameState: newGameState }),
    }),
    {
      name: "lth-local",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useUnlockStore = create<{
  contentUnlocked: boolean;
  updateContentUnlocked: (contentUnlocked: boolean) => void;
}>()(
  persist(
    (set) => ({
      contentUnlocked: false,
      updateContentUnlocked: (contentUnlocked: boolean) =>
        set({ contentUnlocked }),
    }),
    {
      name: "lth-unlocked-content",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
