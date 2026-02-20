import { useGame } from "@state/Context";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TowerRow } from "./TowerRow";

export default function Tower() {
  const { gameState } = useGame();
  const { tower, dishonesty } = gameState;
  const [remainingBlockPulls, setRemainingBlockPulls] = useState(
    tower.nextBlockPull + dishonesty,
  );

  const handleBlockMove = () => {
    setRemainingBlockPulls((prev) => prev - 1);
    //TODO
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.page}>
        <Text style={styles.text}>
          Pull {remainingBlockPulls} blocks from your tower
        </Text>

        {Array.from({ length: 10 }).map((_, index) => (
          <TowerRow
            key={`tower-row-${
              // biome-ignore lint/suspicious/noArrayIndexKey: yolo
              index
            }`}
            rowIndex={index}
          />
        ))}
        <Pressable
          onPress={handleBlockMove}
          style={[styles.button, remainingBlockPulls <= 0 && styles.disabled]}
          disabled={remainingBlockPulls <= 0}
        >
          <Text style={styles.text}>Pull Block</Text>
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  button: {
    backgroundColor: "#9a5341",
    width: "80%",
    borderRadius: 10,
    marginHorizontal: "auto",
    marginVertical: 10,
    textAlign: "center",
    color: "#e7cda7",
  },
  text: {
    fontSize: 24,
    padding: 8,
    textAlign: "center",
    fontFamily: "typewriter",
  },
  disabled: {
    opacity: 0.8,
  },
});
