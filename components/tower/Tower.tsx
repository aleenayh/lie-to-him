import { Canvas } from "@react-three/fiber";
import { useGame } from "@state/Context";
import { GameState } from "@state/schema";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TowerRow } from "./TowerRow";

export default function Tower() {
  const { gameState, updateGameState } = useGame();
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

    let shouldCollapse = false;
    if (velocity > 0.5) {
      shouldCollapse = true;
    } else {
      if (isUnstable(tower, rowIndex, blockIndex)) {
        shouldCollapse = true;
      }
    }
    if (shouldCollapse) {
      updateGameState({
        ...gameState,
        tower: {
          ...tower,
          collapsed: true,
        },
      });
    } else {
      updateGameState({
        ...gameState,
        tower: {
          ...tower,
          rows: tower.rows.map((row, index) =>
            index === rowIndex
              ? row.map((block, blockIdx) =>
                  blockIdx === blockIndex ? false : block,
                )
              : row,
          ),
        },
      });
    }
    setTappedBlock(null);
    setTappedRow(null);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.text}>
        Pull {remainingBlockPulls} block{remainingBlockPulls === 1 ? "" : "s"}{" "}
        from your tower
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
        {tower.rows.map((row, index) => (
          <TowerRow
            key={`tower-row-${
              // biome-ignore lint/suspicious/noArrayIndexKey: yolo
              index
            }`}
            blocks={row as [boolean, boolean, boolean]}
            rowIndex={index}
            disabled={remainingBlockPulls === 0}
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

/** formula to evaluate whether the tower should collapse. returns true or false, true triggers collapse */
function isUnstable(
  tower: GameState["tower"],
  rowIndex: number,
  blockIndex: number,
): boolean {
  const collapseThreshold = 1;
  console.log("checkStability", rowIndex, blockIndex);
  const rowAbove = tower.rows[rowIndex + 1];
  const rowBelow = tower.rows[rowIndex - 1];
  const thisRow = tower.rows[rowIndex];
  //this shouldn't happen, but if it does we'll let you keep your monstrosity tower
  if (!thisRow) return false;

  //auto collapse if this is the last block in the row
  const remainingBlocksInRow = thisRow.filter(Boolean).length - 1; //-1 for current block
  if (remainingBlocksInRow <= 0) return true;

  //determine if tower leans left or right more

  const leftBlocks = tower.rows.reduce((acc, row, index) => {
    if (index === 2) {
      return acc + row.filter(Boolean).length;
    }
    return acc;
  }, 0);
  const rightBlocks = tower.rows.reduce((acc, row, index) => {
    if (index === 2) {
      return acc + row.filter(Boolean).length;
    }
    return acc;
  }, 0);
  const towerLeanAmount = Math.abs(leftBlocks - rightBlocks);
  const leansMyWay =
    blockIndex === 0
      ? leftBlocks < rightBlocks
      : blockIndex === 2
        ? leftBlocks > rightBlocks
        : false;

  if (towerLeanAmount > 3 && !leansMyWay) return true;

  //bottom rows effect the stability of the tower more than upper rows
  const stabilityOfRowCoefficient = 1.26 - 0.09 * rowIndex;

  let stabilityOfBlockCoefficient = 0.5;
  if (remainingBlocksInRow === 1) {
    stabilityOfBlockCoefficient = blockIndex === 1 ? 0.8 : 0.3;
  } else {
    stabilityOfBlockCoefficient = blockIndex === 1 ? 0.5 : 0.7;
  }

  //more surrounding blocks = more stable
  const surroundingBlocks =
    [
      ...(rowIndex === 17 ? [] : rowAbove),
      ...(rowIndex === 0 ? [] : rowBelow),
    ].filter(Boolean).length + remainingBlocksInRow;
  const surroundTotal = rowIndex === 17 || rowIndex === 0 ? 5 : 8;
  const stabilitySurroundingCoeffienct =
    (surroundTotal - surroundingBlocks) / surroundTotal;

  const stability =
    stabilityOfRowCoefficient * stabilityOfBlockCoefficient -
    stabilitySurroundingCoeffienct;
  // console.log(
  //   `stabiilty for row ${rowIndex} block ${blockIndex} is ${stability} - calc from row coeff ${stabilityOfRowCoefficient} * block coeff ${stabilityOfBlockCoefficient} - surrounding coeff ${stabilitySurroundingCoeffienct}`,
  // );

  return stability >= collapseThreshold;
}
