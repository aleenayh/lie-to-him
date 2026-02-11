import { shuffleCards } from "@components/cards/cards";

export const defaultGameState = () => {
  const { wands, cups, pentacles, swords, deck } = shuffleCards();
  return {
    dishonesty: 1,
    desperation: 0,
    story: {
      wands: {
        cardValue: wands,
        flipped: false,
      },
      cups: {
        cardValue: cups,
        flipped: false,
      },
      pentacles: {
        cardValue: pentacles,
        flipped: false,
      },
      swords: {
        cardValue: swords,
        flipped: false,
      },
    },
    tower: {}, //TODO
    deck,
    turnCount: 0,
  };
};
