import { Canvas } from "@react-three/fiber";
import { useGame } from "@state/Context";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TowerRow } from "./TowerRow";

export default function Tower() {
  const { gameState } = useGame();
  const { tower, dishonesty } = gameState;
  const [remainingBlockPulls, setRemainingBlockPulls] = useState(
    tower.nextBlockPull + dishonesty,
  );
  const [tappedRow, setTappedRow] = useState<number | null>(null);
  const [tappedBlock, setTappedBlock] = useState<number | null>(null);

  const handleBlockTap = (rowIndex: number, blockIndex: number) => {
    setTappedRow(rowIndex);
    setTappedBlock(blockIndex);
  };

  const handleBlockMove = (
    rowIndex: number,
    blockIndex: number,
    velocity: number,
  ) => {
    setRemainingBlockPulls((prev) => prev - 1);
    //TODO
    //console.log("pulled: ", rowIndex, blockIndex, "at speed: ", velocity);
    setTappedBlock(null);
    setTappedRow(null);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.text}>
        Pull {remainingBlockPulls} blocks from your tower
      </Text>
      <Canvas
        style={{ height: 100, width: 200 }}
        fallback={<Text>Error rendering tower!</Text>}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {Array.from({ length: 18 }).map((_, index) => (
          <TowerRow
            key={`tower-row-${
              // biome-ignore lint/suspicious/noArrayIndexKey: yolo
              index
            }`}
            rowIndex={index}
            handleBlockMove={handleBlockMove}
            tappedRow={tappedRow}
            tappedBlock={tappedBlock}
            handleBlockTap={handleBlockTap}
          />
        ))}
      </Canvas>
    </View>
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
