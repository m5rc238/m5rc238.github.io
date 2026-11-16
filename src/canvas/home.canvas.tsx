"use client";
import { Canvas, Frame } from "truecanvas";

/*
 * A placeholder page. Replace the Welcome frame with your own components:
 * drag them from Assets, draw frames with F, or ask your agent over MCP.
 * Inline styles keep it readable in any app, with or without Tailwind.
 */
export default function StarterCanvas() {
  return (
    <Canvas>
      <Frame name="Welcome" x={0} y={0} width={1200} height={760}>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            color: "light-dark(#1d1d1b, #ededea)",
            backgroundColor: "light-dark(#f6f5f2, #121211)",
            backgroundImage:
              "radial-gradient(light-dark(rgba(0,0,0,.07), rgba(255,255,255,.06)) 1px, transparent 1px), radial-gradient(circle at 50% 38%, rgba(255,138,92,.16), transparent 55%)",
            backgroundSize: "22px 22px, 100% 100%",
          }}
        >
          <div
            style={{
              width: 520,
              padding: 40,
              borderRadius: 24,
              backgroundColor: "light-dark(#ffffff, #1b1b1a)",
              border: "1px solid light-dark(#e9e8e4, #2a2a28)",
              boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 24px 60px -24px rgba(0,0,0,.25)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden>
              <defs>
                <linearGradient id="tc-starter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff9466" />
                  <stop offset="1" stopColor="#ea6a3c" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="15" fill="url(#tc-starter)" />
              <path
                fill="#f6f5f1"
                fillRule="evenodd"
                d="M10.5 10.5h43v13.1h-43z M25.5 16.8h13v36.7h-13z"
              />
            </svg>
            <h1
              style={{
                margin: "22px 0 6px",
                fontSize: 26,
                lineHeight: "32px",
                fontWeight: 650,
                letterSpacing: "-0.02em",
              }}
            >
              Your canvas is ready
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: "23px",
                color: "light-dark(#6b6b66, #a3a39d)",
              }}
            >
              Everything here is real code from your app. Replace this frame with your own
              components.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14 }}>
                <span
                  style={{
                    minWidth: 58,
                    textAlign: "center",
                    padding: "3px 8px",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: "light-dark(#f3f2ee, #262624)",
                    border: "1px solid light-dark(#e3e1dc, #34342f)",
                  }}
                >
                  Assets
                </span>
                <span>Drag a component from your design system onto a frame</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14 }}>
                <span
                  style={{
                    minWidth: 58,
                    textAlign: "center",
                    padding: "3px 8px",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: "light-dark(#f3f2ee, #262624)",
                    border: "1px solid light-dark(#e3e1dc, #34342f)",
                  }}
                >
                  F
                </span>
                <span>Draw a frame, or pick an iPhone or desktop size</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14 }}>
                <span
                  style={{
                    minWidth: 58,
                    textAlign: "center",
                    padding: "3px 8px",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fff",
                    backgroundColor: "#ee7445",
                    border: "1px solid #e0652f",
                  }}
                >
                  Agent
                </span>
                <span>Ask: “Build a pricing page with our components”</span>
              </div>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight">Heading</h1>
            <h2 className="text-3xl font-semibold tracking-tight">Heading</h2>
            <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
              Button
            </button>
            <div className="flex items-center gap-4">
              <p>Item</p>
              <p>Item</p>
            </div>
          </div>
        </div>
      </Frame>
    </Canvas>
  );
}
