import { styled } from "../../styles";

export const InputContainer = styled("div", {
  width: "100%",
});

export const InputComponent = styled("input", {
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
});

export const LabelComponent = styled("label", {
  fontSize: "0.75rem",
  fontWeight: 700,

  display: "block", // Para que a label apareça acima do input
  marginBottom: "0.25rem",
});
