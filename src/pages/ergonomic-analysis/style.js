import { styled } from "../../styles";

export const ErgonomicAnalysisContainer = styled("main", {
  height: "100%",

  width: "100%",
  maxWidth: "1180px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  justifyContent: "center",

  gap: "1.25rem",
});

export const ErgonomicAnalysisSubContainer = styled("div", {});

export const StyledVideo = styled("video", {
  // Adicione estilos aqui
  maxWidth: "100%",
  width: "100%",
  height: "auto", // Isso garante que o vídeo mantenha sua proporção de aspecto original
  borderRadius: "8px", // Adicione bordas arredondadas, se desejar
});
