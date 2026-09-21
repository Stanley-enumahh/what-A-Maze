import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { LevelGeometry } from "./components/LevelGeometry";
import { SnapCameraRig } from "./components/SnapCameraRig";
import { Player } from "./components/Player";
import { StartScreen } from "./components/StartScreen";
import { GroundPlane } from "./components/GroundPlane";
import { HUD } from "./components/HUD";
import { useOrientation } from "./hooks/useOrientation";
import { usePlayerState } from "./hooks/usePlayerState";
import { useLevelProgress } from "./hooks/useLevelProgress";
import { levels } from "./data/levels";
import { getLevelBounds } from "./utils/cameraFit";
import { ExitFlag } from "./components/ExitFlag";
import { RulesScreen } from "./components/RulesScreen";

const ZOOM_FACTOR = 0.7;

export default function App() {
  const [screen, setScreen] = useState<"start" | "rules" | "game">("start");
  const { currentLevel, levelIndex, isLastLevel, advance, restart } =
    useLevelProgress();
  const { orientation, angle } = useOrientation();
  const [resetSignal, setResetSignal] = useState(0);
  const {
    position: playerPosition,
    falling,
    solved,
  } = usePlayerState(currentLevel, orientation, angle, resetSignal);
  const { center, distance } = useMemo(() => {
    const bounds = getLevelBounds(currentLevel);
    return { center: bounds.center, distance: bounds.distance * ZOOM_FACTOR };
  }, [currentLevel]);

  const hasAdvancedRef = useRef(false);
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

  // Respawn after a fall: give the drop animation a moment to read, then
  // bump resetSignal so usePlayerState resets position + falling together.
  useEffect(() => {
    if (falling) {
      const timeout = setTimeout(() => setResetSignal((n) => n + 1), 900);
      return () => clearTimeout(timeout);
    }
  }, [falling]);

  function handleRestart() {
    restart();
    setScreen("start");
  }

  if (screen === "start") {
    return (
      <StartScreen
        onStart={() => setScreen("game")}
        onRules={() => setScreen("rules")}
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
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e" }}>
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
      {falling && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            fontWeight: 700,
            color: "#ff4d6d",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          You Fell
        </div>
      )}
      {solved && !isLastLevel && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 800 }}>Level Complete</div>
          <div style={{ fontSize: 14, opacity: 0.6, marginTop: 8 }}>
            Next level loading…
          </div>
        </div>
      )}
      {solved && isLastLevel && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            color: "white",
            fontFamily: "'JetBrains Mono', monospace",
            background: "rgba(26,26,46,0.85)",
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 800 }}>
            All Levels Complete
          </div>
          <div style={{ fontSize: 15, opacity: 0.7 }}>
            You beat every level.
          </div>
          <button
            onClick={handleRestart}
            style={{
              marginTop: 16,
              padding: "10px 24px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 600,
              background: "#e8a33d",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
