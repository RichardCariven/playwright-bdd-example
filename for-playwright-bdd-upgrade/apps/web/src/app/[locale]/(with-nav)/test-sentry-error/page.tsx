"use client";

export default function TestSentryError() {
  const throwSentryError = () => {
    throw new Error(`Test Sentry error`);
  };
  return (
    <button type="button" className="bg-white" onClick={throwSentryError}>
      Break the World
    </button>
  );
}
