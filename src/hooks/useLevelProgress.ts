import { useState, useCallback } from "react";
import { levels } from "../data/levels";

// Tracks which level is active and advances to the next one on solve.
// "solved" resets automatically when the level changes so the banner
// doesn't linger onto the next level.
export function useLevelProgress() {
  const [levelIndex, setLevelIndex] = useState(0);

  const currentLevel = levels[levelIndex];
  const isLastLevel = levelIndex === levels.length - 1;

  const advance = useCallback(() => {
    setLevelIndex((prev) => Math.min(prev + 1, levels.length - 1));
  }, []);

  const restart = useCallback(() => setLevelIndex(0), []);

  return { currentLevel, levelIndex, isLastLevel, advance, restart };
}
