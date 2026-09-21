import { useState, useEffect, useCallback } from "react";
import { type Level, type Orientation, type GridCell } from "../types/level";
import { getCellStatus, isSafe } from "../utils/walkable";
import { rotateInput } from "../utils/movementInput";
import { sound } from "../utils/sound";

export interface PlayerState {
  position: GridCell;
  falling: boolean;
  solved: boolean;
  move: (key: "w" | "a" | "s" | "d") => void;
}

export function usePlayerState(
  level: Level,
  orientation: Orientation,
  angle: number,
  resetSignal: number,
): PlayerState {
  const [position, setPosition] = useState<GridCell>(level.start);
  const [falling, setFalling] = useState(false);

  useEffect(() => {
    setPosition(level.start);
    setFalling(false);
  }, [level.id, resetSignal]);

  const solved =
    !falling && position.x === level.exit.x && position.z === level.exit.z;

  const move = useCallback(
    (key: "w" | "a" | "s" | "d") => {
      if (falling || solved) return;

      let baseDx = 0;
      let baseDz = 0;

      if (key === "w") {
        baseDz = -1;
      } else if (key === "s") {
        baseDz = 1;
      } else if (key === "a") {
        baseDx = -1;
      } else if (key === "d") {
        baseDx = 1;
      }

      const { dx, dz } = rotateInput(baseDx, baseDz, angle);

      const next = {
        x: position.x + dx,
        y: position.y,
        z: position.z + dz,
      };

      const status = getCellStatus(level, next, orientation);

      setPosition(next);

      if (!isSafe(status)) {
        setFalling(true);
        sound.fall();
      } else {
        sound.move();
      }
    },
    [falling, solved, position, angle, level, orientation],
  );

  useEffect(() => {
    if (solved) return;

    const status = getCellStatus(level, position, orientation);

    if (!isSafe(status)) {
      setFalling(true);
      sound.fall();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;

      if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        move(e.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move]);

  return {
    position,
    falling,
    solved,
    move,
  };
}
