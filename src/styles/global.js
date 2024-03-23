import { globalCss } from ".";

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
});
