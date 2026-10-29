"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sriram Travels application failed:", error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          background: "#f5f3ee",
          color: "#111b2b",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <main role="alert" style={{ maxWidth: 520 }}>
          <p style={{ letterSpacing: ".18em", fontSize: 12, fontWeight: 700 }}>
            SRIRAM TRAVELS
          </p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
            The site could not start.
          </h1>
          <p style={{ lineHeight: 1.7, color: "#5a6170" }}>
            Something went wrong while loading the application. Try again. If it
            repeats, share the first red error from your terminal or browser console.
          </p>
          {error.digest ? (
            <p style={{ fontSize: 12, color: "#5a6170" }}>Error reference: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 12,
              padding: "13px 20px",
              border: 0,
              background: "#111b2b",
              color: "#fff",
              font: "inherit",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
