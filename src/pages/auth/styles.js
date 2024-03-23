import { styled } from "../../styles";

export const AuthenticationContainer = styled("main", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",
});

export const AuthenticationSubContainer = styled("form", {
  width: "21.875rem",
  height: "25rem",

  margin: "7.5rem 0",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",

  gap: "0.625rem",

  h1: {
    textAlign: "center",

    fontSize: "1.8rem",
    fontWeight: 400,
  },
});

export const PasswordContainer = styled("div", {
  width: "100%",

  display: "grid",
  gridTemplateColumns: "1.4fr 0.6fr",

  input: {
    width: "100%",
    borderRadius: "0.5rem 0 0 0.5rem",
  },

  button: {
    borderRadius: "0 0.5rem 0.5rem 0",
  },
});
