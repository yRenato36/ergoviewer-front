import { Editor } from "@tinymce/tinymce-react";
import { CreateDocumentContainer } from "./style";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateDocument() {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (newContent) => {
    console.log("Content was updated: ", newContent);
    setContent(newContent);
  };

  return (
    <CreateDocumentContainer>
      <Editor
        style={{ maxHeight: "680px" }}
        apiKey="rze5ssngf1fn1ir9eirf4b98zfa7sr9t948ec8lgl6johlr7"
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
        initialValue={`
          Hello, World!
        `}
        value={content}
        onEditorChange={handleEditorChange}
      />
      <>
        <Button
          type="button"
          text="Voltar"
          disabled={loading}
          onClick={() => {
            router.back();
          }}
        />
        <Button type="submit" disabled={loading} text="Atualizar" />
      </>
    </CreateDocumentContainer>
  );
}
