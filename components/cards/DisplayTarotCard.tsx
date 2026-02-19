import { Image, StyleSheet, Text, View } from "react-native";
import type { CardDetails } from "./cards";

type CardDetailInputs = {
  card: CardDetails;
  reversed: boolean;
  drawnIsHigher: boolean;
  difference: number;
}

export default function DisplayTarotCard({
 inputs
}: {
  inputs: CardDetailInputs;
}) {
  const { card, reversed, drawnIsHigher, difference } = inputs;
  const description = getDescription(card, reversed, drawnIsHigher);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {card.name}
        {reversed && card.type === "majorArcana" ? ": Reversed" : ""}
      </Text>
      <View style={styles.imageContainer}>
        {card.image && (
          <Image
            source={card.image}
            style={[
              styles.image,
              (reversed && card.type === "majorArcana") && styles.reversedImage,
            ]}
          />
        )}
      </View>
      <Text style={styles.description}>{description}</Text>

      {drawnIsHigher && (
        <Text style={styles.description}>
          (This will flip your story card for {card.type} and {getEffect(difference)})
        </Text>
      )}
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
    height: "75%",
    aspectRatio: 9 / 16,
    width: "auto",
    padding: 10,
    borderWidth: 2,
    borderColor: "#e7cda7",
    overflow: "hidden",
  },
  image: {
    resizeMode: "center",
    opacity: 0.8,
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
    return "increase desperation by 1."
  } 
  if (difference <= 6) {
    return "increase dishonesty by 1."
  }
  if (difference <= 9) {
    return "increase desperation by 2, pull 2 blocks."
  }
  if (difference <= 12) {
    return "increase dishonesty by 2, pull 2 blocks."
  }
  return "have no additional effect.";
}