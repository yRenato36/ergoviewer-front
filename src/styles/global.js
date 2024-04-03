import { keyframes } from "@stitches/react";
import { globalCss } from ".";

const animeLeftKeyframes = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateX(-20px)",
  },
  "100%": {
    opacity: 1,
    transform: "none",
  },
});

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  "*:focus": {
    outline: 0,
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
    backgroundColor: "$color01",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  ".animeLeft": {
    opacity: 0,
    transform: "translateX(-20px)",
    animation: `${animeLeftKeyframes} 0.5s forwards`,
  },
});
