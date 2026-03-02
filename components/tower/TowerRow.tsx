import type { ThreeElements, ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

export function TowerRow({
  rowIndex,
  handleBlockMove,
  handleBlockTap,
  tappedRow,
  tappedBlock,
}: {
  rowIndex: number;
  handleBlockMove: (
    rowIndex: number,
    blockIndex: number,
    velocity: number,
  ) => void;
  tappedRow: number | null;
  tappedBlock: number | null;
  handleBlockTap: (rowIndex: number, blockIndex: number) => void;
}) {
  const faceLeft = rowIndex % 2 === 0;
  const OFFSET_Y = 2.2;

  if (faceLeft) {
    return (
      <group position={[-0.6, 0.32 * rowIndex - OFFSET_Y, -0.9]}>
        {Array.from({ length: 3 }).map((_, blockIndex) => {
          return (
            <Block
              key={`block-${rowIndex}-${blockIndex}`}
              props={{
                position: [
                  0.4 * blockIndex,
                  -0.18 * blockIndex,
                  0.45 * blockIndex,
                ],
                rotation: [0.34, -0.9, 0],
              }}
              color={blockIndex === 1 ? "#b8634d" : "#9a5341"}
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
      <group position={[-0.6, 0.32 * rowIndex - OFFSET_Y - 0.3, -0.1]}>
        {Array.from({ length: 3 }).map((_, blockIndex) => (
          <Block
            key={`block-${rowIndex}-${blockIndex}`}
            props={{
              position: [
                0.48 * blockIndex,
                0.14 * blockIndex,
                -0.34 * blockIndex,
              ],
              rotation: [0.34, 0.7, 0],
            }}
            color={blockIndex === 1 ? "#a1523f" : "#c76a52"}
            handleBlockMove={(velocity: number) =>
              handleBlockMove(rowIndex, blockIndex, velocity)
            }
            handleBlockTap={() => handleBlockTap(rowIndex, blockIndex)}
            tapped={tappedRow === rowIndex && tappedBlock === blockIndex}
          />
        ))}
      </group>
    );
  }
}

export function Block({
  props,
  color,
  handleBlockMove,
  tapped,
  handleBlockTap,
}: {
  props: ThreeElements["mesh"];
  color?: string;
  handleBlockMove: (velocity: number) => void;
  handleBlockTap: () => void;
  tapped: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const pointerStart = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const pointerCurrent = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );

  useFrame(() => {
    if (ref.current && pointerCurrent.current && pointerStart.current) {
      const dx = pointerCurrent.current.x - pointerStart.current.x;
      const dy = pointerCurrent.current.y - pointerStart.current.y;
      ref.current.position.x = ref.current.position.x + dx * 0.0005;
      ref.current.position.y = ref.current.position.y - dy * 0.0005;
    }
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
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
    e.stopPropagation();
    if (!pointerStart.current) return;
    pointerCurrent.current = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      time: Date.now(),
    };
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
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
      <boxGeometry args={[0.65, 0.4, 1.7]} />
      <meshStandardMaterial color={tapped ? "#f2a18d" : (color ?? "#9a5341")} />
    </mesh>
  );
}
