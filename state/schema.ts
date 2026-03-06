import { z } from "zod";
import { defaultGameState } from "./default";

const towerSchema = z.object({
  nextBlockPull: z.coerce.number().catch(0), //adjustment ++ to base
  collapsed: z.boolean().catch(false),
  rows: z.array(z.array(z.boolean().catch(true)))
})

export type Tower = z.infer<typeof towerSchema>;

export const gameStateSchema = z
  .object({
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
    tower: towerSchema,
    deck: z.array(z.string()),
    turnCount: z.number(),
    gameOver: z.boolean().catch(false),
    gameOverReason: z
      .enum(["storyOver", "towerCollapsed"])
      .nullable()
      .catch(null),
    journal: z.string().optional().catch(""),
  })
  .catch(defaultGameState());

export type GameState = z.infer<typeof gameStateSchema>;
