import { styled } from "../../styles";

export const ModalWrapper = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,

  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",

  justifyContent: "center",
  alignItems: "center",

  background: "rgba(0, 0, 0, 0.5)",

  zIndex: 100,
});

export const ModalContent = styled("form", {
  width: "37.5rem",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",

  padding: "20px",

  borderRadius: "0.5rem",
  border: "1px solid $color09",

  backgroundColor: "$white",

  gap: "0.25rem",

  "> div": {
    width: "100%",

    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    gap: "0.5rem",
  },

  button: {
    cursor: "pointer",

    width: "100%",
    height: "2.8125rem",

    padding: "0 0.625rem",

    border: "1px solid $color04",
    borderRadius: "0.5rem",

    backgroundColor: "$white",

    fontSize: "1rem",
    fontWeight: 700,

    "&:hover": {
      transition: "0.3s",
      filter: "brightness(0.9)",
    },

    "&:focus": {
      borderColor: "$darkPrimary",
    },
  },

  h3: {
    width: "100%",
    textAlign: "left",

    fontSize: "1rem",
    fontWeight: 500,
  },

  span: {
    width: "100%",
    textAlign: "center",

    padding: "0.5rem",
    border: "1px solid $color04",
    borderRadius: "0.5rem",

    fontSize: "0.875rem",
    fontWeight: 400,
  },

  overflowY: "scroll",

  "&::-webkit-scrollbar": {
    width: "8px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "$color04",
    borderRadius: "4px",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "$color05",
  },
});
