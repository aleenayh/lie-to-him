import DisplayTarotCard from "@/components/cards/DisplayTarotCard";
import DesperationChain from "@/components/DesperationChain";
import DishonestyChain from "@/components/DishonestyChain";
import StoryHolder from "@/components/StoryHolder";
import { useGame } from "@state/Context";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModalComponent from "../components/Modal";

export default function Game() {
  const {
    gameState: { turnCount },
  } = useGame();
  const [cardVisible, setCardVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.header}>Lie To Him</Text>
        <Text style={styles.text}>Turn {turnCount}</Text>
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
            <Pressable onPress={() => setCardVisible(true)}>
              <Text style={styles.button}>Draw</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/tower")}>
              <Text style={styles.button}>Tower</Text>
            </Pressable>
          </View>
          <DishonestyChain />
        </View>
        <StoryHolder />
      </View>
      <ModalComponent
        visible={cardVisible}
        onRequestClose={() => setCardVisible(false)}
      >
        <DisplayTarotCard cardKey="empress" />
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
