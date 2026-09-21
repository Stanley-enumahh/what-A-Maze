import type { LeaderboardEntry } from "../hooks/useLeaderboard";

interface Props {
  entries: LeaderboardEntry[];
  loading: boolean;
}

function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function Leaderboard({ entries, loading }: Props) {
  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <span>RANK</span>
        <span>PLAYER</span>
        <span>TIME</span>
      </div>

      {loading ? (
        <div className="leaderboard-empty">Loading leaderboard...</div>
      ) : entries.length === 0 ? (
        <div className="leaderboard-empty">No scores yet. Be the first.</div>
      ) : (
        entries.map((entry, index) => (
          <div className="leaderboard-row" key={entry.id}>
            <span className="leaderboard-rank">{index + 1}</span>

            <span className="leaderboard-name">{entry.player_name}</span>

            <span className="leaderboard-time">
              {formatTime(entry.completion_time)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
