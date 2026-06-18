"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0a0d14",
          color: "#e8ebf2",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "420px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#8a93a6", fontSize: "0.875rem" }}>
            An unexpected error occurred. Please try again.
          </p>
          {error.digest && (
            <p style={{ marginTop: "0.5rem", color: "#586173", fontSize: "0.75rem" }}>
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.625rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#2de0b6",
              color: "#04150f",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
