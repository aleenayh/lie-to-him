import type { ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";

export function TowerRow({ rowIndex }: { rowIndex: number }) {
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
          />
        ))}
      </group>
    );
  }
}

export function Block({
  props,
  color,
}: {
  props: ThreeElements["mesh"];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [isTapped, setIsTapped] = useState(false);
  return (
    <mesh {...props} ref={ref} onClick={() => setIsTapped(!isTapped)}>
      <boxGeometry args={[0.65, 0.4, 1.7]} />
      <meshStandardMaterial color={color ?? "#9a5341"} />
    </mesh>
  );
}
