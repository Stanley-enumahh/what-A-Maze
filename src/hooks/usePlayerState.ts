import { useState, useEffect, useRef } from "react";
import { type Level, type Orientation, type GridCell } from "../types/level";
import { getCellStatus, isSafe } from "../utils/walkable";

export interface PlayerState {
  position: GridCell;
  falling: boolean;
  solved: boolean;
}

export function usePlayerState(
  level: Level,
  orientation: Orientation,
  angle: number,
  resetSignal: number,
): PlayerState {
  const [position, setPosition] = useState<GridCell>(level.start);
  const [falling, setFalling] = useState(false);

  // Always holds the latest position, even between re-renders.
  const positionRef = useRef(position);
  positionRef.current = position;

  useEffect(() => {
    positionRef.current = level.start;
    setPosition(level.start);
    setFalling(false);
  }, [level.id, resetSignal]);

  const solved =
    !falling && position.x === level.exit.x && position.z === level.exit.z;

  useEffect(() => {
    if (solved) return;
    const status = getCellStatus(level, position, orientation);
    if (!isSafe(status)) setFalling(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat || falling || solved) return; // ignore held-key repeats
      let baseDx = 0;
      let baseDz = 0;
      if (e.key === "w") baseDz = -1;
      else if (e.key === "s") baseDz = 1;
      else if (e.key === "a") baseDx = -1;
      else if (e.key === "d") baseDx = 1;
      else return;

      const dx = baseDx;
      const dz = baseDz;
      const cur = positionRef.current;
      const next = { x: cur.x + dx, y: cur.y, z: cur.z + dz };
      positionRef.current = next;
      const status = getCellStatus(level, next, orientation);
      setPosition(next);
      if (!isSafe(status)) setFalling(true);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [level, orientation, angle, falling, solved]);

  return { position, falling, solved };
}
