import { styled } from "../../styles";

export const SearchForm = styled("form", {
  width: "50%",

  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-around",
});

export const SearchInput = styled("input", {
  padding: "0 1rem",

  width: "100%",
  height: "2.5rem",

  border: "1px solid $color04",
  borderRight: "none",
  borderRadius: "1.25rem 0 0 1.25rem",

  backgroundColor: "$white",
});

export const SearchButton = styled("button", {
  padding: "0.125rem",

  height: "2.5rem",

  display: "flex",

  alignItems: "center",
  justifyContent: "center",

  border: "1px solid $color04",
  borderLeft: "none",
  borderRadius: "0 1.25rem 1.25rem 0",

  backgroundColor: "$white",

  img: {
    cursor: "pointer",

    padding: "0.3125rem",

    border: "1px solid $color04",
    borderRadius: "50%",
  },

  "img:hover": {
    transition: "0.3s",

    backgroundColor: "$color02",
  },
});
