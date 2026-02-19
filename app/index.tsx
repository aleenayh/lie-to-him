import { NewRocker_400Regular } from "@expo-google-fonts/new-rocker";
import { SpecialElite_400Regular } from "@expo-google-fonts/special-elite";
import { useGame } from "@state/Context";
import { defaultGameState } from "@state/default";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const skeletonImage = require("../assets/images/skeleton.svg");

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    rocker: NewRocker_400Regular,
    typewriter: SpecialElite_400Regular,
  });

  const { contentUnlocked, updateGameState, isReady, gameState } = useGame();

  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  const restartAndReroute = () => {
    updateGameState(defaultGameState());
    router.push("/game");
  };

  const existingGame = gameState.turnCount > 0;

  return (
    <View style={styles.container}>
      <Image source={skeletonImage} style={styles.backgroundImage} />
      <Image source={skeletonImage} style={styles.backgroundImageReversed} />
      <Text style={styles.header}>Lie To Him</Text>

      <Text style={[styles.subheader]}>
        A solo game of dishonesty by Michelle Kelly
      </Text>

      <Pressable onPress={restartAndReroute} style={styles.button}>
        <Text style={[styles.text]}>New Game</Text>
      </Pressable>
      <Pressable
        disabled={!existingGame}
        onPress={() => router.push("/game")}
        style={[styles.button, !existingGame && styles.disabled]}
      >
        <Text style={[styles.text]}>Continue Game</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/about")} style={styles.button}>
        <Text style={[styles.text]}>About</Text>
      </Pressable>
      {!contentUnlocked && (
        <Pressable onPress={() => router.push("/unlock")} style={styles.button}>
          <Text style={[styles.text]}>Unlock Content</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "papayawhip",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
  subheader: {
    fontSize: 24,
    padding: 8,
    fontFamily: "typewriter",
    textAlign: "center",
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
    borderRadius: 10,
    marginHorizontal: "auto",
    marginVertical: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    padding: 8,
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
  },
  disabled: {
    opacity: 0.8,
  },
});
