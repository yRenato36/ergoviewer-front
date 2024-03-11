import { styled } from "../../../styles";

export const HeaderContainer = styled("header", {
  width: "100%",

  maxWidth: "1180px",
  maxHeight: "3.125rem",

  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",

  alignItems: "center",
  justifyContent: "space-between",

  padding: "auto 0",

  borderBottom: "1px solid $color07",

  img: {
    cursor: "pointer",

    padding: "0.125rem",

    border: "2px solid",
    borderRadius: "50%",

    backgroundColor: "$color01",

    "&:hover": {
      transition: "0.3s",

      border: "2px solid $clearPrimary",
    },
  },
});

export const MenuContainer = styled("div", {
  gridColumn: "3",

  marginLeft: "auto",

  display: "flex",
  flexDirection: "row",

  position: "relative",
});

export const MenuOptions = styled("div", {
  width: "200px",

  display: "flex",
  flexDirection: "column",

  alingnItems: "center",
  justifyContent: "center",

  gap: "0.625rem",
  padding: "0.625rem",

  position: "absolute",
  top: "100%",
  right: 0,

  border: "1px solid $color04",
  borderRadius: "0.25rem",
  backgroundColor: "$white",

  a: {
    cursor: "pointer",
    padding: "0.25rem",
    textAlign: "center",
    borderRadius: "0.25rem",
  },

  "a:hover": {
    transition: "0.3s",

    backgroundColor: "$clearPrimary",
  },
});
