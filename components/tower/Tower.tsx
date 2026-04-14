import { Canvas } from "@react-three/fiber";
import { useGame } from "@state/Context";
import type { GameState } from "@state/schema";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TowerRow } from "./TowerRow";

export default function Tower({
  setContinueButtonEnabled,
}: {
  setContinueButtonEnabled: (enabled: boolean) => void;
}) {
  const { gameState, updateGameState } = useGame();
  const { tower, dishonesty } = gameState;
  const [remainingBlockPulls, setRemainingBlockPulls] = useState(
    tower.nextBlockPull + dishonesty,
  );
  useEffect(() => {
    if (remainingBlockPulls <= 0 || tower.collapsed) {
      setContinueButtonEnabled(true);
    } else {
      setContinueButtonEnabled(false);
    }
  }, [remainingBlockPulls, setContinueButtonEnabled, tower.collapsed]);

  const textOpacity = useSharedValue(1);
  const fadeOut = useCallback(
    (duration: number) => {
      textOpacity.value = withTiming(0, {
        duration,
        easing: Easing.linear,
      });
    },
    [textOpacity],
  );

  useEffect(() => {
    if (tower.collapsed) {
      fadeOut(1500);
    }
  }, [fadeOut, tower.collapsed]);
  const fadingStyle = useAnimatedStyle(() => {
    return {
      ...styles.text,
      opacity: textOpacity.value,
    };
  });

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
    if (remainingBlockPulls === 1) {
      fadeOut(0);
    }
    setRemainingBlockPulls((prev) => prev - 1);

    let shouldCollapse = false;
    const { collapse, leanDirection, leanAmount } = isUnstable(
      tower,
      rowIndex,
      blockIndex,
      velocity,
    );
    if (velocity > 0.8) {
      shouldCollapse = true;
    } else {
      if (collapse) {
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
          leanDirection: leanDirection,
          leanAmount: leanAmount,
        },
      });
    }
    setTappedBlock(null);
    setTappedRow(null);
  };

  return (
    <View style={styles.page}>
      <Animated.Text style={fadingStyle}>
        Pull {remainingBlockPulls} block{remainingBlockPulls === 1 ? "" : "s"}{" "}
        from your tower
      </Animated.Text>
      <Canvas
        style={{ height: 100, width: 250 }}
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
    backgroundColor: "#765023",
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
  velocity: number,
): {
  collapse: boolean;
  leanDirection?: "left" | "right";
  leanAmount?: number;
} {
  const collapseThreshold = 0.24;
  const rowAbove = tower.rows[rowIndex + 1] ?? [false, false, false];
  const rowBelow = tower.rows[rowIndex - 1] ?? [false, false, false];
  const thisRow = tower.rows[rowIndex];
  //this shouldn't happen, but if it does we'll let you keep your monstrosity tower
  if (!thisRow) return { collapse: false };

  //auto collapse if this is the last block in the row
  const remainingBlocksInRow = thisRow.filter(Boolean).length - 1; //-1 for current block
  if (remainingBlocksInRow <= 0 && rowAbove.filter(Boolean).length > 0)
    return { collapse: true };

  const rowStability =
    blockIndex === 0
      ? 1 - velocity
      : (remainingBlocksInRow / 3) * (1 - velocity);

  //determine if tower leans left or right more
  let leftBlocks = blockIndex === 0 ? -1 : 0;
  let rightBlocks = blockIndex === 2 ? -1 : 0;
  for (let i = 0; i < tower.rows.length; i++) {
    leftBlocks += tower.rows[i].filter(
      (block, index) => index === 0 && block,
    ).length;
    rightBlocks += tower.rows[i].filter(
      (block, index) => index === 2 && block,
    ).length;
  }
  const towerLeanAmount = Math.abs(leftBlocks - rightBlocks);
  const leansMyWay =
    blockIndex === 0
      ? leftBlocks < rightBlocks
      : blockIndex === 2
        ? leftBlocks > rightBlocks
        : false;
  if (towerLeanAmount > 3 && leansMyWay)
    return {
      collapse: true,
      leanDirection: leansMyWay ? "left" : "right",
      leanAmount: towerLeanAmount,
    };
  const leanDirection = leftBlocks < rightBlocks ? "left" : "right";
  const leanAmount = towerLeanAmount;

  //bottom rows effect the stability of the tower more than upper rows
  const stabilityOfRowCoefficient = 1.26 - 0.09 * rowIndex;

  //more surrounding blocks = more stable
  const surroundingBlocks =
    [
      ...(rowIndex === 17 ? [] : rowAbove),
      ...(rowIndex === 0 ? [] : rowBelow),
    ].filter(Boolean).length + remainingBlocksInRow;
  const surroundTotal = rowIndex === 17 || rowIndex === 0 ? 5.25 : 8.25; //intentionally +1/4 to avoid zeros
  const stabilitySurroundingCoeffienct =
    (surroundTotal - surroundingBlocks) / surroundTotal;

  const netStability =
    -stabilityOfRowCoefficient * stabilitySurroundingCoeffienct * velocity +
    rowStability;

  // console.log(
  //   `netStability: ${netStability} = stabilityOfRowCoefficient: -${stabilityOfRowCoefficient} * stabilitySurroundingCoeffienct: ${stabilitySurroundingCoeffienct} * velocity: ${velocity} + rowStability: ${rowStability}`,
  // );
  // console.log(
  //   `will collapse: ${netStability < collapseThreshold} (threshold: ${collapseThreshold})`,
  // );

  return {
    collapse: netStability < collapseThreshold,
    leanDirection,
    leanAmount,
  };
}
