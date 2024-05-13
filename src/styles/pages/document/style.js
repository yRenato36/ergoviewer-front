import { styled } from "../..";

export const DocumentContainer = styled("main", {
  height: "100%",
  maxHeight: "800px",

  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",

  gap: "1.25rem",

  ".analysis-container": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.25rem",
  },
});

export const DocumentSubContainer = styled("div", {
  height: "2.8125rem",
  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "row",

  gap: "1.25rem",
});
