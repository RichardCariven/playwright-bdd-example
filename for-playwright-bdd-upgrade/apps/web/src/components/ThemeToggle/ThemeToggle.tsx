"use client";

// Test component for theme toggle can be removed
import React from "react";

import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

export const ThemeToggle = () => {
  const handleToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    sendGAEvent("event", "theme-toggle", {
      value: "theme-toggle",
      myCustom: "triforce",
    });
    sendGTMEvent({ event: "theme-toggle", value: "theme-toggle" });
  };
  return (
    <button
      className="w-full rounded-full bg-primary-light px-5 py-2 text-neutral"
      onClick={handleToggleTheme}
    >
      Theme Toggle
    </button>
  );
};
