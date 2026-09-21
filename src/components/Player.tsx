import "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type GridCell } from "../types/level";

interface Props {
  position: GridCell;
  falling: boolean;
}

export function Player({ position, falling }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (meshRef.current && !initialized.current) {
      meshRef.current.position.set(position.x, position.y + 0.3, position.z);
      initialized.current = true;
    }
  }, [position]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (falling) {
      meshRef.current.position.y -= delta * 8; // accelerate-ish drop
      return;
    }
    const target = new THREE.Vector3(position.x, position.y + 0.3, position.z);
    meshRef.current.position.lerp(target, 0.25);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial color="#ff4d6d" />
    </mesh>
  );
}
