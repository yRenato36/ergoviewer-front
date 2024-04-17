// pages/api/downloadPdf.js

import fetch from "node-fetch"; // Importe a biblioteca fetch

export default async function handler(req, res) {
  const { projectId } = req.query; // Obtém o projectId da URL da solicitação

  try {
    // Constrói a URL de download do arquivo PDF do Firebase Storage
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/ergoviewer-95a5d.appspot.com/o/projects%2F${projectId}%2Ffile.pdf?alt=media`;

    // Faz a solicitação para obter o conteúdo do arquivo PDF
    const response = await fetch(downloadURL);
    if (!response.ok) {
      throw new Error("Erro ao baixar o arquivo PDF.");
    }

    // Define os cabeçalhos para indicar que a resposta é um arquivo PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="project_${projectId}_file.pdf"`
    );

    // Envie o conteúdo do arquivo PDF como resposta
    response.body.pipe(res);
  } catch (error) {
    console.error("Erro ao baixar o arquivo PDF:", error);
    res.status(500).send("Erro ao baixar o arquivo PDF.");
  }
}
