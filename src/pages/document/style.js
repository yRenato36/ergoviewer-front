import { styled } from "../../styles";

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
});

export const DocumentSubContainer = styled("div", {
  height: "2.8125rem",
  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "row",

  gap: "1.25rem",
});