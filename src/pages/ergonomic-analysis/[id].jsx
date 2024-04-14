import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import {
  ErgonomicAnalysisContainer,
  ErgonomicAnalysisSubContainer,
} from "./style";
import html2canvas from "html2canvas";
import { InputFile } from "@/components/InputFile";
import { Button } from "@/components/Button";

export default function ErgonomicAnalysis() {
  const router = useRouter();
  const { id: project_id } = router.query;

  const { data } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (selectedVideo) {
      // Carregar o vídeo quando o vídeo selecionado mudar
      videoRef.current.src = selectedVideo;
      videoRef.current.play();
    }
  }, [selectedVideo]);

  const handleScreenshot = () => {
    html2canvas(videoRef.current).then(function (canvas) {
      var imgData = canvas.toDataURL();
      var screenshotImage = new Image();
      screenshotImage.src = imgData;
      document.body.appendChild(screenshotImage);
    });
  };

  return (
    <ErgonomicAnalysisContainer>
      <ErgonomicAnalysisSubContainer>
        <h1>Projeto</h1>
        <InputFile accept="video/*" onChange={handleFileChange} />
        <video
          ref={videoRef}
          controls
          width="640"
          height="360"
          style={{ maxWidth: "100%" }}
        >
          Selecione um vídeo para reproduzir.
        </video>
        <div>
          <Button onClick={handleScreenshot} text="Tirar Screenshot" />
        </div>
      </ErgonomicAnalysisSubContainer>
    </ErgonomicAnalysisContainer>
  );
}
