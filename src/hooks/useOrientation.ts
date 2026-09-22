import { useEffect, useState } from "react";
import type { Orientation } from "../types/level";
import { sound } from "../utils/sound";

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>("north");
  const [angle, setAngle] = useState(0);

  function rotate(direction: "q" | "e") {
    const amount = direction === "q" ? -1 : 1;

    setAngle((current) => current + amount * (Math.PI / 2));

    setOrientation((current) => {
      const orientations: Orientation[] = ["north", "east", "south", "west"];

      const currentIndex = orientations.indexOf(current);
      const nextIndex =
        (currentIndex + amount + orientations.length) % orientations.length;

      return orientations[nextIndex];
    });

    sound.rotate();
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;

      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "q" || e.key === "e") {
        rotate(e.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    orientation,
    angle,
    rotate,
  };
}
