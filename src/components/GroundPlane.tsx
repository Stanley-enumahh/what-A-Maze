import "@react-three/fiber";

interface Props {
  center: [number, number, number];
  size: number;
}

export function GroundPlane({ center, size }: Props) {
  return (
    <mesh position={[center[0], -1, center[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color="#2e2e61" />
    </mesh>
  );
}
