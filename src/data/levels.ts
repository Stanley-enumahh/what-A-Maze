import { type Level } from "../types/level";

export const levels: Level[] = [
  {
    id: "01-tutorial",
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
  },
  {
    id: "02-sequential",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 4, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 },
      { x: 5, y: 0, z: 2 },
      { x: 5, y: 0, z: 3 },
      { x: 5, y: 0, z: 4 },
    ],
    bridgeCells: [
      { x: 3, y: 0, z: 0, activeIn: ["east"] },
      { x: 5, y: 0, z: 1, activeIn: ["north"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 5, y: 0, z: 4 },
  },
  {
    id: "03-either-bridge",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 1, y: 0, z: 1 },
      { x: 2, y: 0, z: 1 },
      { x: 4, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 },
      { x: 6, y: 0, z: 0 },
      { x: 4, y: 0, z: 1 },
      { x: 5, y: 0, z: 1 },
      { x: 6, y: 0, z: 1 },
    ],
    bridgeCells: [
      { x: 3, y: 0, z: 0, activeIn: ["north"] },
      { x: 3, y: 0, z: 1, activeIn: ["south"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 6, y: 0, z: 1 },
  },
  {
    id: "04-the-trap",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 4, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 },
      { x: 7, y: 0, z: 0 },
      { x: 8, y: 0, z: 0 },
      { x: 9, y: 0, z: 0 },
    ],
    bridgeCells: [
      { x: 3, y: 0, z: 0, activeIn: ["east"] },
      { x: 6, y: 0, z: 0, activeIn: ["west"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 9, y: 0, z: 0 },
  },
  {
    id: "05-junction",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 4, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 }, // dead-end branch
      { x: 3, y: 0, z: 1 },
      { x: 3, y: 0, z: 2 },
      { x: 3, y: 0, z: 3 }, // real path
    ],
    bridgeCells: [{ x: 3, y: 0, z: 0, activeIn: ["north"] }],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 3, y: 0, z: 3 },
  },
  {
    id: "06-detour",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 2, y: 0, z: 2 },
      { x: 3, y: 0, z: 2 },
      { x: 4, y: 0, z: 2 },
      { x: 4, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 },
      { x: 6, y: 0, z: 0 },
    ],
    bridgeCells: [
      { x: 2, y: 0, z: 1, activeIn: ["south"] },
      { x: 4, y: 0, z: 1, activeIn: ["south"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 6, y: 0, z: 0 },
  },

  {
    id: "07-long-span",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 },
      { x: 5, y: 0, z: 1 },
      { x: 5, y: 0, z: 3 },
      { x: 4, y: 0, z: 3 },
      { x: 3, y: 0, z: 3 },
      { x: 1, y: 0, z: 3 },
      { x: 0, y: 0, z: 3 },
    ],
    bridgeCells: [
      { x: 3, y: 0, z: 0, activeIn: ["east"] },
      { x: 4, y: 0, z: 0, activeIn: ["east"] },
      { x: 5, y: 0, z: 2, activeIn: ["north"] },
      { x: 2, y: 0, z: 3, activeIn: ["south"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 0, y: 0, z: 3 },
  },
  {
    id: "08-islands",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 }, // single-tile island
      { x: 5, y: 0, z: 0 }, // decoy dead end
      { x: 6, y: 0, z: 0 },
      { x: 3, y: 0, z: 2 }, // single-tile island
      { x: 5, y: 0, z: 2 },
      { x: 5, y: 0, z: 3 },
      { x: 5, y: 0, z: 4 },
    ],
    bridgeCells: [
      { x: 2, y: 0, z: 0, activeIn: ["east"] },
      { x: 4, y: 0, z: 0, activeIn: ["west"] }, // decoy
      { x: 3, y: 0, z: 1, activeIn: ["south"] },
      { x: 4, y: 0, z: 2, activeIn: ["north"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 5, y: 0, z: 4 },
  },
  {
    id: "09-gauntlet",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
      { x: 3, y: 0, z: 3 },
      { x: 5, y: 0, z: 3 },
      { x: 5, y: 0, z: 1 },
      { x: 5, y: 0, z: 0 },
      // decoy dead ends
      { x: 1, y: 0, z: 2 },
      { x: 1, y: 0, z: 3 },
      { x: 3, y: 0, z: 5 },
      { x: 3, y: 0, z: 6 },
      { x: 7, y: 0, z: 3 },
      { x: 8, y: 0, z: 3 },
    ],
    bridgeCells: [
      { x: 2, y: 0, z: 0, activeIn: ["east"] },
      { x: 3, y: 0, z: 1, activeIn: ["south"] },
      { x: 3, y: 0, z: 2, activeIn: ["south"] },
      { x: 4, y: 0, z: 3, activeIn: ["west"] },
      { x: 5, y: 0, z: 2, activeIn: ["north"] },
      // decoys
      { x: 1, y: 0, z: 1, activeIn: ["north"] },
      { x: 3, y: 0, z: 4, activeIn: ["east"] },
      { x: 6, y: 0, z: 3, activeIn: ["south"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 5, y: 0, z: 0 },
  },

  {
    id: "10-labyrinth",
    coreCells: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 }, // island
      { x: 3, y: 0, z: 3 }, // island
      { x: 5, y: 0, z: 3 }, // island
      { x: 5, y: 0, z: 0 }, // island
      { x: 8, y: 0, z: 0 }, // island
      { x: 8, y: 0, z: 3 }, // island
      { x: 8, y: 0, z: 5 }, // island
      { x: 6, y: 0, z: 5 },
      // decoy dead ends
      { x: 1, y: 0, z: 2 },
      { x: 2, y: 0, z: 2 },
      { x: 3, y: 0, z: 5 },
      { x: 4, y: 0, z: 5 },
    ],
    bridgeCells: [
      { x: 2, y: 0, z: 0, activeIn: ["east"] },
      { x: 3, y: 0, z: 1, activeIn: ["south"] },
      { x: 3, y: 0, z: 2, activeIn: ["south"] },
      { x: 4, y: 0, z: 3, activeIn: ["west"] },
      { x: 5, y: 0, z: 2, activeIn: ["north"] },
      { x: 5, y: 0, z: 1, activeIn: ["north"] },
      { x: 6, y: 0, z: 0, activeIn: ["east"] },
      { x: 7, y: 0, z: 0, activeIn: ["east"] },
      { x: 8, y: 0, z: 1, activeIn: ["south"] },
      { x: 8, y: 0, z: 2, activeIn: ["south"] },
      { x: 8, y: 0, z: 4, activeIn: ["east"] },
      { x: 7, y: 0, z: 5, activeIn: ["west"] },
      // decoys
      { x: 1, y: 0, z: 1, activeIn: ["north"] },
      { x: 3, y: 0, z: 4, activeIn: ["east"] },
    ],
    start: { x: 0, y: 0, z: 0 },
    exit: { x: 6, y: 0, z: 5 },
  },
];
