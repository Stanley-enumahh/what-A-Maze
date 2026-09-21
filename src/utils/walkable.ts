import { type Level, type Orientation, type GridCell } from "../types/level";

export type CellStatus = "core" | "active-bridge" | "inactive-bridge" | "none";

export function getCellStatus(
  level: Level,
  cell: GridCell,
  orientation: Orientation,
): CellStatus {
  const inCore = level.coreCells.some((c) => c.x === cell.x && c.z === cell.z);
  if (inCore) return "core";
  const bridge = level.bridgeCells.find(
    (c) => c.x === cell.x && c.z === cell.z,
  );
  if (bridge)
    return bridge.activeIn.includes(orientation)
      ? "active-bridge"
      : "inactive-bridge";
  return "none";
}

export function isSafe(status: CellStatus): boolean {
  return status === "core" || status === "active-bridge";
}
