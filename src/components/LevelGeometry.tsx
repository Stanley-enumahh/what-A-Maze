import "@react-three/fiber";
import { type Level, type Orientation } from "../types/level";

interface Props {
  level: Level;
  orientation: Orientation;
}

export function LevelGeometry({ level, orientation }: Props) {
  return (
    <group>
      {level.coreCells.map((cell, i) => (
        <mesh key={`core-${i}`} position={[cell.x, cell.y, cell.z]}>
          <boxGeometry args={[0.95, 0.2, 0.95]} />
          <meshStandardMaterial color="#4a90d9" />
        </mesh>
      ))}

      {level.bridgeCells.map((cell, i) => {
        const active = cell.activeIn.includes(orientation);
        if (!active) return null; // inactive bridge = nothing there at all
        return (
          <mesh key={`bridge-${i}`} position={[cell.x, cell.y, cell.z]}>
            <boxGeometry args={[0.95, 0.2, 0.95]} />
            <meshStandardMaterial color="#e8a33d" />
          </mesh>
        );
      })}
    </group>
  );
}
