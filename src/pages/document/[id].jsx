import { Editor } from "@tinymce/tinymce-react";
import { DocumentContainer, DocumentSubContainer } from "./style";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  getProjectById,
  updateProjectContent,
  uploadPdfToStorage,
} from "@/service/firebase";
import { UserContext } from "@/context/UserContext";
import { InputFile } from "@/components/InputFile";
import { Modal } from "@/components/Modal";

export default function CreateDocument() {
  const router = useRouter();
  const { id: project_id } = router.query;

  const { data } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [fileUpload, setFileUpload] = useState();
  const [isOpenUpload, setIsOpenUpload] = useState(false);

  const [fileSave, setFileSave] = useState();
  const [isOpenSave, setIsOpenSave] = useState(false);

  const [content, setContent] = useState();
  const [project, setProject] = useState({});

  const handleFileSave = async (file) => {
    if (file && data) {
      const uploadResult = await uploadPdfToStorage(project_id, file);

      if (uploadResult) {
        alert("Projeto Salvo!");
      } else {
        alert("Erro ao salvar arquivo PDF.");
      }
    } else {
      console.error("Arquivo ou ID do projeto não fornecidos.");
    }
    setFileSave();
  };

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setContent(fileContent);
      };
      reader.readAsText(file);
    }
    setFileUpload();
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "documento.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleClickSaveContent = () => {
    setLoading(true);
    const saved = updateProjectContent(data.uid, project_id, content);
    if (saved) alert("Projeto Salvo!");
    setLoading(false);
  };

  useEffect(() => {
    const fetchDataProject = async () => {
      setLoading(true);
      if (data) {
        try {
          const projectData = await getProjectById(data.uid, project_id);
          if (projectData) {
            setProject(projectData);
            setContent(projectData.content);
          } else {
            router.push("/projects");
          }
        } catch (error) {
          router.push("/projects");
          console.error("Error fetching project data:", error);
        }
      }
      setLoading(false);
    };

    fetchDataProject();
  }, [data, project_id]);

  return (
    <DocumentContainer>
      <Editor
        style={{ maxHeight: "680px" }}
        apiKey="a6100r4ea397xtzqepersskopwhjdma3wlpyb6zr3jrwv1xf"
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        value={content}
        onEditorChange={(newContent) => {
          setContent(newContent);
        }}
      />
      <DocumentSubContainer>
        <Button
          type="button"
          text="Voltar"
          disabled={loading}
          onClick={() => {
            router.back();
          }}
        />
        <Button
          type="button"
          disabled={loading}
          text="Salvar arquivo PDF"
          onClick={() => setIsOpenSave(!isOpenSave)}
        />
        <Button
          type="button"
          disabled={loading}
          text="Carregar arquivo"
          onClick={() => setIsOpenUpload(!isOpenUpload)}
        />
        <Button
          type="button"
          disabled={loading}
          text="Download do conteúdo"
          onClick={handleDownloadTxt}
        />
        <Button
          type="button"
          disabled={loading}
          text="Salvar conteúdo"
          onClick={handleClickSaveContent}
        />
      </DocumentSubContainer>
      <Modal
        isOpen={isOpenUpload}
        onClose={() => {
          setIsOpenUpload(!isOpenUpload);
        }}
        onSubmit={() => {
          handleFileChange(fileUpload);
          setIsOpenUpload(!isOpenUpload);
        }}
      >
        <h1>Carregar Conteúdo</h1>
        <p>
          Tem certeza que deseja carregar o conteúdo do projeto? Isso ira
          substituir o conteúdo atual.
        </p>
        <div>
          <InputFile accept=".txt" onChange={(file) => setFileUpload(file)} />
        </div>
        <button type="submit">Carregar</button>
      </Modal>
      <Modal
        isOpen={isOpenSave}
        onClose={() => {
          setIsOpenSave(!isOpenSave);
        }}
        onSubmit={() => {
          handleFileSave(fileSave);
          setIsOpenSave(!isOpenSave);
        }}
      >
        <h1>Salvar Arquivo PDF</h1>
        <p>
          Tem certeza que deseja salvar o arquivo PDF? Isso ira substituir o
          arquivo atual.
        </p>
        <div>
          <InputFile accept=".pdf" onChange={(file) => setFileSave(file)} />
        </div>
        <button type="submit">Salvar</button>
      </Modal>
    </DocumentContainer>
  );
}
