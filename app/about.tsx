import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const skeletonImage = require("../assets/images/skeleton.svg");

export default function Unlock() {
  return (
    <View style={styles.container}>
      <Image source={skeletonImage} style={styles.backgroundImage} />
      <Image source={skeletonImage} style={styles.backgroundImageReversed} />
      <Text style={styles.header}>Lie To Him</Text>
      <View style={styles.interior}>
        <View style={styles.columnStack}>
          <Text style={styles.credit}>Game Design by Michelle Kelly</Text>
          <Link href="https://michellicopter.itch.io">
            <Text style={styles.linkText}>michellicopter.itch.io</Text>
          </Link>
        </View>
        <View style={styles.columnStack}>
          <Text style={styles.credit}>
            Zine Cover Design [and spot illustrations] by Jen Vaughn
          </Text>
          <Link href="https://artstation.com/thejenya">
            <Text style={styles.linkText}>artstation.com/thejenya</Text>
          </Link>
        </View>
        <View style={styles.columnStack}>
          <Text style={styles.credit}>Zine Layout by Francita Soto</Text>
          <Link href="https://byfrancita.carrd.co">
            <Text style={styles.linkText}>byfrancita.carrd.co</Text>
          </Link>
        </View>
        <View style={styles.columnStack}>
          <Text style={styles.credit}>Companion App by Aleena Yunuba</Text>
          <Link href="https://github.com/aleenayh">
            <Text style={styles.linkText}>github.com/aleenayh</Text>
          </Link>
        </View>
        <View style={styles.columnStack}>
          <Text style={styles.credit}>
            Playtesting by Sam Langford, ReprobateGamer, and JC Darcy.
          </Text>
        </View>
        <View style={styles.columnStack}>
          <Text style={styles.text}>
            This work is based on the Standing Ovation SRD created by
            InnocentGoblin TTRPGs and licensed for use under Creative Commons
            Attribution-ShareAlike 4.0 International.
          </Text>
        </View>
        <View style={styles.columnStack}>
          <Text style={styles.text}>
            Lie To Him is proudly human made. No generative AI was used in the
            creation of the zine or app.
          </Text>
        </View>
      </View>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.button}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "papayawhip",
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
  interior: {
    backgroundColor: "rgba(255, 239, 213, 0.5)",
    maxHeight: "70%",
    overflowY: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  button: {
    backgroundColor: "#9a5341",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
  },
  linkText: {
    color: "#843b2d",
    textDecorationLine: "underline",
    fontFamily: "typewriter",
    fontSize: 12,
  },
  text: {
    color: "#9a5341",
    fontSize: 12,
    padding: 8,
    textAlign: "left",
    fontFamily: "typewriter",
  },
  credit: {
    color: "#843b2d",
    fontFamily: "rocker",
    fontSize: 16,
  },
  columnStack: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 0,
    marginBottom: 4,
    width: "100%",
  },
});
