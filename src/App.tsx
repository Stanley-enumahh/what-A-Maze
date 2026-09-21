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
import { MobileControls } from "./components/MobileControls";
import { WinScreen } from "./components/WinScreen";

const DESKTOP_ZOOM = 0.7;
const MOBILE_ZOOM = 1.15;

export default function App() {
  const [screen, setScreen] = useState<"start" | "rules" | "game">("start");

  const { currentLevel, levelIndex, isLastLevel, advance, restart } =
    useLevelProgress();

  const { orientation, angle, rotate } = useOrientation();

  const [resetSignal, setResetSignal] = useState(0);

  const {
    position: playerPosition,
    falling,
    solved,
    move,
  } = usePlayerState(currentLevel, orientation, angle, resetSignal);

  const { center, distance } = useMemo(() => {
    const bounds = getLevelBounds(currentLevel);

    const isMobile = window.innerWidth <= 768;
    const zoom = isMobile ? MOBILE_ZOOM : DESKTOP_ZOOM;

    return {
      center: bounds.center,
      distance: bounds.distance * zoom,
    };
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
          <div className="level-complete-title">Level Complete</div>

          <div className="level-complete-subtitle">Next level loading…</div>
        </div>
      )}

      {solved && isLastLevel && (
        <WinScreen
          totalLevels={levels.length}
          onPlayAgain={handleRestart}
          onMainMenu={() => setScreen("start")}
        />
      )}
    </div>
  );
}
