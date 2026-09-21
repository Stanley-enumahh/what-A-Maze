import { useEffect, useRef, useMemo, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import { LevelGeometry } from "./components/LevelGeometry";
import { SnapCameraRig } from "./components/SnapCameraRig";
import { Player } from "./components/Player";
import { StartScreen } from "./components/StartScreen";
import { GroundPlane } from "./components/GroundPlane";
import { HUD } from "./components/HUD";
import { ExitFlag } from "./components/ExitFlag";
import { RulesScreen } from "./components/RulesScreen";
import { MobileControls } from "./components/MobileControls";
import { WinScreen } from "./components/WinScreen";

import { useOrientation } from "./hooks/useOrientation";
import { usePlayerState } from "./hooks/usePlayerState";
import { useLevelProgress } from "./hooks/useLevelProgress";
import { useGameTimer } from "./hooks/useGameTimer";

import { levels } from "./data/levels";
import { getLevelBounds } from "./utils/cameraFit";
import { useLeaderboard } from "./hooks/useLeaderboard";
import { Leaderboard } from "./components/Leaderboard";

const DESKTOP_ZOOM = 0.7;
const MOBILE_ZOOM = 1.15;

export default function App() {
  const [screen, setScreen] = useState<
    "start" | "rules" | "leaderboard" | "game"
  >("start");

  const { entries, loading } = useLeaderboard();

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const [resetSignal, setResetSignal] = useState(0);

  const { currentLevel, levelIndex, isLastLevel, advance, restart } =
    useLevelProgress();

  const { orientation, angle, rotate } = useOrientation();

  const {
    position: playerPosition,
    falling,
    solved,
    move,
  } = usePlayerState(currentLevel, orientation, angle, resetSignal);

  const completionTime = useGameTimer(screen === "game", solved && isLastLevel);

  const { center, distance } = useMemo(() => {
    const bounds = getLevelBounds(currentLevel);

    const zoom = isMobile ? MOBILE_ZOOM : DESKTOP_ZOOM;

    return {
      center: bounds.center,
      distance: bounds.distance * zoom,
    };
  }, [currentLevel, isMobile]);

  const hasAdvancedRef = useRef(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    hasAdvancedRef.current = false;
  }, [levelIndex]);

  useEffect(() => {
    if (solved && !hasAdvancedRef.current && !isLastLevel) {
      hasAdvancedRef.current = true;

      const timeout = setTimeout(advance, 1200);

      return () => clearTimeout(timeout);
    }
  }, [solved, isLastLevel, advance]);

  useEffect(() => {
    if (falling) {
      const timeout = setTimeout(() => {
        setResetSignal((n) => n + 1);
      }, 900);

      return () => clearTimeout(timeout);
    }
  }, [falling]);

  function handleRestart() {
    restart();
    setResetSignal((n) => n + 1);
    setScreen("start");
  }

  if (screen === "leaderboard") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#080812",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div
          style={{
            width: "min(560px, 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  color: "#55e6ff",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 3,
                }}
              >
                MAZESHIFT
              </div>

              <h1
                style={{
                  margin: "6px 0 0",
                  fontSize: 32,
                }}
              >
                Leaderboard
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setScreen("start")}
              style={{
                padding: "10px 16px",
                borderRadius: 7,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              BACK
            </button>
          </div>

          <Leaderboard entries={entries} loading={loading} />
        </div>
      </div>
    );
  }

  if (screen === "start") {
    return (
      <StartScreen
        onStart={() => setScreen("game")}
        onRules={() => setScreen("rules")}
        onLeaderboard={() => setScreen("leaderboard")}
      />
    );
  }

  if (screen === "rules") {
    return (
      <RulesScreen
        onBack={() => setScreen("start")}
        onStart={() => setScreen("game")}
      />
    );
  }

  return (
    <div className="game-container">
      <Canvas>
        <fog attach="fog" args={["#1a1a2e", 15, 45]} />

        <ambientLight intensity={0.6} />

        <directionalLight position={[5, 10, 5]} intensity={0.8} />

        <Stars
          radius={60}
          depth={30}
          count={2000}
          factor={2}
          saturation={0}
          fade
          speed={0.5}
        />

        <GroundPlane center={center} />

        <SnapCameraRig angle={angle} center={center} distance={distance} />

        <LevelGeometry level={currentLevel} orientation={orientation} />

        <ExitFlag position={currentLevel.exit} />

        <Player position={playerPosition} falling={falling} />
      </Canvas>

      <HUD
        orientation={orientation}
        levelIndex={levelIndex}
        totalLevels={levels.length}
      />

      <MobileControls onMove={move} onRotate={rotate} />

      {falling && <div className="fall-message">You Fell</div>}

      {solved && !isLastLevel && (
        <div className="level-complete">
          <div>Level Complete</div>

          <div>Next level loading…</div>
        </div>
      )}

      {solved && isLastLevel && (
        <WinScreen
          totalLevels={levels.length}
          completionTime={completionTime}
          onPlayAgain={handleRestart}
          onMainMenu={() => setScreen("start")}
        />
      )}
    </div>
  );
}
