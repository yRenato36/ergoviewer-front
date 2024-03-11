import { styled } from "../../styles";

export const HomeContainer = styled("main", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",
});

export const FormContainer = styled("div", {
  width: "53.125rem",
  maxWidth: "53.125rem",

  display: "flex",
  flexDirection: "row",

  label: {
    width: "15%",
    textAlign: "left",
    fontSize: "1.25rem",
    padding: "0.125rem 0",
    marginRight: "0.625rem",
  },

  input: {
    width: "70%",

    padding: "0.125rem 0",

    border: "none",
    borderBottom: "1px solid $color04",

    backgroundColor: "transparent",

    fontSize: "1.25rem",
  },

  button: {
    width: "15%",

    border: "none",
    borderBottom: "1px solid $color04",

    backgroundColor: "transparent",

    fontSize: "1.25rem",

    padding: "0.125rem 0",

    cursor: "pointer",
  },

  "button:hover": {
    fontWeight: 700,
  },
});
