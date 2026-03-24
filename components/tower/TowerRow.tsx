import type { ThreeElements, ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useGame } from "@state/Context";
import { useRef } from "react";
import type * as THREE from "three";

export function TowerRow({
  blocks,
  rowIndex,
  disabled,
  handleBlockMove,
  handleBlockTap,
  tappedRow,
  tappedBlock,
}: {
  blocks: [boolean, boolean, boolean];
  rowIndex: number;
  handleBlockMove: (
    rowIndex: number,
    blockIndex: number,
    velocity: number,
  ) => void;
  disabled: boolean;
  tappedRow: number | null;
  tappedBlock: number | null;
  handleBlockTap: (rowIndex: number, blockIndex: number) => void;
}) {
  const faceLeft = rowIndex % 2 === 0;
  const OFFSET_Y = 2.2;

  //TODO - build visual clue that tower is leaning

  if (faceLeft) {
    return (
      <group position={[-0.6, 0.345 * rowIndex - OFFSET_Y, -0.9]}>
        {blocks.map((block, blockIndex) => {
          if (!block) return null;
          return (
            <Block
              key={`block-${rowIndex}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: yolo
                blockIndex
              }`}
              disabled={disabled}
              props={{
                position: [
                  0.4 * blockIndex,
                  -0.18 * blockIndex,
                  0.45 * blockIndex,
                ],
                rotation: [0.34, -0.9, 0],
              }}
              color={blockIndex === 1 ? "#a87f4e" : "#8b6434"}
              handleBlockMove={(velocity: number) =>
                handleBlockMove(rowIndex, blockIndex, velocity)
              }
              handleBlockTap={() => handleBlockTap(rowIndex, blockIndex)}
              tapped={tappedRow === rowIndex && tappedBlock === blockIndex}
            />
          );
        })}
      </group>
    );
  } else {
    return (
      <group position={[-0.6, 0.345 * rowIndex - OFFSET_Y - 0.3, -0.1]}>
        {blocks.map((block, blockIndex) => {
          if (!block) return null;
          return (
            <Block
              key={`block-${rowIndex}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: yolo
                blockIndex
              }`}
              disabled={disabled}
              props={{
                position: [
                  0.48 * blockIndex,
                  0.13 * blockIndex,
                  -0.34 * blockIndex,
                ],
                rotation: [0.34, 0.72, 0],
              }}
              color={blockIndex === 1 ? "#a87f4e" : "#997243"}
              handleBlockMove={(velocity: number) =>
                handleBlockMove(rowIndex, blockIndex, velocity)
              }
              handleBlockTap={() => handleBlockTap(rowIndex, blockIndex)}
              tapped={tappedRow === rowIndex && tappedBlock === blockIndex}
            />
          );
        })}
      </group>
    );
  }
}

export function Block({
  disabled,
  props,
  color,
  handleBlockMove,
  tapped,
  handleBlockTap,
}: {
  disabled: boolean;
  props: ThreeElements["mesh"];
  color?: string;
  handleBlockMove: (velocity: number) => void;
  handleBlockTap: () => void;
  tapped: boolean;
}) {
  const {
    gameState: {
      tower: { collapsed },
    },
  } = useGame();

  const ref = useRef<THREE.Mesh>(null);
  const pointerStart = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const pointerCurrent = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );

  const randomPosOrNeg = () => {
    return Math.random() > 0.5 ? 1 : -1;
  };

  const randomRotationX = Math.random() * randomPosOrNeg() * 0.01;
  const randomRotationY = Math.random() * -0.001;
  const randomTransformX =
    Math.max(Math.random(), 0.001) * randomPosOrNeg() * 0.02;

  useFrame(() => {
    if (ref.current && collapsed) {
      ref.current.position.x = ref.current.position.x + randomTransformX;
      ref.current.position.y = ref.current.position.y - 0.01;
      ref.current.rotation.x = ref.current.rotation.x + randomRotationX;
      ref.current.rotation.y = ref.current.rotation.y + randomRotationY;
    } else if (ref.current && pointerCurrent.current && pointerStart.current) {
      const dx = pointerCurrent.current.x - pointerStart.current.x;
      const dy = pointerCurrent.current.y - pointerStart.current.y;
      ref.current.position.x = ref.current.position.x + dx * 0.0005;
      ref.current.position.y = ref.current.position.y - dy * 0.0005;
    }
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (disabled) return;
    e.stopPropagation();
    handleBlockTap();
    (e.target as Element).setPointerCapture(e.pointerId);
    pointerStart.current = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      time: Date.now(),
    };
    pointerCurrent.current = null;
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (disabled) return;
    e.stopPropagation();
    if (!pointerStart.current) return;
    pointerCurrent.current = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      time: Date.now(),
    };
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (disabled) return;
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    if (!pointerStart.current) return;
    const end = pointerCurrent.current ?? {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      time: Date.now(),
    };
    const dx = end.x - pointerStart.current.x;
    const dy = end.y - pointerStart.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dt = end.time - pointerStart.current.time;
    const velocity = dist / Math.max(dt, 1);
    pointerStart.current = null;
    pointerCurrent.current = null;
    if (dist > 30) {
      handleBlockMove(velocity);
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <boxGeometry args={[0.65, 0.32, 1.7]} />
      <meshStandardMaterial color={tapped ? "#d4a15c" : (color ?? "#765023")} />
    </mesh>
  );
}
