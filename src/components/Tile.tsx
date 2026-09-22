import "@react-three/fiber";
import { Edges } from "@react-three/drei";

interface Props {
  position: [number, number, number];
  color: string;
}

export function Tile({ position, color }: Props) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.95, 0.2, 0.95]} />
      <meshStandardMaterial color={color} />
      <Edges scale={1} threshold={15} color="#0d0d1a" />
    </mesh>
  );
}