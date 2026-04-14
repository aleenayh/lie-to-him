import { useGame } from "@state/Context";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

const skullImage = require("../assets/images/skullLight.svg");

export default function Journal({ onSwipeAway }: { onSwipeAway: () => void }) {
  return (
    <Swipeable
      onSwipeableOpen={onSwipeAway}
      renderLeftActions={() => (
        <View style={[styles.swipePreview, styles.swipePreviewLeft]}>
          <Text style={[styles.swipePreviewText, styles.swipePreviewTextLeft]}>
            Back to Game
          </Text>
        </View>
      )}
      leftThreshold={100}
    >
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={styles.outerContainer}
      >
        <Text style={styles.header}>Journal</Text>
        <JournalInterior variant="tan" />

        <Pressable
          onPress={onSwipeAway}
          style={{
            position: "absolute",
            left: 10,
            bottom: 15,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Image source={skullImage} style={styles.teaserButton} />
          <Text style={[styles.header, { fontSize: 18 }]}>Back to Game</Text>
        </Pressable>
      </Pressable>
    </Swipeable>
  );
}

export function JournalInterior({
  variant,
  hideIfEmpty = false,
}: {
  variant: "tan" | "brown";
  hideIfEmpty?: boolean;
}) {
  const { gameState, updateGameState } = useGame();
  const [journalText, setJournalText] = useState(gameState.journal);

  const saveJournal = () => {
    updateGameState({ ...gameState, journal: journalText });
    ToastAndroid.show("Journal saved", ToastAndroid.SHORT);
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(journalText || "");
    ToastAndroid.show("Journal copied to clipboard", ToastAndroid.SHORT);
  };

  if (hideIfEmpty && gameState.journal?.length === 0) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={[
          styles.input,
          hideIfEmpty ? { height: "50%" } : { height: "100%" },
        ]}
        multiline={true}
        textAlignVertical="top"
        value={journalText}
        onChangeText={setJournalText}
        textBreakStrategy="simple"
        autoCapitalize="sentences"
      />
      <Pressable onPress={hideIfEmpty ? copyToClipboard : saveJournal}>
        <Text style={variant === "tan" ? styles.buttonTan : styles.buttonBrown}>
          {hideIfEmpty ? "Copy Journal" : "Save Journal"}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#765023",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    maxHeight: "60%",
    overflowY: "auto",
    width: "100%",
    marginVertical: 16,
  },
  header: {
    color: "papayawhip",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "rocker",
    fontSize: 24,
  },
  buttonTan: {
    backgroundColor: "rgba(255, 239, 213, 0.5)",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    color: "#765023",
    fontFamily: "typewriter",
    fontSize: 24,
  },
  buttonBrown: {
    backgroundColor: "#765023",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    margin: 0,
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
  },
  input: {
    backgroundColor: "rgba(255, 239, 213, 0.5)",
    width: "80%",
    maxWidth: "90%",
    height: "100%",
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#765023",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontFamily: "typewriter",
    fontSize: 14,
    wordWrap: "break-word",
  },
  swipePreview: {
    backgroundColor: "#765023",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
  swipePreviewLeft: {
    alignItems: "flex-start",
  },
  swipePreviewText: {
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
  },
  swipePreviewTextLeft: {
    transform: [{ rotate: "-90deg" }],
  },
  teaserButton: {
    width: 50,
    height: 50,
    resizeMode: "center",
  },
});
