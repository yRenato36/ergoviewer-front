import { styled } from "../../styles";

export const ButtonContainer = styled("button", {
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
});
