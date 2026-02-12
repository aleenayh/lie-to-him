import { useGame } from "@state/Context";
import type { GameState } from "@state/schema";
import { type CardDetails, cards } from "./cards";

export function useDrawCard() {
	const { gameState, updateGameState } = useGame();
	const flipped = Math.random() < 0.5;
	const newDeck = [...gameState.deck];

	const cardKey = gameState.deck.pop();
	if (!cardKey) {
		throw new Error("No card key found");
	}
	const card = cards[cardKey];
	const drawnIsHigher = checkIsDrawnHigher(card, gameState.story);
	if (drawnIsHigher && card.type !== "majorArcana") {
		updateGameState({
			...gameState,
			story: {
				...gameState.story,
				[card.type]: { ...gameState.story[card.type], flipped: true },
			},
			deck: newDeck,
		});
	} else {
		updateGameState({
			...gameState,
			deck: newDeck,
		});
	}
	return { card, flipped, drawnIsHigher };
}

function checkIsDrawnHigher(card: CardDetails, story: GameState["story"]) {
	if (card.type === "majorArcana") {
		return false;
	}
	const drawnValue = card.value;
	const storyValue = story[card.type].cardValue;
	return drawnValue > storyValue;
}
