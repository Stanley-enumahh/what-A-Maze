import { useEffect } from "react";

interface Props {
  onStart: () => void;
  onRules: () => void;
  onLeaderboard: () => void;
}

export function StartScreen({ onStart, onRules, onLeaderboard }: Props) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") {
        onStart();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onStart]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        color: "white",
        fontFamily: "sans-serif",
        background:
          "radial-gradient(circle at 50% 40%, #20204a 0%, #111122 40%, #080812 100%)",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: "perspective(500px) rotateX(55deg) scale(1.5)",
          transformOrigin: "center bottom",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(80, 220, 255, 0.08)",
          filter: "blur(100px)",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: 24,
        }}
      >
        {/* Small label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: 22,
          }}
        >
          A spatial puzzle game
        </div>

        {/* Logo */}
        <div
          style={{
            fontSize: "clamp(56px, 10vw, 96px)",
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 0.9,
          }}
        >
          Maze<span style={{ color: "#55e6ff" }}>Shift</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 24,
            fontSize: 16,
            opacity: 0.55,
            letterSpacing: 0.3,
          }}
        >
          Rotate the world. Find the path. Reach the exit.
        </div>

        {/* Decorative path */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginTop: 46,
            marginBottom: 42,
            transform: "rotate(-6deg)",
          }}
        >
          <Tile />
          <BridgeTile />
          <Tile />
          <BridgeTile />
          <ExitTile />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            maxWidth: 280,
          }}
        >
          <button
            onClick={onStart}
            style={{
              width: "100%",
              height: 52,
              border: "none",
              borderRadius: 10,
              background: "#55e6ff",
              color: "#071014",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1.5,
              cursor: "pointer",
              transition: "transform 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7aeeff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#55e6ff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            PLAY GAME
          </button>

          <button
            onClick={onRules}
            style={{
              width: "100%",
              height: 52,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: "pointer",
            }}
          >
            HOW TO PLAY
          </button>

          <button
            onClick={onLeaderboard}
            style={{
              width: "100%",
              height: 52,
              border: "1px solid rgba(85,230,255,0.2)",
              borderRadius: 10,
              background: "rgba(85,230,255,0.04)",
              color: "#55e6ff",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: "pointer",
            }}
          >
            LEADERBOARD
          </button>
        </div>

        {/* Keyboard hint */}
        <div
          style={{
            marginTop: 28,
            fontSize: 11,
            opacity: 0.25,
            letterSpacing: 1,
          }}
        >
          ENTER / SPACE TO START
        </div>
      </div>
    </div>
  );
}

function Tile() {
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      }}
    />
  );
}

function BridgeTile() {
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 6,
        border: "1px solid rgba(85,230,255,0.35)",
        background: "rgba(85,230,255,0.08)",
        boxShadow: "0 0 20px rgba(85,230,255,0.08)",
      }}
    />
  );
}

function ExitTile() {
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 6,
        border: "1px solid rgba(100,255,160,0.4)",
        background: "rgba(100,255,160,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64ffa0",
        fontSize: 18,
      }}
    >
      ◆
    </div>
  );
}
