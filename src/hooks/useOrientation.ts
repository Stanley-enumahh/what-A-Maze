import { useState, useEffect } from "react";
import { type Orientation } from "../types/level";

const ORDER: Orientation[] = ["north", "east", "south", "west"];

export function useOrientation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return; // ignore OS auto-repeat while a key is held
      if (e.key === "q") {
        setStep((prev) => prev + 1);
      } else if (e.key === "e") {
        setStep((prev) => prev - 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const normalizedIndex = ((step % 4) + 4) % 4;
  const orientation = ORDER[normalizedIndex];
  const angle = -step * (Math.PI / 2);

  return { orientation, angle };
}
