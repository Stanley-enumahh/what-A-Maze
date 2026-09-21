import "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  angle: number;
  center: [number, number, number];
  distance: number;
}

// Group is positioned at the level's center, so rotation pivots around
// the level itself rather than the world origin. Camera sits at a fixed
// offset from that pivot and always looks back at it.
export function SnapCameraRig({ angle, center, distance }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const currentAngle = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;
    const diff = angle - currentAngle.current;
    currentAngle.current += diff * 0.15;
    groupRef.current.rotation.y = currentAngle.current;
  });

  return (
    <group ref={groupRef} position={center}>
      <PerspectiveCamera
        makeDefault
        position={[distance, distance, distance]}
        fov={40}
        onUpdate={(cam) => cam.lookAt(center[0], center[1], center[2])}
      />
    </group>
  );
}
