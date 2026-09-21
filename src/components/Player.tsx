import "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type GridCell } from "../types/level";
import { ContactShadow } from "./ContactShadow";

interface Props {
  position: GridCell;
  falling: boolean;
}

export function Player({ position, falling }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const initialized = useRef(false);
  const prevPosition = useRef<GridCell>(position);
  const facingAngle = useRef(0);

  useEffect(() => {
    if (groupRef.current && !initialized.current) {
      groupRef.current.position.set(position.x, position.y + 0.32, position.z);
      initialized.current = true;
    }

    const dx = position.x - prevPosition.current.x;
    const dz = position.z - prevPosition.current.z;
    if (dx !== 0 || dz !== 0) {
      facingAngle.current = Math.atan2(dx, dz);
    }
    prevPosition.current = position;
  }, [position]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (falling) {
      groupRef.current.position.y -= 0.13;
      groupRef.current.rotation.x += 0.05;
      return;
    }
    const target = new THREE.Vector3(position.x, position.y + 0.32, position.z);
    groupRef.current.position.lerp(target, 0.25);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0,
      0.2,
    );

    let diff = facingAngle.current - groupRef.current.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    groupRef.current.rotation.y += diff * 0.25;
  });

  return (
    <>
      <ContactShadow position={position} falling={falling} />
      <group ref={groupRef}>
        {/* body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.16, 0.16, 4, 12]} />
          <meshStandardMaterial color="#ff4d6d" />
        </mesh>
        {/* head */}
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color="#ff6b83" />
        </mesh>
        {/* nose — the clear, unmistakable "this is the front" marker */}
        <mesh position={[0, 0.27, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.045, 0.09, 8]} />
          <meshStandardMaterial color="#e8a33d" />
        </mesh>
        {/* left arm */}
        <mesh position={[-0.22, 0.02, 0]} rotation={[0, 0, 0.4]}>
          <capsuleGeometry args={[0.06, 0.14, 4, 8]} />
          <meshStandardMaterial color="#ff4d6d" />
        </mesh>
        {/* right arm */}
        <mesh position={[0.22, 0.02, 0]} rotation={[0, 0, -0.4]}>
          <capsuleGeometry args={[0.06, 0.14, 4, 8]} />
          <meshStandardMaterial color="#ff4d6d" />
        </mesh>
        {/* left leg */}
        <mesh position={[-0.09, -0.28, 0]}>
          <capsuleGeometry args={[0.07, 0.14, 4, 8]} />
          <meshStandardMaterial color="#c93c58" />
        </mesh>
        {/* right leg */}
        <mesh position={[0.09, -0.28, 0]}>
          <capsuleGeometry args={[0.07, 0.14, 4, 8]} />
          <meshStandardMaterial color="#c93c58" />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.06, 0.3, 0.15]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.06, 0.3, 0.15]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </group>
    </>
  );
}
