import { styled } from "../../styles";

export const ProfileContainer = styled("main", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",
});

export const FormContainer = styled("form", {
  width: "100%",
  maxWidth: "50rem",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",

  gap: "0.625rem",
});

export const ProfileSubContainer = styled("div", {
  width: "100%",
  maxWidth: "50rem",

  display: "grid",
  gridTemplateColumns: "0.5fr 1.5fr",

  alignItems: "center",

  label: {
    textAlign: "start",
  },
});

export const ContainerButton = styled("div", {
  width: "100%",

  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-between",

  gap: "0.625rem",
});
