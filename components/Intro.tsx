import { useGame } from "@state/Context";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BackgroundTexture } from "./BackgroundTexture";

export function IntroText() {
  const { gameState, updateGameState } = useGame();
  const [viewShown, setViewShown] = useState<"intro1" | "intro2">("intro1");

  const startGame = () => {
    updateGameState({ ...gameState, turnCount: 1 });
  };

  return (
    <Animated.View
      style={{ width: "100%", height: "100%" }}
      exiting={FadeOut.duration(2000)}
    >
      <BackgroundTexture />
      {viewShown === "intro1" && (
        <Animated.View
          style={styles.container}
          exiting={FadeOut.duration(2000)}
        >
          <CascadingText
            onPress={() => {
              setViewShown("intro2");
            }}
            textLines={[
              "He is standing face to face with you.",
              "He trusts you.",
              "He wants to know the truth.",
            ]}
            onPressText="He cannot know the truth."
          />
        </Animated.View>
      )}
      {viewShown === "intro2" && (
        <Animated.View
          style={styles.container}
          entering={FadeIn.duration(2000)}
          exiting={FadeOut.duration(2000)}
        >
          <CascadingText
            onPress={startGame}
            textLines={[
              "The details of the situation are up to you.",
              "The lies you tell are up to you.",
              "There is only one constant:",
            ]}
            onPressText="You must lie to him."
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

function CascadingText({
  onPress,
  textLines,
  onPressText,
}: {
  onPress: () => void;
  textLines: string[];
  onPressText: string;
}) {
  const opacityLine1 = useSharedValue(0);
  const opacityLine2 = useSharedValue(0);
  const opacityLine3 = useSharedValue(0);
  const opacityLines = useMemo(
    () => [opacityLine1, opacityLine2, opacityLine3],
    [opacityLine1, opacityLine2, opacityLine3],
  );

  const DELAY_BETWEEN = 1600;
  const DURATION = 1700;

  const fadeIn = useCallback(
    (index: number) => {
      opacityLines[index].value = withTiming(1, {
        duration: DURATION,
        easing: Easing.linear,
      });
    },
    [opacityLines],
  );

  const fadeEachLineIn = useCallback(() => {
    textLines.forEach((_, index) => {
      setTimeout(() => {
        fadeIn(index);
      }, index * DELAY_BETWEEN);
    });
  }, [fadeIn, textLines]);

  fadeEachLineIn();

  return (
    <Animated.View style={styles.container} exiting={FadeOut.duration(3000)}>
      {textLines.map((line, index) => (
        <Animated.Text
          // biome-ignore lint/suspicious/noArrayIndexKey: ephemeral text
          key={index}
          style={[styles.text, { opacity: opacityLines[index] }]}
        >
          {line}
        </Animated.Text>
      ))}
      <Pressable onPress={onPress}>
        <Animated.View
          entering={FadeIn.duration(DURATION).delay(
            (textLines.length + 1) * DELAY_BETWEEN,
          )}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{onPressText}</Text>
        </Animated.View>
      </Pressable>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  text: {
    wordWrap: "anywhere",
    maxWidth: "70%",
    fontSize: 24,
    fontFamily: "typewriter",
    color: "#765023",
    textAlign: "center",
    paddingVertical: 16,
  },
  button: {
    backgroundColor: "#765023",
    width: "100%",
    borderRadius: 10,
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
  },
});
