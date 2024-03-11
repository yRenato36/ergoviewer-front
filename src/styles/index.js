import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      black: "#000",
      white: "#fff",

      color01: "#f1f5f9",
      color02: "#e2e8f0",
      color03: "#cbd5e1",
      color04: "#94a3b8",
      color05: "#64748b",
      color06: "#475569",
      color07: "#334155",
      color08: "#1e293b",
      color09: "#0f172a",

      clearPrimary: "#93c5fd",
      darkPrimary: "#3b82f6",

      red500: "#ef4444",
      red300: "#fca5a5",
    },
  },
});
