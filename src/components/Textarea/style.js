import { styled } from "../../styles";

export const TextareaContainer = styled("div", {
  width: "100%",
});

export const TextareaComponent = styled("textarea", {
  resize: "none",

  width: "100%",
  height: "5.625rem",

  padding: "0.625rem",

  border: "1px solid $color04",
  borderRadius: "0.5rem",

  backgroundColor: "$white",

  fontSize: "1rem",

  "&:focus": {
    borderColor: "$darkPrimary",
  },
});
