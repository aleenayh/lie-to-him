import { Image, StyleSheet } from "react-native";

const bgTexture = require("../assets/images/bg.webp");

export function BackgroundTexture() {
  return <Image source={bgTexture} style={styles.backgroundImage} />;
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "120%",
    height: "120%",
    zIndex: -1,
    resizeMode: "cover",
    padding: -40,
  },
});
