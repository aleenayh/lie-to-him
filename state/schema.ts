import { z } from "zod";

export const gameStateSchema = z.object({
  dishonesty: z.number(),
  desperation: z.number(),
  story: z.object({
    wands: z.object({
      cardValue: z.number(),
      flipped: z.boolean(),
    }),
    cups: z.object({
      cardValue: z.number(),
      flipped: z.boolean(),
    }),
    pentacles: z.object({
      cardValue: z.number(),
      flipped: z.boolean(),
    }),
    swords: z.object({
      cardValue: z.number(),
      flipped: z.boolean(),
    }),
  }),
  tower: z.any(), //TODO
  deck: z.array(z.string()),
  turnCount: z.number(),
});

export type GameState = z.infer<typeof gameStateSchema>;
