import { getStorage, ref, getDownloadURL } from "firebase/storage";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  try {
    const projectId = req.query.projectId;
    const storage = getStorage();
    const storageRef = ref(storage, `projects/${projectId}/file.pdf`);
    const downloadURL = await getDownloadURL(storageRef);

    if (!downloadURL) {
      return res.status(404).json({ error: "Arquivo não encontrado." });
    }

    // Redireciona o navegador para o URL de download direto do Firebase Storage
    res.writeHead(302, { Location: downloadURL });
    res.end();
  } catch (error) {
    console.error("Erro ao baixar o arquivo PDF:", error);
    res.status(500).json({ error: "Erro ao baixar o arquivo PDF." });
  }
});

export default handler;
