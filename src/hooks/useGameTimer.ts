import { useEffect, useRef, useState } from "react";

export function useGameTimer(active: boolean, stopped: boolean) {
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      startTimeRef.current = null;
      setElapsed(0);
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    if (stopped) {
      if (startTimeRef.current !== null) {
        setElapsed(Date.now() - startTimeRef.current);
      }

      return;
    }

    const interval = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsed(Date.now() - startTimeRef.current);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [active, stopped]);

  return elapsed;
}
