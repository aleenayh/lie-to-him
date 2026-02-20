import { StyleSheet, View } from "react-native";

export function TowerRow({ rowIndex }: { rowIndex: number }) {
  const faceLeft = rowIndex % 2 === 0;

  const pos = ["farthestRight", "middle", "farthestLeft"] as const;

  if (faceLeft) {
    return (
      <View style={styles.row}>
        {Array.from({ length: 3 }).map((_, blockIndex) => (
          <LeftFacingBlock
            key={`${rowIndex}-left-facing-block-${
              // biome-ignore lint/suspicious/noArrayIndexKey: visual only
              blockIndex
            }`}
            pos={pos[blockIndex] as (typeof pos)[number]}
          />
        ))}
        <LongSideTowerLeft />
      </View>
    );
  } else {
    return (
      <View style={styles.row}>
        <LongSideTowerRight />
        {Array.from({ length: 3 }).map((_, blockIndex) => (
          <RightFacingBlock
            key={`${rowIndex}-right-facing-block-${
              // biome-ignore lint/suspicious/noArrayIndexKey: visual only
              blockIndex
            }`}
            pos={pos[blockIndex]}
          />
        ))}
      </View>
    );
  }
}

function LongSideTowerRight() {
  return (
    <View
      style={[
        styles.block,
        styles.longSide,
        styles.leftFacing,
        styles.longRightPosition,
      ]}
    />
  );
}

function LongSideTowerLeft() {
  return (
    <View
      style={[
        styles.block,
        styles.longSide,
        styles.rightFacing,
        styles.longLeftPosition,
      ]}
    />
  );
}

function LeftFacingBlock({
  pos,
}: {
  pos: "farthestRight" | "middle" | "farthestLeft";
}) {
  return (
    <View
      style={[
        styles.block,
        styles.shortSide,
        styles.leftFacing,
        pos === "farthestRight" && styles.centerLeftBlock,
        pos === "middle" && styles.middleLeftBlock,
        pos === "farthestLeft" && styles.farthestLeftBlock,
      ]}
    />
  );
}

function RightFacingBlock({
  pos,
}: {
  pos: "farthestRight" | "middle" | "farthestLeft";
}) {
  return (
    <View
      style={[
        styles.block,
        styles.shortSide,
        styles.rightFacing,
        pos === "farthestRight" && styles.farthestRightBlock,
        pos === "middle" && styles.middleRightBlock,
        pos === "farthestLeft" && styles.centerRightBlock,
      ]}
      />
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "visible",
    minHeight: 18,
  },
  block: {
    position: "absolute",
    backgroundColor: "#e7cda7",
    borderColor: "#9a5341",
    borderWidth: 1,
    height: 20,
  },
  longSide: {
    width: 60,
    bottom: 0,
    zIndex: -1,
    transform: [{ perspective: 1000 }],
  },
  longRightPosition: {
    right: 0,
  },
  longLeftPosition: {
    right: -60,
  },
  shortSide: {
    width: 20,
  },
  leftFacing: {
    transform: [{ rotate: "8deg" }, { perspective: 1 }],
  },
  rightFacing: {
    transform: [{ rotate: "-8deg" }, { perspective: 1000 }],
  },
  farthestRightBlock: {
    right: -60,
    bottom: 0,
    backgroundColor: "yellow", //todo remove
  },
  middleRightBlock: {
    right: -40,
    bottom: -2,
    backgroundColor: "orange", //todo remove
  },
  centerRightBlock: {
    right: -20,
    bottom: -5,
    backgroundColor: "purple", //todo remove
  },
  centerLeftBlock: {
    right: 0,
    bottom: -5,
    backgroundColor: "pink", //todo remove
  },
  middleLeftBlock: {
    right: 20,
    bottom: -2,
    backgroundColor: "brown", //todo remove
  },
  farthestLeftBlock: {
    right: 40,
    bottom: 0,
    backgroundColor: "cyan", //todo remove
  },
});
