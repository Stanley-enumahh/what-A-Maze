import "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type GridCell } from "../types/level";

interface Props {
  position: GridCell;
  falling: boolean;
}

// A soft dark ellipse that sits just above the tile surface and follows
// the character's x/z (but not y) — it fades out as the character falls,
// reinforcing "this is where you left the ground."
export function ContactShadow({ position, falling }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const opacity = useRef(0.35);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      position.x,
      0.25,
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      position.z,
      0.25,
    );

    const targetOpacity = falling ? 0 : 0.35;
    opacity.current = THREE.MathUtils.lerp(opacity.current, targetOpacity, 0.1);
    materialRef.current.opacity = opacity.current;
  });

  return (
    <mesh
      ref={meshRef}
      position={[position.x, 0.11, position.z]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <circleGeometry args={[0.22, 24]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#000000"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}
