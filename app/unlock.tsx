import { BackgroundTexture } from "@components/BackgroundTexture";
import { useGame } from "@state/Context";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const skeletonImage = require("../assets/images/skeleton.svg");

export default function Unlock() {
  const { contentUnlocked, updateContentUnlocked} = useGame();
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  if (contentUnlocked) {
    return <Redirect href="/" />;
  }

  const checkCode = () => {
    setError(false);
    if (
      code.trim().toLowerCase() === "aleenatest" ||
      code.trim().toLowerCase() === "deceit"
    ) {
      updateContentUnlocked(true);
      setSuccess(true);
      setTimeout(() => {
        return <Redirect href="/" />;
      }, 2000);
    } else {
      setError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <BackgroundTexture />
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.container}>
          <Image source={skeletonImage} style={styles.backgroundImage} />
          <Image
            source={skeletonImage}
            style={styles.backgroundImageReversed}
          />
          <Text style={styles.header}>Lie To Him</Text>

          <View style={styles.columnStack}>
            <Text style={[styles.text]}>
              This app is intended as a mobile companion to the zine, which
              includes full game rules and artwork.
            </Text>
            <Text style={[styles.text]}>
              For the full app experience, please enter your access code below.
              If you already purchased the zine, find your access code on the
              final page!
            </Text>

            <TextInput
              style={styles.input}
              placeholderTextColor="#765023"
              placeholder="Enter your access code"
              onChangeText={(e) => setCode(e)}
              value={code}
            />

            <Pressable style={styles.button} onPress={checkCode}>
              <Text style={styles.buttonText}>Submit Code</Text>
            </Pressable>

            {success && (
              <Text style={styles.text}>
                Success! Your game content is unlocked!
              </Text>
            )}
            {error && (
              <Text style={styles.text}>
                We couldn&apos;t find that code. Please try again. (Contact
                Michelle through itch.io if you think this is a mistake!)
              </Text>
            )}

            <Pressable style={styles.button} onPress={() => router.push("/")}>
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
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
  header: {
    color: "#843b2d",
    marginBottom: 8,
    fontFamily: "rocker",
    fontSize: 64,
  },
  columnStack: {
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    paddingHorizontal: 12,
    width: "100%",
  },
  button: {
    backgroundColor: "#765023",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    color: "#e7cda7",
  },
  buttonText: {
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
  },
  input: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#765023",
  },
  text: {
    fontSize: 16,
    padding: 8,
    color: "#000",
    textAlign: "left",
    fontFamily: "typewriter",
  },
});
