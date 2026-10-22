import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "70vh", display: "grid", placeContent: "center", textAlign: "center", padding: 24 }}>
      <p style={{ letterSpacing: ".2em", fontSize: 11 }}>SRIRAM TRAVELS</p>
      <h1 style={{ fontSize: "clamp(42px, 8vw, 76px)", margin: "14px 0" }}>Wrong turn.</h1>
      <p style={{ color: "#737982" }}>That page could not be found. Let&apos;s get you back on the road.</p>
      <Link href="/" style={{ marginTop: 24, textDecoration: "underline" }}>Back to home →</Link>
    </main>
  );
}
