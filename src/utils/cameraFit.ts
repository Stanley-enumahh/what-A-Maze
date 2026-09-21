import { type Level } from "../types/level";

// Computes a bounding box around a level's tiles so the camera can frame
// the whole thing regardless of level size, instead of a fixed position.
export function getLevelBounds(level: Level) {
  const allCells = [...level.coreCells, ...level.bridgeCells];
  const xs = allCells.map((c) => c.x);
  const zs = allCells.map((c) => c.z);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);

  const center: [number, number, number] = [
    (minX + maxX) / 2,
    0,
    (minZ + maxZ) / 2,
  ];
  const span = Math.max(maxX - minX, maxZ - minZ, 1);
  const distance = span * 1.4 + 4; // padding so tiles don't touch the frame edge

  return { center, distance };
}
