import type { ImageSourcePropType } from "react-native";
import { tarotImages } from "../../assets/images/tarot";

type Effect = {
  type: "desperation" | "dishonesty" | "nextBlockPull";
  adjustment: number;
};

export type CardDetails = {
  name: string;
  image: ImageSourcePropType;
} & (
  | {
      type: "majorArcana";
      descriptionUpright: string;
      descriptionReversed: string;
      effectUpright: Effect[];
      effectReversed: Effect[];
    }
  | { type: "wands"; value: number }
  | { type: "cups"; value: number }
  | { type: "pentacles"; value: number }
  | { type: "swords"; value: number }
);

export const cards: Record<string, CardDetails> = {
  fool: {
    name: "The Fool",
    descriptionUpright:
      "A detail of your lie reminds you both of the day you first met. A smile flickers across his face and lands on yours as you remember the instant connection you felt. Reduce Desperation by 1.",
    descriptionReversed:
      "For a moment, his eyes soften. Emboldened, you needlessly add an unnecessary detail. Increase your Desperation by 1.",
    image: tarotImages.ma_fool,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: -1 }],
    effectReversed: [{ type: "desperation", adjustment: 1 }],
  },
  empress: {
    name: "The Empress",
    descriptionUpright:
      "You weave a mention of his favourite place into your narrative, hoping to dull his skepticism with happy memories. Pull 2 blocks.",
    descriptionReversed:
      "You need him to believe you. He has to believe you. You dread the thought of where he will go if he does not believe you. Increase your Desperation by 2.",
    image: tarotImages.ma_empress,
    type: "majorArcana",
    effectUpright: [{ type: "nextBlockPull", adjustment: 2 }],
    effectReversed: [{ type: "desperation", adjustment: 2 }],
  },
  magician: {
    name: "The Magician",
    descriptionUpright:
      "You have always sensed that he desires you in a way he does not have you. You do something to entice that desire. Draw 1 block.",
    type: "majorArcana",
    descriptionReversed:
      "You have always sensed that he desires you in a way he does not have you. You pretend, for a moment, to share that desire. Increase Dishonesty by 1.",
    image: tarotImages.ma_magician,
    effectUpright: [{ type: "nextBlockPull", adjustment: 1 }],
    effectReversed: [{ type: "dishonesty", adjustment: 1 }],
  },
  priestess: {
    name: "The High Priestess",
    descriptionUpright:
      "You open your mouth to speak and feel the words dry in your throat as your conscience questions what you are doing. Pull 3 blocks.",
    descriptionReversed:
      "You feel a lull in the conversation. You regard each other in silence. You wonder for a moment whether all the lies are worth it. Increase your Desperation by 1.",
    image: tarotImages.ma_priestess,
    type: "majorArcana",
    effectUpright: [{ type: "nextBlockPull", adjustment: 3 }],
    effectReversed: [{ type: "desperation", adjustment: 1 }],
  },
  emperor: {
    name: "The Emperor",
    descriptionUpright:
      "You subtly remind him of some way he is inferior to you. His hesitation tells you he noticed the slight. Increase your Dishonesty by 1 and pull 1 block.",
    descriptionReversed:
      "You not-so-subtly ridicule him in hopes of making him feel inferior. His face darkens as his heart closes a little. Increase your Dishonesty by 1 and your Desperation by 1.",
    image: tarotImages.ma_emperor,
    type: "majorArcana",
    effectUpright: [
      { type: "dishonesty", adjustment: 1 },
      { type: "nextBlockPull", adjustment: 1 },
    ],
    effectReversed: [
      { type: "dishonesty", adjustment: 1 },
      { type: "desperation", adjustment: 1 },
    ],
  },
  hierophant: {
    name: "The Hierophant",
    descriptionUpright:
      "The lies flow easily; the lies are second nature. Reduce Desperation by 1.",
    descriptionReversed:
      "The lies flow easily; the lies are second nature. Increase Dishonesty by 1.",
    image: tarotImages.ma_hierophant,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: -1 }],
    effectReversed: [{ type: "dishonesty", adjustment: 1 }],
  },
  lovers: {
    name: "The Lovers",
    descriptionUpright:
      "You know the nuances of his expressions, the lilts in his voice. You know how to read the pitch of his breath. You know what every twitch and glance signifies. Reduce Desperation by 1.",
    descriptionReversed:
      "There was a time when you did not have to lie. When your souls spoke as plainly as your voices. Look what you have become. Increase Desperation by 2. ",
    image: tarotImages.ma_lovers,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: -1 }],
    effectReversed: [{ type: "desperation", adjustment: 2 }],
  },
  chariot: {
    name: "The Chariot",
    descriptionUpright:
      "You sense he is coming close to uncovering the truth. You steer him expertly away. Draw 2 blocks.",
    descriptionReversed:
      "You sense he is becoming impatient as your lies steer the conversation this way and that. You attempt to calm him with more lies. Increase Desperation by 2.",
    image: tarotImages.ma_chariot,
    type: "majorArcana",
    effectUpright: [{ type: "nextBlockPull", adjustment: 2 }],
    effectReversed: [{ type: "desperation", adjustment: 2 }],
  },
  strength: {
    name: "Strength",
    descriptionUpright:
      "You reach out gently and make physical contact. The gesture is empty, just another lie. Increase Dishonesty by 1.",
    descriptionReversed:
      "You feel tears prick in the back of your eyes, the lies like tiny needles inside your skull. You cannot let him see you cry. Increase Desperation by 1.",
    image: tarotImages.ma_strength,
    type: "majorArcana",
    effectUpright: [{ type: "dishonesty", adjustment: 1 }],
    effectReversed: [{ type: "desperation", adjustment: 1 }],
  },
  hermit: {
    name: "The Hermit",
    descriptionUpright:
      "An opportunity arises to tell him something true. A small thing. For a moment, the truth will be on your side. It will give your lies more weight. Reduce Dishonesty by 2.",
    descriptionReversed:
      "He cannot know the truth. If he knows the truth, you will lose what you love most. The truth swirls around you, fruitlessly searching for a way into your story. Increase Desperation by 2.",
    image: tarotImages.ma_hermit,
    type: "majorArcana",
    effectUpright: [{ type: "dishonesty", adjustment: -2 }],
    effectReversed: [{ type: "desperation", adjustment: 2 }],
  },
  wheel: {
    name: "The Wheel of Fortune",
    descriptionUpright:
      "You have known for a while that one day you would be here, lying to him. You wish you had prepared more. Increase Desperation by 1.",
    descriptionReversed:
      "You make the mistake of directly answering his direct question. You see it in his face. He knows what you just said cannot be true. Pull 5 blocks.",
    image: tarotImages.ma_wheel,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: 1 }],
    effectReversed: [{ type: "nextBlockPull", adjustment: 5 }],
  },
  justice: {
    name: "Justice",
    descriptionUpright:
      "You remind yourself of why you are doing this. You are justified. He cannot know the truth. You reason with yourself, calming your heartbeat. Reduce Desperation by 1.",
    descriptionReversed:
      "You try to remind yourself of why you are doing this. You try to justify it. His eyes bore into yours, interrupting your thoughts. Pull 2 blocks and increase Desperation by 1.",
    image: tarotImages.ma_justice,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: -1 }],
    effectReversed: [
      { type: "nextBlockPull", adjustment: 2 },
      { type: "desperation", adjustment: 1 },
    ],
  },
  hangedman: {
    name: "The Hanged Man",
    descriptionUpright:
      "You reflect on everything you have sacrificed, everything you will sacrifice, to prevent him from knowing the truth. The weight of your lies presses on your spine. Increase Desperation by 1.",
    descriptionReversed:
      "You find yourself stalling for time, unable to think of lies quickly enough to answer his questions. You offer him a drink. You make it for him in silence. Pull 1 block.",
    image: tarotImages.ma_hangedman,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: 1 }],
    effectReversed: [{ type: "nextBlockPull", adjustment: 1 }],
  },
  death: {
    name: "Death",
    descriptionUpright:
      "What if you stopped lying, knowing the world would continue to turn? You can’t. But the thought that another you, in another life, could gives you comfort. Reduce Desperation by 2.",
    descriptionReversed:
      "You can never stop lying. Both of your worlds will spin forever around a pillar of falsehood and it is all your fault. Increase Dishonesty by 1, increase Desperation by 2, pull 3 blocks.",
    image: tarotImages.ma_death,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: -2 }],
    effectReversed: [
      { type: "dishonesty", adjustment: 1 },
      { type: "desperation", adjustment: 2 },
      { type: "nextBlockPull", adjustment: 3 },
    ],
  },
  temperance: {
    name: "Temperance",
    descriptionUpright:
      "Your conversation will be a long one, but you are willing to take the time to convince him. Reduce Desperation by 1.",
    descriptionReversed:
      "Your conversation will be a long one, whether he wants it to be or not. You won’t let this moment end until you have convinced him of your lies. Increase Dishonesty by 1. ",
    image: tarotImages.ma_temperance,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: -1 }],
    effectReversed: [{ type: "dishonesty", adjustment: 1 }],
  },
  devil: {
    name: "The Devil",
    descriptionUpright:
      "You make a joke, surprising even yourself. Your laughter mingles with his, lifting the tension. You know gravity will claim it back soon enough. Reduce Dishonesty by 1, pull 1 block.",
    descriptionReversed:
      "You make a joke, surprising even yourself. Your laughter mingles with his, lifting the tension above your heads. Gravity itself dances to your melody. Reduce Desperation by 1, pull 1 block.",
    image: tarotImages.ma_devil,
    type: "majorArcana",
    effectUpright: [
      { type: "dishonesty", adjustment: -1 },
      { type: "nextBlockPull", adjustment: 1 },
    ],
    effectReversed: [
      { type: "desperation", adjustment: -1 },
      { type: "nextBlockPull", adjustment: 1 },
    ],
  },
  tower: {
    name: "The Tower",
    descriptionUpright:
      "You see it in an instant. The chance in his face, his stance, his voice. He knows you are lying. Increase Desperation by 4, pull 6 blocks.",
    descriptionReversed:
      "You see it in an instant. The change in his face, his stance, his voice. He suspects you of lying. But in the next instant, it is gone. Reduce Desperation by 2. ",
    image: tarotImages.ma_tower,
    type: "majorArcana",
    effectUpright: [
      { type: "desperation", adjustment: 4 },
      { type: "nextBlockPull", adjustment: 6 },
    ],
    effectReversed: [{ type: "desperation", adjustment: -2 }],
  },
  star: {
    name: "The Star",
    descriptionUpright:
      "You picture the conclusion of this endless moment. You envision him convinced, feel the secure knowledge that he will never know the truth. You plan your celebration. Pull 3 blocks.",
    descriptionReversed:
      "You fear this moment is endless. You will never convince him, you will never be certain that he won’t discover the truth. You dread your demise. Increase Desperation by 2, pull 3 blocks.",
    image: tarotImages.ma_star,
    type: "majorArcana",
    effectUpright: [
      { type: "desperation", adjustment: 2 },
      { type: "nextBlockPull", adjustment: 3 },
    ],
    effectReversed: [
      { type: "desperation", adjustment: 2 },
      { type: "nextBlockPull", adjustment: 3 },
    ],
  },
  moon: {
    name: "The Moon",
    descriptionUpright:
      "Your every movement, your every turn of phrase, is perfectly calculated to give the illusion of poise and honesty. You watch as he reflects your light. Increase Dishonesty by 1.",
    descriptionReversed:
      "You work hard to construct a facade of honesty. You watch a shadow cross his face and wonder if he sees the truth of you beneath. Increase Desperation by 1.",
    image: tarotImages.ma_moon,
    type: "majorArcana",
    effectUpright: [{ type: "dishonesty", adjustment: 1 }],
    effectReversed: [{ type: "desperation", adjustment: 1 }],
  },
  sun: {
    name: "The Sun",
    descriptionUpright:
      "You feel jubilation rise as you see him relax. Your tactics are working. He is going to believe you! Reduce Desperation by 1.",
    descriptionReversed:
      "You feel bile rise as you see him tense. Your tactics aren’t working. He does not believe you. Increase Desperation by 1.",
    image: tarotImages.ma_sun,
    type: "majorArcana",
    effectUpright: [{ type: "desperation", adjustment: -1 }],
    effectReversed: [{ type: "desperation", adjustment: 1 }],
  },
  judgement: {
    name: "Judgement",
    descriptionUpright:
      "Lying is wrong. Every child knows that. But sometimes, one must do something wrong in order to achieve a great right. And your goals are right. Aren’t they? Pull 2 blocks.",
    descriptionReversed:
      "Lying is wrong. You know that lying is wrong. He trusts you. Or he used to. Do you remember that? Do you remember what it felt like to deserve that? Pull 4 blocks.",
    image: tarotImages.ma_judgement,
    type: "majorArcana",
    effectUpright: [{ type: "nextBlockPull", adjustment: 2 }],
    effectReversed: [{ type: "nextBlockPull", adjustment: 4 }],
  },
  world: {
    name: "The World",
    descriptionUpright:
      "You find the lie that ties all your lies together. Everything will be easier from here. Reduce Dishonesty by 3, reduce Desperation by 3.",
    descriptionReversed:
      "Your lies become ever more scattered, as does your mind as you struggle to keep track of them. Everything is getting harder. Increase Dishonesty by 3, increase Desperation by 3.",
    image: tarotImages.ma_world,
    type: "majorArcana",
    effectUpright: [
      { type: "dishonesty", adjustment: -3 },
      { type: "desperation", adjustment: -3 },
    ],
    effectReversed: [
      { type: "dishonesty", adjustment: 3 },
      { type: "desperation", adjustment: 3 },
    ],
  },
  ace_wands: {
    name: "Ace of Wands",
    type: "wands",
    value: 1,
    image: tarotImages.wands_ace,
  },
  ace_cups: {
    name: "Ace of Cups",
    type: "cups",
    value: 1,
    image: tarotImages.cups_ace,
  },
  ace_pentacles: {
    name: "Ace of Pentacles",
    type: "pentacles",
    value: 1,
    image: tarotImages.pent_ace,
  },
  ace_swords: {
    name: "Ace of Swords",
    type: "swords",
    value: 1,
    image: tarotImages.swords_ace,
  },
  two_wands: {
    name: "Two of Wands",
    type: "wands",
    value: 2,
    image: tarotImages.wands_2,
  },
  two_cups: {
    name: "Two of Cups",
    type: "cups",
    value: 2,
    image: tarotImages.cups_2,
  },
  two_pentacles: {
    name: "Two of Pentacles",
    type: "pentacles",
    value: 2,
    image: tarotImages.pent_2,
  },
  two_swords: {
    name: "Two of Swords",
    type: "swords",
    value: 2,
    image: tarotImages.swords_2,
  },
  three_wands: {
    name: "Three of Wands",
    type: "wands",
    value: 3,
    image: tarotImages.wands_3,
  },
  three_cups: {
    name: "Three of Cups",
    type: "cups",
    value: 3,
    image: tarotImages.cups_3,
  },
  three_pentacles: {
    name: "Three of Pentacles",
    type: "pentacles",
    value: 3,
    image: tarotImages.pent_3,
  },
  three_swords: {
    name: "Three of Swords",
    type: "swords",
    value: 3,
    image: tarotImages.swords_3,
  },
  four_wands: {
    name: "Four of Wands",
    type: "wands",
    value: 4,
    image: tarotImages.wands_4,
  },
  four_cups: {
    name: "Four of Cups",
    type: "cups",
    value: 4,
    image: tarotImages.cups_4,
  },
  four_pentacles: {
    name: "Four of Pentacles",
    type: "pentacles",
    value: 4,
    image: tarotImages.pent_4,
  },
  four_swords: {
    name: "Four of Swords",
    type: "swords",
    value: 4,
    image: tarotImages.swords_4,
  },
  five_wands: {
    name: "Five of Wands",
    type: "wands",
    value: 5,
    image: tarotImages.wands_5,
  },
  five_cups: {
    name: "Five of Cups",
    type: "cups",
    value: 5,
    image: tarotImages.cups_5,
  },
  five_pentacles: {
    name: "Five of Pentacles",
    type: "pentacles",
    value: 5,
    image: tarotImages.pent_5,
  },
  five_swords: {
    name: "Five of Swords",
    type: "swords",
    value: 5,
    image: tarotImages.swords_5,
  },
  six_wands: {
    name: "Six of Wands",
    type: "wands",
    value: 6,
    image: tarotImages.wands_6,
  },
  six_cups: {
    name: "Six of Cups",
    type: "cups",
    value: 6,
    image: tarotImages.cups_6,
  },
  six_pentacles: {
    name: "Six of Pentacles",
    type: "pentacles",
    value: 6,
    image: tarotImages.pent_6,
  },
  six_swords: {
    name: "Six of Swords",
    type: "swords",
    value: 6,
    image: tarotImages.swords_6,
  },
  seven_wands: {
    name: "Seven of Wands",
    type: "wands",
    value: 7,
    image: tarotImages.wands_7,
  },
  seven_cups: {
    name: "Seven of Cups",
    type: "cups",
    value: 7,
    image: tarotImages.cups_7,
  },
  seven_pentacles: {
    name: "Seven of Pentacles",
    type: "pentacles",
    value: 7,
    image: tarotImages.pent_7,
  },
  seven_swords: {
    name: "Seven of Swords",
    type: "swords",
    value: 7,
    image: tarotImages.swords_7,
  },
  eight_wands: {
    name: "Eight of Wands",
    type: "wands",
    value: 8,
    image: tarotImages.wands_8,
  },
  eight_cups: {
    name: "Eight of Cups",
    type: "cups",
    value: 8,
    image: tarotImages.cups_8,
  },
  eight_pentacles: {
    name: "Eight of Pentacles",
    type: "pentacles",
    value: 8,
    image: tarotImages.pent_8,
  },
  eight_swords: {
    name: "Eight of Swords",
    type: "swords",
    value: 8,
    image: tarotImages.swords_8,
  },
  nine_wands: {
    name: "Nine of Wands",
    type: "wands",
    value: 9,
    image: tarotImages.wands_9,
  },
  nine_cups: {
    name: "Nine of Cups",
    type: "cups",
    value: 9,
    image: tarotImages.cups_9,
  },
  nine_pentacles: {
    name: "Nine of Pentacles",
    type: "pentacles",
    value: 9,
    image: tarotImages.pent_9,
  },
  nine_swords: {
    name: "Nine of Swords",
    type: "swords",
    value: 9,
    image: tarotImages.swords_9,
  },
  ten_wands: {
    name: "Ten of Wands",
    type: "wands",
    value: 10,
    image: tarotImages.wands_10,
  },
  ten_cups: {
    name: "Ten of Cups",
    type: "cups",
    value: 10,
    image: tarotImages.cups_10,
  },
  ten_pentacles: {
    name: "Ten of Pentacles",
    type: "pentacles",
    value: 10,
    image: tarotImages.pent_10,
  },
  ten_swords: {
    name: "Ten of Swords",
    type: "swords",
    value: 10,
    image: tarotImages.swords_10,
  },
  page_wands: {
    name: "Page of Wands",
    type: "wands",
    value: 11,
    image: tarotImages.wands_page,
  },
  page_cups: {
    name: "Page of Cups",
    type: "cups",
    value: 11,
    image: tarotImages.cups_page,
  },
  page_pentacles: {
    name: "Page of Pentacles",
    type: "pentacles",
    value: 11,
    image: tarotImages.pent_page,
  },
  page_swords: {
    name: "Page of Swords",
    type: "swords",
    value: 11,
    image: tarotImages.swords_page,
  },
  knight_wands: {
    name: "Knight of Wands",
    type: "wands",
    value: 12,
    image: tarotImages.wands_knight,
  },
  knight_cups: {
    name: "Knight of Cups",
    type: "cups",
    value: 12,
    image: tarotImages.cups_knight,
  },
  knight_pentacles: {
    name: "Knight of Pentacles",
    type: "pentacles",
    value: 12,
    image: tarotImages.pent_knight,
  },
  knight_swords: {
    name: "Knight of Swords",
    type: "swords",
    value: 12,
    image: tarotImages.swords_knight,
  },
  queen_wands: {
    name: "Queen of Wands",
    type: "wands",
    value: 14,
    image: tarotImages.wands_queen,
  },
  queen_cups: {
    name: "Queen of Cups",
    type: "cups",
    value: 14,
    image: tarotImages.cups_queen,
  },
  queen_pentacles: {
    name: "Queen of Pentacles",
    type: "pentacles",
    value: 14,
    image: tarotImages.pent_queen,
  },
  queen_swords: {
    name: "Queen of Swords",
    type: "swords",
    value: 14,
    image: tarotImages.swords_queen,
  },
  king_wands: {
    name: "King of Wands",
    type: "wands",
    value: 14,
    image: tarotImages.wands_king,
  },
  king_cups: {
    name: "King of Cups",
    type: "cups",
    value: 14,
    image: tarotImages.cups_king,
  },
  king_pentacles: {
    name: "King of Pentacles",
    type: "pentacles",
    value: 14,
    image: tarotImages.pent_king,
  },
  king_swords: {
    name: "King of Swords",
    type: "swords",
    value: 14,
    image: tarotImages.swords_king,
  },
};

export const shuffleCards = () => {
  const wandValue = getRandomValue();
  const cupValue = getRandomValue();
  const pentacleValue = getRandomValue();
  const swordValue = getRandomValue();

  const filterableCards = Object.entries(cards);

  const majorArcana = filterableCards
    .filter(([key, card]) => card.type === "majorArcana")
    .map(([key, _]) => key);

  const minorArcana = filterableCards.filter(
    ([key, card]) => card.type !== "majorArcana",
  );

  const wands = minorArcana
    .filter(([key, card]) => card.type === "wands" && card.value !== wandValue)
    .map(([key, _]) => key);
  const cups = minorArcana
    .filter(([key, card]) => card.type === "cups" && card.value !== cupValue)
    .map(([key, _]) => key);
  const pentacles = minorArcana
    .filter(
      ([key, card]) =>
        card.type === "pentacles" && card.value !== pentacleValue,
    )
    .map(([key, _]) => key);
  const swords = minorArcana
    .filter(
      ([key, card]) => card.type === "swords" && card.value !== swordValue,
    )
    .map(([key, _]) => key);

  const deck = [...wands, ...cups, ...pentacles, ...swords, ...majorArcana];

  //shuffle deck
  for (let i = 0; i < deck.length; i++) {
    const shuffle = Math.floor(Math.random() * deck.length);
    [deck[i], deck[shuffle]] = [deck[shuffle], deck[i]];
  }

  return {
    wands: wandValue,
    cups: cupValue,
    pentacles: pentacleValue,
    swords: swordValue,
    deck,
  };
};

function getRandomValue() {
  //between 1 and 14
  return Math.floor(Math.random() * 14) + 1;
}
