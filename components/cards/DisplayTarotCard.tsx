import { Image, StyleSheet, Text, View } from "react-native";
import { cards } from "./cards";

export default function DisplayTarotCard({ cardKey }: { cardKey: string }) {
  const card = cards[cardKey];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{card.name}</Text>
      <View style={styles.imageContainer}>
        {card.image && <Image source={card.image} style={styles.image} />}
      </View>
      <Text style={styles.description}>card description</Text>
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
});
