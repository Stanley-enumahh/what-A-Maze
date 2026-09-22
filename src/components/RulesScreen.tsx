import type { CSSProperties, ReactNode } from "react";

interface Props {
  onBack: () => void;
  onStart: () => void;
}

const cardStyle: CSSProperties = {
  padding: 28,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.03)",
};

export function RulesScreen({ onBack, onStart }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflowY: "auto",
        color: "white",
        fontFamily: "'JetBrains Mono', monospace",
        background: "#080812",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          margin: "0 auto",
          padding: "40px 24px 60px",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: "none",
            background: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            padding: 0,
          }}
        >
          ← Back
        </button>

        <div style={{ marginTop: 32 }}>
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
              margin: "10px 0 12px",
              fontSize: "clamp(32px, 7vw, 44px)",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            How to play
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: 480,
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              lineHeight: 1.7,
            }}
          >
            Move between tiles and rotate the world to change which paths
            connect. Reach the flag to complete each level.
          </p>
        </div>

        <section style={{ marginTop: 32, ...cardStyle }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            <ControlGroup label="Move" description="Move one tile at a time.">
              <Keys keys={["W", "A", "S", "D"]} />
            </ControlGroup>

            <ControlGroup
              label="Rotate"
              description="Turn the world left or right."
            >
              <Keys keys={["Q", "E"]} />
            </ControlGroup>
          </div>
        </section>

        <section style={{ marginTop: 20, ...cardStyle, padding: "8px 28px" }}>
          <Rule
            number="01"
            title="Watch the bridges"
            description="Bridge tiles are only safe from specific orientations."
          />
          <Rule
            number="02"
            title="Rotate on safe ground"
            description="When possible, rotate while standing on a solid tile before crossing."
          />
          <Rule
            number="03"
            title="Reach the exit"
            description="Find the right route and make it to the flag."
            last
          />
        </section>

        <button
          onClick={onStart}
          style={{
            marginTop: 28,
            width: "100%",
            height: 54,
            border: "none",
            borderRadius: 8,
            background: "#55e6ff",
            color: "#141421",
            fontFamily: "inherit",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: 0.5,
            cursor: "pointer",
          }}
        >
          Start playing
        </button>
      </div>
    </div>
  );
}

function ControlGroup({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 700 }}>
        {label}
      </div>
      {children}
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        {description}
      </p>
    </div>
  );
}

function Keys({ keys }: { keys: string[] }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {keys.map((key) => (
        <div
          key={key}
          style={{
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          {key}
        </div>
      ))}
    </div>
  );
}

function Rule({
  number,
  title,
  description,
  last,
}: {
  number: string;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 18,
        padding: "18px 0",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          color: "#55e6ff",
          fontSize: 11,
          fontWeight: 700,
          paddingTop: 2,
        }}
      >
        {number}
      </div>

      <div>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
          {title}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
