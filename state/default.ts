import { shuffleCards } from "@components/cards/cards";

const defaultRows = Array.from({ length: 18 }, () =>
  Array.from({ length: 3 }, () => true),
);

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
    tower: {
      nextBlockPull: 0,
      collapsed: false,
      rows: defaultRows,
    },
    deck,
    turnCount: 0,
    gameOver: false,
    gameOverReason: null,
    journal: "",
  };
};
