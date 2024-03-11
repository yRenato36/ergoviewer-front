import { styled } from "..";

export const IndexContainer = styled("main", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",
});

export const AboutContainer = styled("div", {
  height: "35%",

  padding: "2rem 0 1.25rem",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "space-around",

  textAlign: "center",

  borderBottom: "1px solid $color04",
});

export const SearchContainer = styled("div", {
  padding: "2rem 0",

  height: "24.5rem",
  maxHeight: "24.5rem",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "flex-start",

  gap: "0.3125rem",

  textAlign: "center",

  label: {
    fontSize: "1.25rem",
  },
});
