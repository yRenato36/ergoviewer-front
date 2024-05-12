import { styled } from "../../styles";

export const RegisterAddressContactDetailsContainer = styled("main", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",
});

export const FormContainer = styled("form", {
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

export const ContainerInput = styled("div", {
  width: "100%",

  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.625rem",
});

export const ContainerButton = styled("div", {
  width: "100%",

  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-between",

  gap: "0.625rem",
});
