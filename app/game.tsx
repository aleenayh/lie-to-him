import ContentBlocked from "@components/ContentBlocked";
import type { CardDetails } from "@components/cards/cards";
import { cards } from "@components/cards/cards";
import DisplayTarotCard from "@components/cards/DisplayTarotCard";
import DesperationChain from "@components/DesperationChain";
import DishonestyChain from "@components/DishonestyChain";
import StoryHolder from "@components/StoryHolder";
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
    flipped: boolean;
    drawnIsHigher: boolean;
  } | null>(null);
  const [showBlocked, setShowBlocked] = useState(
    !contentUnlocked && gameState.turnCount >= 5,
  );

  const triggerDrawCard = () => {
    const flipped = Math.random() < 0.5;
    const newDeck = [...gameState.deck];

    const cardKey = newDeck.pop();
    if (!cardKey) {
      throw new Error("No card key found");
    }
    const card = cards[cardKey];
    const drawnIsHigher = checkIsDrawnHigher(card, gameState.story);
    setCardDetails({ card, flipped, drawnIsHigher });
    setCardVisible(true);

    if (drawnIsHigher && card.type !== "majorArcana") {
      const mappedType = card.type === "pentacles" ? "pent" : card.type;
      const filteredDeck = newDeck.filter(
        (cardKey) => !cardKey.includes(mappedType),
      );
      updateGameState({
        ...gameState,
        story: {
          ...gameState.story,
          [card.type]: { ...gameState.story[card.type], flipped: true },
        },
        deck: filteredDeck,
      });
    } else {
      updateGameState({
        ...gameState,
        deck: newDeck,
      });
    }
  };

  const applyCardEffectAndShowTower = () => {
    if (cardDetails?.card.type === "majorArcana") {
      const effects = cardDetails.flipped
        ? cardDetails.card.effectReversed
        : cardDetails.card.effectUpright;
      effects.forEach((effect) => {
        if (effect.type === "nextBlockPull") {
          updateGameState({
            ...gameState,
            tower: {
              ...gameState.tower,
              nextBlockPull: gameState.tower.nextBlockPull + effect.adjustment,
            },
          });
        } else if (effect.type === "desperation") {
          updateGameState({
            ...gameState,
            desperation: Math.max(0, gameState.desperation + effect.adjustment),
          });
        } else if (effect.type === "dishonesty") {
          updateGameState({
            ...gameState,
            dishonesty: Math.max(0, gameState.dishonesty + effect.adjustment),
          });
        }
      });
    }
    setCardVisible(false);
    setTowerVisible(true);
  };

  const returnToMain = () => {
	//check game end conditions 
	if (Object.values(gameState.story).every((story) => story.flipped)) {
		//game is over; todo
		return
	} else if (gameState.tower.collapsed) {
		//game is over; todo
	}

    updateGameState({
      ...gameState,
      turnCount: gameState.turnCount + 1,
      tower: {
        ...gameState.tower,
        nextBlockPull: 0,
      },
    });
    setCardVisible(false);
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
      <ModalComponent
        visible={cardVisible}
        onRequestClose={applyCardEffectAndShowTower}
      >
        {cardDetails ? (
          <DisplayTarotCard
            card={cardDetails.card}
            flipped={cardDetails.flipped}
            drawnIsHigher={cardDetails.drawnIsHigher}
          />
        ) : (
          <Text>Uh oh! We couldn't find that card.</Text>
        )}
      </ModalComponent>
      <ModalComponent visible={towerVisible} onRequestClose={returnToMain}>
        <Text>Tower - TODO </Text>
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
function checkIsDrawnHigher(card: CardDetails, story: GameState["story"]) {
  if (card.type === "majorArcana") {
    return false;
  }
  const drawnValue = card.value;
  const storyValue = story[card.type].cardValue;
  return drawnValue > storyValue;
}
