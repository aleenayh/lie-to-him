import { StyleSheet, Text, View } from "react-native";

export default function ContentBlocked() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You've reach the end of the demo.</Text>

      <Text style={styles.description}>
        To play the full game, visit the unlock page and enter an access code.
      </Text>

      <Text style={styles.description}>Don't have an access code yet?</Text>

      <Text style={styles.description}>
        You can get one by buying the game on itch.io
      </Text>
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
    gap: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#9a5341",
    fontFamily: "typewriter",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "#9a5341",
    fontFamily: "typewriter",
    marginBottom: 10,
  },
});
