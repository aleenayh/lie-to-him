import { useGame } from "@state/Context";
import type { GameState } from "@state/schema";
import { Image } from "expo-image";
import { useState } from "react";
import {
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { tarotImages } from "../assets/images/tarot";
import DescriptionOfSuit from "./cards/DescriptionOfSuit";
import ModalComponent from "./Modal";

export default function StoryHolder() {
  const {
    gameState: { story },
  } = useGame();
  const images = findImagesFromValues(story);

  const [modalDescriptionSuit, setModalDescriptionSuit] = useState<
    "swords" | "wands" | "cups" | "pentacles"
  >("swords");
  const [modalOpen, setModalOpen] = useState(false);

  const openModalForSuit = (
    suit: "swords" | "wands" | "cups" | "pentacles",
  ) => {
    setModalDescriptionSuit(suit);
    setModalOpen(true);
  };
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.column}>
        <Text style={styles.title}> Your Story</Text>
        <View style={styles.row}>
          <Pressable
            style={[styles.imageContainer]}
            onPress={() => openModalForSuit("swords")}
          >
            <Image source={images.swords} style={styles.image} />
          </Pressable>
          <Pressable
            style={[styles.imageContainer]}
            onPress={() => openModalForSuit("wands")}
          >
            <Image source={images.wands} style={styles.image} />
          </Pressable>
          <Pressable
            style={[styles.imageContainer]}
            onPress={() => openModalForSuit("cups")}
          >
            <Image source={images.cups} style={styles.image} />
          </Pressable>
          <Pressable
            style={[styles.imageContainer]}
            onPress={() => openModalForSuit("pentacles")}
          >
            <Image source={images.pentacles} style={styles.image} />
          </Pressable>
        </View>
      </View>
      <ModalComponent
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <DescriptionOfSuit suit={modalDescriptionSuit} image={images[modalDescriptionSuit]} />
      </ModalComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    width: "100%",
    height: 150,
    overflow: "visible",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#9a5341",
    fontFamily: "typewriter",
    marginBottom: 10,
  },
  row: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    overflow: "visible",
    minHeight: 160,
  },
  imageContainer: {
    flex: 1,
    display: "flex",
  },
  image: {
    resizeMode: "contain",
    width: "auto",
    height: 150,
  },
});

function findImagesFromValues(story: GameState["story"]): {
  wands: ImageSourcePropType;
  cups: ImageSourcePropType;
  pentacles: ImageSourcePropType;
  swords: ImageSourcePropType;
} {
  const cleanedValue = (value: number) => {
    if (value === 11) {
      return "page";
    } else if (value === 12) {
      return "knight";
    } else if (value === 13) {
      return "queen";
    } else if (value === 14) {
      return "king";
    } else if (value === 1) {
      return "ace";
    }
    return value;
  };
  const wands = cleanedValue(story.wands.cardValue);
  const cups = cleanedValue(story.cups.cardValue);
  const pentacles = cleanedValue(story.pentacles.cardValue);
  const swords = cleanedValue(story.swords.cardValue);

  const flippedImg = tarotImages.cardBack;

  const images = {
    wands: story.wands.flipped ? flippedImg : tarotImages[`wands_${wands}`],
    cups: story.cups.flipped ? flippedImg : tarotImages[`cups_${cups}`],
    pentacles: story.pentacles.flipped
      ? flippedImg
      : tarotImages[`pent_${pentacles}`],
    swords: story.swords.flipped ? flippedImg : tarotImages[`swords_${swords}`],
  };
  return images;
}
