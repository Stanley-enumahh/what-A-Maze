interface Props {
  onBack: () => void;
  onStart: () => void;
}

export function RulesScreen({ onBack, onStart }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflowY: "auto",
        color: "white",
        fontFamily: "sans-serif",
        background:
          "radial-gradient(circle at 50% 20%, #20204a 0%, #111122 45%, #080812 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          padding: "40px 24px",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: "none",
            background: "none",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: 13,
            padding: 0,
          }}
        >
          ← BACK
        </button>

        <div style={{ marginTop: 50 }}>
          <h1
            style={{
              margin: "14px 0 12px",
              fontSize: "clamp(42px, 8vw, 64px)",
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            How to play
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: 560,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
            }}
          >
            Navigate the path by moving between tiles and rotating the world
            when necessary. Reach the flag to complete the level.
          </p>
        </div>

        {/* Controls */}
        <section
          style={{
            marginTop: 45,
            padding: 24,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <h2 style={{ margin: "0 0 22px", fontSize: 16 }}>Controls</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 30,
            }}
          >
            <ControlGroup title="MOVE">
              <Keys keys={["W", "A", "S", "D"]} />
              <p>Move one tile at a time.</p>
            </ControlGroup>

            <ControlGroup title="ROTATE">
              <Keys keys={["Q", "E"]} />
              <p>Rotate the world left or right.</p>
            </ControlGroup>
          </div>
        </section>

        {/* Rules */}
        <section style={{ marginTop: 20 }}>
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
            description="Find the correct route and make it to the green exit tile."
          />
        </section>

        <button
          onClick={onStart}
          style={{
            marginTop: 35,
            width: "100%",
            height: 54,
            border: "none",
            borderRadius: 10,
            background: "#55e6ff",
            color: "#071014",
            fontWeight: 800,
            letterSpacing: 1.5,
            cursor: "pointer",
          }}
        >
          START PLAYING →
        </button>
      </div>
    </div>
  );
}

function ControlGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          marginBottom: 12,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 3,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        {title}
      </div>

      {children}
    </div>
  );
}

function Keys({ keys }: { keys: string[] }) {
  return (
    <div style={{ display: "flex", gap: 7 }}>
      {keys.map((key) => (
        <div
          key={key}
          style={{
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 7,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 13,
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
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: "22px 4px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          color: "#55e6ff",
          fontFamily: "monospace",
          fontSize: 12,
          paddingTop: 3,
        }}
      >
        {number}
      </div>

      <div>
        <div style={{ fontWeight: 700, marginBottom: 5 }}>{title}</div>

        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
