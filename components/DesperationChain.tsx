import { useGame } from "@state/Context";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  RotateInUpRight,
  RotateOutDownRight,
} from "react-native-reanimated";

const TEXT_LENGTH = 115;
const TEXT_HEIGHT = 70;
const OFFSET = (TEXT_LENGTH - TEXT_HEIGHT) / 2;
const XOFFSET = -OFFSET;
const YOFFSET = OFFSET * 2.8;

export default function DesperationChain() {
  const {
    gameState: { desperation: desperationLevel },
  } = useGame();
  return (
    <View style={chainStyles.container}>
      <View style={chainStyles.string}>
        <View style={chainStyles.chainBackground} />
        {Array.from({ length: Math.max(9, desperationLevel) }, (_, index) => {
          const filled = index + 1 <= desperationLevel;
          return filled ? (
            <Animated.View
              entering={RotateInUpRight.duration(1000)}
              exiting={RotateOutDownRight.duration(1000)}
              key={`desperation-chain-item-${
                // biome-ignore lint/suspicious/noArrayIndexKey: visual only
                index
              }`}
            >
              <View style={chainStyles.chainItemFilled} />
            </Animated.View>
          ) : (
            <View
              style={chainStyles.chainItemPlaceholder}
              key={`desperation-chain-item-${
                // biome-ignore lint/suspicious/noArrayIndexKey: visual only
                index
              }`}
            />
          );
        })}
      </View>
      <Text style={chainStyles.sidewaysText}>Desperation</Text>
    </View>
  );
}

export const chainStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: TEXT_HEIGHT / 2,
  },
  sidewaysTextContainer: {
    width: TEXT_HEIGHT,
    height: TEXT_LENGTH,
    overflow: "visible",
  },
  sidewaysText: {
    transform: [
      { rotate: "90deg" },
      { translateX: XOFFSET },
      { translateY: YOFFSET },
    ],
    width: TEXT_LENGTH,
    height: TEXT_HEIGHT,
    fontFamily: "rocker",
    fontSize: 24,
    color: "#9a5341",
    overflow: "visible",
  },
  string: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
  },
  chainBackground: {
    position: "absolute",
    zIndex: 0,
    width: 2,
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#9a5341",
  },
  chainItemFilled: {
    backgroundColor: "#9a5341",
    borderWidth: 1,
    borderColor: "#9a5341",
    borderRadius: 2,
    width: 15,
    height: 15,
    transform: [{ rotate: "45deg" }],
  },
  chainItemPlaceholder: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 2,
    width: 15,
    height: 15,
    transform: [{ rotate: "45deg" }],
  },
});
