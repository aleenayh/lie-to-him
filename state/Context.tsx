import { createContext, useContext, useEffect, useState } from "react";
import { defaultGameState } from "./default";
import { type GameState, gameStateSchema } from "./schema";
import { useGameStore, useUnlockStore } from "./store";

export function GameProvider({ children }: { children: React.ReactNode }) {
	const gameStore = useGameStore();
	const unlockStore = useUnlockStore();
	const savedState = gameStateSchema.parse(gameStore.gameState);

	const [gameState, setGameState] = useState<GameState>(savedState);
	const [contentUnlocked, setContentUnlocked] = useState<boolean>(
		unlockStore.contentUnlocked ?? false,
	);
	const [isReady, setIsReady] = useState<boolean>(false);

	useEffect(() => {
		setIsReady(true);
	}, []);

	const updateGameState = (newGameState: GameState) => {
		setGameState(newGameState);
		gameStore.updateGameState(newGameState);
	};

	const updateContentUnlocked = (newContentUnlocked: boolean) => {
		setContentUnlocked(newContentUnlocked);
		unlockStore.updateContentUnlocked(newContentUnlocked);
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
