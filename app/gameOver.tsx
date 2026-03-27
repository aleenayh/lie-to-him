import { BackgroundTexture } from "@components/BackgroundTexture";
import { JournalInterior } from "@components/Journal";
import { useGame } from "@state/Context";
import type { GameState } from "@state/schema";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

const skeletonImage = require("../assets/images/skeleton.svg");

export default function GameOver() {
  const {
    gameState: { gameOverReason, desperation },
  } = useGame();

  const gameOverMessage = getGameOverMessage(gameOverReason, desperation);
  const gameOverTitle =
    gameOverReason === "storyOver" ? "Story Complete" : "The Tower Falls";

  //TODO: provide a way to save story

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.outerContainer}>
      <BackgroundTexture />
      <Image source={skeletonImage} style={styles.backgroundImage} />
      <Image source={skeletonImage} style={styles.backgroundImageReversed} />
      <View style={styles.container}>
        <Text style={styles.header}>{gameOverTitle}</Text>
        <Text style={styles.text}>{gameOverMessage}</Text>
        <JournalInterior variant="brown" hideIfEmpty />
        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.button}>Return to Main Menu</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 16,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: "55%",
    width: "100%",
    height: "100%",
    opacity: 0.2,
  },
  backgroundImageReversed: {
    position: "absolute",
    top: "10%",
    right: "55%",
    width: "100%",
    height: "100%",
    transform: [{ rotateY: "180deg" }],
    opacity: 0.2,
  },
  header: {
    color: "#843b2d",
    marginBottom: 8,
    fontFamily: "rocker",
    fontSize: 64,
    textAlign: "center",
  },
  interior: {
    overflowY: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  button: {
    backgroundColor: "#765023",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
  },
  text: {
    color: "#000",
    fontSize: 18,
    padding: 8,
    textAlign: "left",
    fontFamily: "typewriter",
  },
});

function getGameOverMessage(
  gameOverReason: GameState["gameOverReason"],
  desperation: number,
) {
  if (gameOverReason === "storyOver") {
    if (desperation === 0) {
      return "You have woven a tapestry of lies. And he believes you.";
    } else if (desperation <= 4) {
      return "You have spun a thread of lies. And he has accepted it.";
    } else if (desperation <= 8) {
      return "You have told a story. And he has listened to it.";
    } else {
      return "You have stumbled through a conversation. And he has heard enough.";
    }
  } else {
    if (desperation === 0) {
      return "You have nothing left to say. And he has nothing left to hear.";
    } else if (desperation <= 4) {
      return "You have exhausted yourself. And he has exhausted his patience.";
    } else if (desperation <= 8) {
      return "You have built a reality made of contradictions. And he wants no part of it.";
    } else {
      return "You have lied to him. And he knows the truth.";
    }
  }
}
