import { styled } from "../../styles";

export const InputFileContainer = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

// Estilize o input file
export const InputFileComponent = styled("input", {
  // Tornar o input transparente para que possamos estilizá-lo completamente
  opacity: 0,
  width: "0.1px",
  height: "0.1px",
  overflow: "hidden",
  position: "absolute",
  zIndex: -1,
});

// Estilize o rótulo do input file
export const InputFileLabel = styled("label", {
  backgroundColor: "#3498db",
  color: "white",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#2980b9",
  },
});
