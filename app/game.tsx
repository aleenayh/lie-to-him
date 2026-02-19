import type { CardDetails } from "@components/cards/cards";
import { cards } from "@components/cards/cards";
import DisplayTarotCard from "@components/cards/DisplayTarotCard";
import ContentBlocked from "@components/ContentBlocked";
import DesperationChain from "@components/DesperationChain";
import DishonestyChain from "@components/DishonestyChain";
import StoryHolder from "@components/StoryHolder";
import Tower from "@components/tower/Tower";
import { useGame } from "@state/Context";
import type { GameState } from "@state/schema";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModalComponent from "../components/Modal";

export default function Game() {
  const { gameState, updateGameState, contentUnlocked } = useGame();
  const [cardVisible, setCardVisible] = useState(false);
  const [towerVisible, setTowerVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState<{
    card: CardDetails;
    reversed: boolean;
    drawnIsHigher: boolean;
    difference: number;
  } | null>(null);
  const [showBlocked, setShowBlocked] = useState(
    !contentUnlocked && gameState.turnCount >= 5,
  );

  const triggerDrawCard = () => {
    const reversed = Math.random() < 0.5;
    const newDeck = [...gameState.deck];

    const cardKey = newDeck.pop();
    if (!cardKey) {
      throw new Error("No card key found");
    }
    const card = cards[cardKey];
    const { drawnIsHigher, difference } = checkIsDrawnHigher(
      card,
      gameState.story,
    );
    setCardDetails({ card, reversed, drawnIsHigher, difference });
    setCardVisible(true);

    if (drawnIsHigher && card.type !== "majorArcana") {
      const mappedType = card.type === "pentacles" ? "pent" : card.type;
      const filteredDeck = newDeck.filter(
        (cardKey) => !cardKey.includes(mappedType),
      );
      let dishonestyAdjustment = 0;
      let desperationAdjustment = 0;
      let nextBlockPullAdjustment = 0;
      //minor arcana difference effects
      if (difference && difference > 0) {
        if (difference <= 3) {
          //increase desperation by 1
          desperationAdjustment = 1;
        } else if (difference > 3 && difference <= 6) {
          //increase dishonesty by 1
          dishonestyAdjustment = 1;
        } else if (difference > 6 && difference <= 9) {
          //increase desperation by 2, pull 2 blocks
          desperationAdjustment = 2;
          nextBlockPullAdjustment = 2;
        } else if (difference > 9) {
          //increase dishonesty by 2, pull 2 blocks
          dishonestyAdjustment = 2;
          nextBlockPullAdjustment = 2;
        }
      }
      updateGameState({
        ...gameState,
        story: {
          ...gameState.story,
          [card.type]: { ...gameState.story[card.type], flipped: true },
        },
        deck: filteredDeck,
        desperation: gameState.desperation + desperationAdjustment,
        dishonesty: gameState.dishonesty + dishonestyAdjustment,
        tower: {
          ...gameState.tower,
          nextBlockPull: nextBlockPullAdjustment,
        },
      });
    } else {
      if (card.type === "majorArcana") {
        const effects = reversed ? card.effectReversed : card.effectUpright;
        effects.forEach((effect) => {
          if (effect.type === "nextBlockPull") {
            updateGameState({
              ...gameState,
              tower: {
                ...gameState.tower,
                nextBlockPull:
                  gameState.tower.nextBlockPull + effect.adjustment,
              },
            });
          } else if (effect.type === "desperation") {
            updateGameState({
              ...gameState,
              desperation: Math.max(
                0,
                gameState.desperation + effect.adjustment,
              ),
            });
          } else if (effect.type === "dishonesty") {
            updateGameState({
              ...gameState,
              dishonesty: Math.max(0, gameState.dishonesty + effect.adjustment),
            });
          }
        });
      }
      updateGameState({
        ...gameState,
        deck: newDeck,
      });
    }
  };

  const showTower = () => {
    setCardVisible(false);
    setCardDetails(null);
    if (Object.values(gameState.story).every((story) => story.flipped)) {
      updateGameState({
        ...gameState,
        gameOver: true,
        gameOverReason: "storyOver",
      });
      router.replace("/gameOver");
      return;
    }
    setTowerVisible(true);
  };

  const checkGameOverAndRoute = () => {
    //check game end conditions - TODO
    updateGameState({
      ...gameState,
      turnCount: gameState.turnCount + 1,
      tower: {
        ...gameState.tower,
        nextBlockPull: 0,
      },
    });
    setTowerVisible(false);
  };

  useEffect(() => {
    if (!contentUnlocked && gameState.turnCount >= 5) {
      setShowBlocked(true);
    }
  }, [contentUnlocked, gameState.turnCount]);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.header}>Lie To Him</Text>
        <Text style={styles.text}>Turn {gameState.turnCount}</Text>
        <View style={styles.gameGrid}>
          <DesperationChain />
          <View
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Pressable onPress={triggerDrawCard}>
              <Text style={styles.button}>Draw</Text>
            </Pressable>
          </View>
          <DishonestyChain />
        </View>
        <StoryHolder />
      </View>
      <ModalComponent visible={cardVisible} onRequestClose={showTower}>
        {cardDetails ? (
          <DisplayTarotCard inputs={cardDetails} />
        ) : (
          <Text>Uh oh! We couldn't find that card.</Text>
        )}
      </ModalComponent>
      <ModalComponent
        visible={towerVisible}
        onRequestClose={checkGameOverAndRoute}
      >
        <Tower />
      </ModalComponent>
      <ModalComponent
        visible={showBlocked}
        onRequestClose={() => router.push("/unlock")}
      >
        <ContentBlocked />
      </ModalComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "papayawhip",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  accent: {
    color: "#9a5341",
  },
  header: {
    color: "#843b2d",
    marginBottom: 8,
    fontFamily: "rocker",
    fontSize: 64,
  },
  button: {
    backgroundColor: "#9a5341",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "rocker",
    fontSize: 24,
  },
  text: {
    fontSize: 24,
    padding: 8,
    color: "#9a5341",
    textAlign: "center",
    fontFamily: "typewriter",
  },
  gameGrid: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 50,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 4,
  },
  backButtonText: {
    color: "#9a5341",
    fontFamily: "rocker",
    fontSize: 40,
  },
});

//helpers
function checkIsDrawnHigher(
  card: CardDetails,
  story: GameState["story"],
): { drawnIsHigher: boolean; difference: number } {
  if (card.type === "majorArcana") {
    return { drawnIsHigher: false, difference: 0 };
  }
  const drawnValue = card.value;
  const storyValue = story[card.type].cardValue;

  if (drawnValue === 1 && storyValue === 14) {
    //ace acts as 15 only if your story card is a king
    return { drawnIsHigher: true, difference: 1 };
  }
  return {
    drawnIsHigher: drawnValue > storyValue,
    difference: drawnValue - storyValue,
  };
}
