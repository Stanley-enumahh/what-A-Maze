import "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type GridCell } from "../types/level";

interface Props {
  position: GridCell;
}

export function ExitFlag({ position }: Props) {
  const clothRef = useRef<THREE.Group>(null);

  // Gentle waving
  useFrame(({ clock }) => {
    if (!clothRef.current) return;
    clothRef.current.rotation.y = Math.sin(clock.elapsedTime * 3) * 0.25;
  });

  // Pole sits in a corner of the tile so the ball doesn't clip through it
  return (
    <group position={[position.x - 0.3, position.y + 0.05, position.z - 0.3]}>
      {/* pole */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        <meshStandardMaterial color="#dddddd" />
      </mesh>
      {/* cloth, pivoting at the pole */}
      <group ref={clothRef} position={[0, 1.05, 0]}>
        <mesh position={[0.25, 0, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.03]} />
          <meshStandardMaterial
            color="#e8a33d"
            emissive="#e8a33d"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
