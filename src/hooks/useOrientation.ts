// import { useState, useEffect } from "react";
// import { type Orientation } from "../types/level";

// const ORDER: Orientation[] = ["north", "east", "south", "west"];

// export function useOrientation() {
//   const [step, setStep] = useState(0);

//   useEffect(() => {
//     function handleKeyDown(e: KeyboardEvent) {
//       if (e.repeat) return; // ignore OS auto-repeat while a key is held
//       if (e.key === "q") {
//         setStep((prev) => prev + 1);
//       } else if (e.key === "e") {
//         setStep((prev) => prev - 1);
//       }
//     }
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   const normalizedIndex = ((step % 4) + 4) % 4;
//   const orientation = ORDER[normalizedIndex];
//   const angle = -step * (Math.PI / 2);

//   return { orientation, angle };
// }

import { useEffect, useState } from "react";
import type { Orientation } from "../types/level";

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
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;

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
