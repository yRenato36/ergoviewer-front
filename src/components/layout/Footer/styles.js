import { styled } from "../../../styles";

export const ContainerFooter = styled("footer", {
  width: "100%",

  maxWidth: "1180px",

  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "center",

  padding: "0.625rem",

  borderTop: "1px solid $color07",

  p: {
    textAlign: "center",
  },

  a: {
    color: "$darkPrimary",

    fontWeight: "bold",

    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
});
