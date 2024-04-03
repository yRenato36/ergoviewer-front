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

      color01: "#fafaf9",
      color02: "#f5f5f4",
      color03: "#e7e5e4",
      color04: "#d6d3d1",
      color05: "#a8a29e",
      color06: "#78716c",
      color07: "#57534e",
      color08: "#44403c",
      color09: "#292524",

      clearPrimary: "#93c5fd",
      darkPrimary: "#3b82f6",

      red500: "#ef4444",
      red300: "#fca5a5",
    },
  },
});
