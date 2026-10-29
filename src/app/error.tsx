"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sriram Travels page failed to render:", error);
  }, [error]);

  return (
    <main
      role="alert"
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background: "#f5f3ee",
        color: "#111b2b",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <section style={{ maxWidth: 520 }}>
        <p style={{ letterSpacing: ".18em", fontSize: 12, fontWeight: 700 }}>
          SRIRAM TRAVELS
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", margin: "16px 0" }}>
          This page hit a snag.
        </h1>
        <p style={{ lineHeight: 1.7, color: "#5a6170" }}>
          The page could not finish rendering. Try loading it again. If this keeps
          happening, open the browser console and share the first red error.
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
      </section>
    </main>
  );
}
