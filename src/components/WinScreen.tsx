import { useState, type CSSProperties } from "react";
import { Leaderboard } from "./Leaderboard";
import { useLeaderboard } from "../hooks/useLeaderboard";

interface Props {
  totalLevels: number;
  completionTime: number;
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

function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// function isPersonalBest(
//   entries: LeaderboardEntry[],
//   playerName: string,
//   completionTime: number,
// ) {
//   return entries.some(
//     (entry) =>
//       entry.player_name.toLowerCase() === playerName.toLowerCase() &&
//       entry.completion_time === completionTime,
//   );
// }

export function WinScreen({
  totalLevels,
  completionTime,
  onPlayAgain,
  onMainMenu,
}: Props) {
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { entries, loading, submitting, error, submitScore } = useLeaderboard();

  async function handleSubmit() {
    const name = playerName.trim();

    if (name.length < 2 || name.length > 20) {
      return;
    }

    const success = await submitScore(name, completionTime, totalLevels);

    if (success) {
      setSubmitted(true);
    }
  }

  return (
    <div className="win-screen">
      <div className="win-screen-grid" />
      <div className="win-screen-glow" />

      <div className="win-screen-card">
        <div className="win-screen-icon">✓</div>

        <div className="win-screen-label">What A Maze</div>

        <h1 className="win-screen-title">You Made It.</h1>

        <p className="win-screen-message">
          Congratulations. You solved every maze and reached the end.
        </p>

        <div className="win-screen-stats">
          <div className="win-stat">
            <div className="win-stat-value">{totalLevels}</div>

            <div className="win-stat-label">Levels</div>
          </div>

          <div className="win-stat">
            <div className="win-stat-value">{formatTime(completionTime)}</div>

            <div className="win-stat-label">Time</div>
          </div>
        </div>

        {!submitted ? (
          <div className="score-submit">
            <div className="score-submit-title">Enter your name</div>

            <div className="score-submit-form">
              <input
                type="text"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                maxLength={20}
                placeholder="Your name"
                autoComplete="off"
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || playerName.trim().length < 2}
                style={{
                  ...buttonStyle,
                  border: "none",
                  background: "#55e6ff",
                  color: "#141421",
                }}
              >
                {submitting ? "SENDING..." : "SUBMIT"}
              </button>
            </div>

            <div className="score-submit-hint">2–20 characters</div>

            {error && <div className="score-submit-error">{error}</div>}
          </div>
        ) : (
          <div className="score-submitted">SCORE SUBMITTED ✓</div>
        )}

        <Leaderboard entries={entries} loading={loading} />

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
