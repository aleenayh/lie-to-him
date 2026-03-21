import { useGame } from "@state/Context";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    Easing,
    FadeOut,
    type SharedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export function IntroText() {
  const { gameState, updateGameState } = useGame();

  const opacityLine1 = useSharedValue(0);
  const opacityLine2 = useSharedValue(0);
  const opacityLine3 = useSharedValue(0);
  const opacityLine4 = useSharedValue(0);
  const opacityLine5 = useSharedValue(0);

  const fadeIn = useCallback((sharedValue: SharedValue<number>) => {
    sharedValue.value = withTiming(1, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, []);

  const fadeEachLineIn = useCallback(() => {
    fadeIn(opacityLine1);
    setTimeout(() => {
      fadeIn(opacityLine2);
    }, 2000);
    setTimeout(() => {
      fadeIn(opacityLine3);
    }, 4000);
    setTimeout(() => {
      fadeIn(opacityLine4);
    }, 8000);
    setTimeout(() => {
      fadeIn(opacityLine5);
    }, 11000);
    setTimeout(() => {
      updateGameState({ ...gameState, turnCount: 1 });
    }, 13000);
  }, [
    fadeIn,
    opacityLine1,
    opacityLine2,
    opacityLine3,
    opacityLine4,
    opacityLine5,
    gameState,
    updateGameState,
  ]);

  fadeEachLineIn();

  return (
    <Animated.View style={styles.container} exiting={FadeOut.duration(3000)}>
      <Animated.Text style={[styles.text, { opacity: opacityLine1 }]}>
        He is standing face to face with you.
      </Animated.Text>
      <Animated.Text style={[styles.text, { opacity: opacityLine2 }]}>
        He trusts you.
      </Animated.Text>
      <Animated.Text style={[styles.text, { opacity: opacityLine3 }]}>
        He wants to know the truth.
      </Animated.Text>
      <Animated.Text style={[styles.text, { opacity: opacityLine4 }]}>
        He cannot know the truth.
      </Animated.Text>
      <Animated.Text style={[styles.text, { opacity: opacityLine5 }]}>
        LIE TO HIM.
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flex: 1,
    backgroundColor: "papayawhip",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontFamily: "typewriter",
    color: "#9a5341",
    textAlign: "center",
  },
});
