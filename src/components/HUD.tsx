interface Props {
  orientation: string;
  levelIndex: number;
  totalLevels: number;
}

// Two-tier HUD: title stays quiet and small, level progress is the
// number that actually matters moment-to-moment, orientation is a
// live readout rather than crammed into the same line as everything else.
export function HUD({ orientation, levelIndex, totalLevels }: Props) {
  const fontFamily = "'JetBrains Mono', monospace";

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        fontFamily,
        color: "#e8e8f0",
        userSelect: "none",
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: 3, opacity: 0.5 }}>
        MAZESHIFT
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
        {String(levelIndex + 1).padStart(2, "0")}
        <span style={{ opacity: 0.4, fontWeight: 400 }}>
          {" "}
          / {String(totalLevels).padStart(2, "0")}
        </span>
      </div>
      <div style={{ fontSize: 13, opacity: 0.6, marginTop: 10 }}>
        facing <span style={{ color: "#e8a33d" }}>{orientation}</span>
      </div>
      <div style={{ fontSize: 11, opacity: 0.35, marginTop: 14 }}>
        W-A-S-D move &nbsp; Q/E rotate
      </div>
    </div>
  );
}
