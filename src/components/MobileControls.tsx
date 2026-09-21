import type { CSSProperties } from "react";

interface Props {
  onMove: (key: "w" | "a" | "s" | "d") => void;
  onRotate: (key: "q" | "e") => void;
}

const buttonStyle: CSSProperties = {
  width: 58,
  height: 58,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(20,20,35,0.88)",
  color: "white",
  fontSize: 22,
  fontWeight: 700,
  fontFamily: "'JetBrains Mono', monospace",
  touchAction: "none",
  WebkitTapHighlightColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export function MobileControls({ onMove, onRotate }: Props) {
  return (
    <div className="mobile-controls">
      {/* Movement */}
      <div className="mobile-movement">
        <div />

        <button
          type="button"
          style={buttonStyle}
          onPointerDown={() => onMove("w")}
          aria-label="Move up"
        >
          ↑
        </button>

        <div />

        <button
          type="button"
          style={buttonStyle}
          onPointerDown={() => onMove("a")}
          aria-label="Move left"
        >
          ←
        </button>

        <button
          type="button"
          style={buttonStyle}
          onPointerDown={() => onMove("s")}
          aria-label="Move down"
        >
          ↓
        </button>

        <button
          type="button"
          style={buttonStyle}
          onPointerDown={() => onMove("d")}
          aria-label="Move right"
        >
          →
        </button>
      </div>

      {/* Rotation */}
      <div className="mobile-rotation">
        <button
          type="button"
          style={buttonStyle}
          onPointerDown={() => onRotate("q")}
          aria-label="Rotate left"
        >
          ↶
        </button>

        <button
          type="button"
          style={buttonStyle}
          onPointerDown={() => onRotate("e")}
          aria-label="Rotate right"
        >
          ↷
        </button>
      </div>
    </div>
  );
}
