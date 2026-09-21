import { type CSSProperties } from "react";

interface Props {
  totalLevels: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

const buttonStyle: CSSProperties = {
  padding: "13px 28px",
  borderRadius: 7,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 13,
  fontWeight: 800,
  cursor: "pointer",
  touchAction: "manipulation",
};

export function WinScreen({ totalLevels, onPlayAgain, onMainMenu }: Props) {
  return (
    <div className="win-screen">
      {/* Background grid */}
      <div className="win-screen-grid" />

      {/* Glow */}
      <div className="win-screen-glow" />

      <div className="win-screen-card">
        {/* Completion icon */}
        <div className="win-screen-icon">✓</div>

        <div className="win-screen-label">What A Maze</div>

        <h1 className="win-screen-title">You Made It.</h1>

        <p className="win-screen-message">
          Congratulations. You solved every maze and reached the end.
        </p>

        {/* Stats */}
        <div className="win-screen-stats">
          <div className="win-stat">
            <div className="win-stat-value">{totalLevels}</div>
            <div className="win-stat-label">Levels</div>
          </div>

          <div className="win-stat">
            <div className="win-stat-value">100%</div>
            <div className="win-stat-label">Complete</div>
          </div>
        </div>

        {/* Actions */}
        <div className="win-screen-actions">
          <button
            type="button"
            onClick={onPlayAgain}
            style={{
              ...buttonStyle,
              border: "none",
              background: "#55e6ff",
              color: "#141421",
            }}
          >
            PLAY AGAIN
          </button>

          <button
            type="button"
            onClick={onMainMenu}
            style={{
              ...buttonStyle,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            MAIN MENU
          </button>
        </div>

        <div className="win-screen-footer">THANKS FOR PLAYING</div>
      </div>
    </div>
  );
}
