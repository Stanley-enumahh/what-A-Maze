import { type Level } from "../types/level";

// Two 3-tile islands, disconnected by default.
// The bridge at (3,0,0) only activates facing 'east', joining them.
export const testLevel: Level = {
  id: "test-01",
  coreCells: [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 4, y: 0, z: 0 },
    { x: 5, y: 0, z: 0 },
    { x: 6, y: 0, z: 0 },
  ],
  bridgeCells: [{ x: 3, y: 0, z: 0, activeIn: ["east"] }],
  start: { x: 0, y: 0, z: 0 },
  exit: { x: 6, y: 0, z: 0 },
};
