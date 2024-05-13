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

  padding: "20px",

  borderRadius: "0.5rem",
  border: "1px solid $color09",

  backgroundColor: "$white",

  gap: "0.25rem",

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
    textAlign: "center",

    fontSize: "1rem",
    fontWeight: 600,
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
});

export const ModalAnalysis = styled("div", {
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

export const ModalAnalysisContent = styled("div", {
  width: "1180px",
  minHeight: "580px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "space-between",

  padding: "10px",

  borderRadius: "0.5rem",
  border: "1px solid $color09",

  backgroundColor: "$white",

  gap: "0.5rem",

  ".sub-container": {
    height: "100%",

    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    gap: "1.25rem",
  },

  ".analysis-container": {
    width: "100%",

    display: "flex",
    flexDirection: "row",

    gap: "0.5rem",
  },

  ".img-container": {
    position: "relative",

    paddingTop: "0.25rem",

    width: "720px",
    height: "100%",

    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "space-between",

    gap: "0.5rem",
  },

  ".screenshot": {
    width: "720px",
    height: "480px",

    top: "0%",
    left: "0%",
    transform: "translate(-0%, -0%)",

    borderRadius: "0.5rem",

    border: "1px solid $color04",
    borderRadius: "0.5rem",
  },

  ".canvas-overlay": {
    marginTop: "5px",

    position: "absolute",
    top: "0%",
    left: "0%",
    transform: "translate(-0%, -0%)",
  },

  ".params-container": {
    width: "720px",

    display: "flex",
    flexDirection: "row",

    gap: "0.5rem",
  },

  ".input-container": {
    width: "400px",
    height: "auto",

    gap: "0.5rem",

    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "space-between",

    h1: {
      fontSize: "1rem",
      fontWeight: 600,

      textAlign: "center",
    },
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

  input: {
    width: "100%",
    height: "2.8125rem",

    padding: "0 0.625rem",

    border: "1px solid $color04",
    borderRadius: "0.5rem",

    backgroundColor: "$white",

    fontSize: "1rem",

    "&:focus": {
      borderColor: "$darkPrimary",
    },
  },

  textarea: {
    resize: "none",

    width: "100%",
    height: "2.8125rem",

    border: "1px solid $color04",
    borderRadius: "0.5rem",

    backgroundColor: "$white",

    padding: "0.5rem",
    boxSizing: "borderBox",
    lineHeight: "1.5",

    fontSize: "1rem",

    "&:focus": {
      borderColor: "$darkPrimary",
    },
  },

  ".small-component": {
    width: "max-content",
  },

  ".icon": {
    height: "100%",
  },
});
