export type Orientation = "north" | "south" | "east" | "west";

export interface GridCell {
  x: number;
  y: number;
  z: number;
}

export interface BridgeCell extends GridCell {
  activeIn: Orientation[]; // orientations in which this tile is walkable
}

export interface Level {
  id: string;
  coreCells: GridCell[]; // always walkable
  bridgeCells: BridgeCell[]; // walkable only in listed orientations
  start: GridCell;
  exit: GridCell;
}
