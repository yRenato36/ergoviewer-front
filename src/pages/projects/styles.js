import { styled } from "../../styles";

export const ProjectContainer = styled("div", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "start",

  gap: "1.25rem",
});

export const TableContainer = styled("div", {
  width: "100%",
  maxHeight: "40rem",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "start",

  margin: "1.25rem auto",
});

export const Table = styled("table", {
  width: "100%",

  caption: {
    margin: "0 2px -2px",

    width: "20%",

    textAlign: "center",

    padding: "0.5rem",
    backgroundColor: "$darkPrimary",

    borderRadius: "0.5rem 0.5rem 0 0",
  },
});

export const Theader = styled("thead", {
  width: "100%",

  tr: {
    width: "100%",

    padding: "1rem 0.5rem 0.5rem 0.5rem",
    backgroundColor: "$darkPrimary",

    borderRadius: "0 0.5rem 0 0",

    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 0.25fr 0.25fr 0.25fr 0.25fr",

    gap: "0.25rem",
  },
});

export const Th = styled("th", {});

export const Tbody = styled("tbody", {
  height: "38rem",
  maxHeight: "38rem",

  marginTop: "0.625rem",
  padding: "0.5rem",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "start",

  gap: "0.625rem",

  borderRadius: "0 0 0.5rem 0.5rem",
  border: "2px solid $darkPrimary",
  borderTop: "none",

  overflowY: "scroll",
});

export const Trbody = styled("tr", {
  width: "100%",

  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 0.25fr 0.25fr 0.25fr 0.25fr",

  gap: "0.25rem",
  alignItems: "center",

  padding: "0.5rem",

  borderRadius: "0.25rem",

  "&:hover": {
    cursor: "pointer",

    transition: "0.3s",
    backgroundColor: "$color03",
  },
});

export const Td = styled("td", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  textAlign: "center",

  "img:hover": {
    cursor: "pointer",

    transition: "0.3s",
    borderRadius: "0.25rem",
    backgroundColor: "$color04",
  },
});

export const Pesquisar = styled("input", {
  width: "100%",
  height: "40px",

  padding: "10px",
  border: "1px solid #bdc3c7",
  borderRadius: "4px",

  transition: "border-color 0.3s ease",
  "&:focus": {
    outline: "none",
    borderColor: "#3498db",
  },
});

export const PesquisarSelect = styled("select", {
  width: "80%",
  height: "40px",

  padding: "10px",
  marginRight: "30px",

  border: "1px solid #bdc3c7",
  borderRadius: "4px",

  transition: "border-color 0.3s ease",
  "&:focus": {
    outline: "none",
    borderColor: "#3498db",
  },
});

export const SubContainer = styled("div", {
  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-around",

  marginTop: "3.25rem",

  button: {
    width: "10rem",
  },
});
