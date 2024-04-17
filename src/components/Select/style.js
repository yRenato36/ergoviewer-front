import { styled } from "../../styles";

export const SelectContainer = styled("div", {
  width: "100%",
});

export const SelectComponent = styled("select", {
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
