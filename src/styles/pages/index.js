import { styled } from "..";

export const IndexContainer = styled("main", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",
});

export const AboutContainer = styled("div", {
  height: "35%",

  padding: "2rem 0 1.25rem",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "space-around",

  textAlign: "center",

  borderBottom: "1px solid $color04",
});

export const SearchContainer = styled("div", {
  padding: "2rem 0",

  height: "68%",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "flex-start",

  gap: "0.3125rem",

  textAlign: "center",

  label: {
    fontSize: "1.25rem",
  },
});

export const ContainerProjects = styled("div", {
  width: "37.5rem",
  height: "100%",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "start",

  gap: "1.25rem",

  padding: "1.25rem 0",

  backgroundColor: "$color02",

  border: "1px solid $color03",
  borderRadius: "1rem",

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

export const Project = styled("div", {
  width: "90%",

  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-around",

  gap: "1.25rem",

  padding: "0.5rem 0",

  border: "1px solid $color03",
  borderRadius: "0.5rem",
});
