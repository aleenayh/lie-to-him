import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type { CardDetails } from "./cards";

type CardDetailInputs = {
  card: CardDetails;
  reversed: boolean;
  drawnIsHigher: boolean;
  difference: number;
};

export default function DisplayTarotCard({
  inputs,
}: {
  inputs: CardDetailInputs;
}) {
  const { card, reversed, drawnIsHigher, difference } = inputs;
  const description = getDescription(card, reversed, drawnIsHigher);

  const fadeOut = useAnimatedStyle(() => {
    return {
      opacity: withTiming(0, { duration: 3000 }),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        key={`fadeInText-${card.name}`}
        entering={FadeIn.duration(0)}
        exiting={FadeOut}
        style={[styles.cover, { opacity: 1 }, fadeOut]}
      >
        <Text style={styles.coverText}>Lie to Him</Text>
      </Animated.View>
      <Animated.View
        key={card.name}
        style={styles.container}
        entering={FadeIn.duration(3000).delay(1000)}
        exiting={FadeOut}
      >
        <Text style={styles.title}>
          {card.name}
          {reversed && card.type === "majorArcana"
            ? ": Reversed"
            : card.type === "majorArcana"
              ? ": Upright"
              : ""}
        </Text>
        <View style={styles.imageContainer}>
          {card.image && (
            <Image
              source={card.image}
              style={[
                styles.image,
                reversed && card.type === "majorArcana" && styles.reversedImage,
              ]}
            />
          )}
        </View>
        <Text style={styles.description}>{description}</Text>

        {drawnIsHigher && card.type !== "majorArcana" && (
          <Text style={styles.description}>
            (This will flip your story card for {card.type})
          </Text>
        )}
        {card.type !== "majorArcana" && !drawnIsHigher && (
          <Text style={styles.description}>
            (This will {getEffect(difference)})
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7cda7",
  },
  coverText: {
    fontSize: 120,
    textAlign: "center",
    color: "#9a5341",
    fontFamily: "typewriter",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#9a5341",
    fontFamily: "typewriter",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#9a5341",
    fontFamily: "typewriter",
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    aspectRatio: 9 / 16,
    width: "90%",
    borderWidth: 2,
    borderColor: "#e7cda7",
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
    opacity: 0.7,
    zIndex: -1,
    inset: 0,
  },
  reversedImage: {
    transform: [{ rotate: "180deg" }],
  },
});

function getDescription(
  card: CardDetails,
  reversed: boolean,
  drawnIsHigher: boolean,
) {
  if (card.type === "majorArcana") {
    return reversed ? card.descriptionReversed : card.descriptionUpright;
  }
  switch (card.type) {
    case "wands":
      return drawnIsHigher
        ? "Appeal to his emotions. He doubts you when your passion is performative."
        : "Appeal to his emotions. He believes you when you break his heart.";
    case "cups":
      return drawnIsHigher
        ? "Overwhelm him with details. He doubts you when the details begin to contradict each other."
        : "Overwhelm him with details. He believes you when the specificity feels real.";
    case "pentacles":
      return drawnIsHigher
        ? "Disarm him with logic. He doubts you when your argument is fallacious or circular."
        : "Disarm him with logic. He believes you when you confuse him with complexity.";
    case "swords":
      return drawnIsHigher
        ? "Intimidate him with your certainty. He doubts you when his anger rears its head in response."
        : "Intimidate him with your certainty. He believes you when the force of your argument beats his doubts away.";
  }
}

function getEffect(difference: number) {
  if (difference <= 3) {
    return "increase desperation by 1.";
  }
  if (difference <= 6) {
    return "increase dishonesty by 1.";
  }
  if (difference <= 9) {
    return "increase desperation by 2, pull 2 blocks.";
  }
  if (difference <= 12) {
    return "increase dishonesty by 2, pull 2 blocks.";
  }
  return "have no additional effect.";
}
