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
