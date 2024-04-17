import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import {
  ErgonomicAnalysisContainer,
  ErgonomicAnalysisSubContainer,
  StyledVideo,
} from "./style";
import html2canvas from "html2canvas";
import { InputFile } from "@/components/InputFile";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";

import Image from "next/image";
import IconDrawing from "@/assets/icon-edit.svg";
import IconRuler from "@/assets/icon-ruler.svg";
import IconAngle from "@/assets/icon-angle.svg";
import IconClean from "@/assets/icon-clean.svg";

export default function ErgonomicAnalysis() {
  const router = useRouter();
  const { id: project_id } = router.query;

  const videoRef = useRef(null);
  const { data } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [isOpenAnalysis, setIsOpenAnalysis] = useState(false);

  const [nameAnalysis, setNameAnalysis] = useState("");

  const [selectedMethod, setSelectedMethod] = useState(0);
  const optionsMethods = [
    { value: 0, label: "Selecione uma opção" },
    { value: 1, label: "Método NIOSH" },
    { value: 2, label: "Método OWAS" },
    { value: 3, label: "Método RULA" },
  ];

  // NIOSH
  const [horizontalDistanceNIOSH, setHorizontalDistanceNIOSH] = useState("");
  const [verticalDistanceNIOSH, setVerticalDistanceNIOSH] = useState("");
  const [verticalShiftNIOSH, setVerticalShiftNIOSH] = useState("");
  const [torqueAngleNIOSH, setTorqueAngleNIOSH] = useState("");
  const [averageFrequencyNIOSH, setAverageFrequencyNIOSH] = useState("");
  const [qualityNIOSH, setQualityNIOSH] = useState("");
  const [massNIOSH, setMassNIOSH] = useState("");

  //OWAS
  const [armPostureOWAS, setArmPostureOWAS] = useState(0);
  const [backPostureOWAS, setBackPostureOWAS] = useState(0);
  const [legPostureOWAS, setLegPostureOWAS] = useState(0);
  const [highLoadOWAS, setHighLoadOWAS] = useState(0);
  const optionsOWAS = {
    armPosture: [
      { value: 0, label: "Selecione uma opção de Postura dos Braços" },
      { value: 1, label: "Os dois braços abaixo dos ombros" },
      { value: 2, label: "Um braço no nível ou acima dos ombros" },
      { value: 3, label: "Ambos os braços no nível ou acima dos ombros" },
    ],
    backPosture: [
      { value: 0, label: "Selecione uma opção de Postura das Costas" },
      { value: 1, label: "Postura ereta" },
      { value: 2, label: "Postura inclinada" },
      { value: 3, label: "Postura ereta e torcida" },
      { value: 4, label: "Postura inclinada e torcida" },
    ],
    legPosture: [
      { value: 0, label: "Selecione uma opção de Postura das Pernas" },
      { value: 1, label: "Sentado" },
      { value: 2, label: "De pé com ambas as pernas esticadas" },
      { value: 3, label: "De pé com uma das pernas esticada" },
      { value: 4, label: "De pé com ambos os joelhos dobrados" },
      { value: 5, label: "De pé com um dos joelhos dobrados" },
      { value: 6, label: "Ajoelhado com ambos os joelhos" },
      { value: 7, label: "Andando ou se movendo" },
    ],
    highLoad: [
      { value: 0, label: "Selecione uma opção do Nivel de Carga" },
      { value: 1, label: "Menor que 10kg" },
      { value: 2, label: "Entre 10kg e 20kg" },
      { value: 3, label: "Maior que 20kg" },
    ],
  };

  const handleFileChange = (file) => {
    if (file) setSelectedVideo(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (selectedVideo) videoRef.current.src = selectedVideo;
  }, [selectedVideo]);

  useEffect(() => {
    console.log(selectedMethod);
  }, [selectedMethod]);

  const handleScreenshot = () => {
    html2canvas(videoRef.current).then(function (canvas) {
      var imgData = canvas.toDataURL();
      setScreenshotUrl(imgData);
      setIsOpenAnalysis(true);
    });
  };

  function renderInputContainer() {
    if (selectedMethod == 1) {
      return (
        <div className="input-container">
          <input
            type="text"
            placeholder="Nome da Análise"
            value={nameAnalysis}
            onChange={(e) => setNameAnalysis(e.target.value)}
          />
          <input
            type="number"
            placeholder="Distância Horizontal (cm)"
            value={horizontalDistanceNIOSH}
            onChange={(e) => setHorizontalDistanceNIOSH(e.target.value)}
          />
          <input
            type="number"
            placeholder="Distância Vertical (cm)"
            value={verticalDistanceNIOSH}
            onChange={(e) => setVerticalDistanceNIOSH(e.target.value)}
          />
          <input
            type="number"
            placeholder="Deslocamento Vertical (cm)"
            value={verticalShiftNIOSH}
            onChange={(e) => setVerticalShiftNIOSH(e.target.value)}
          />
          <input
            type="number"
            placeholder="Ãngulo de Torção do Tronco (graus)"
            value={torqueAngleNIOSH}
            onChange={(e) => setTorqueAngleNIOSH(e.target.value)}
          />
          <input
            type="number"
            placeholder="Frequência Média de Levantamento"
            value={averageFrequencyNIOSH}
            onChange={(e) => setAverageFrequencyNIOSH(e.target.value)}
          />
          <input
            type="number"
            placeholder="Qualidade da Pega"
            value={qualityNIOSH}
            onChange={(e) => setQualityNIOSH(e.target.value)}
          />
          <input
            type="number"
            placeholder="MassNIOSHa da Carga"
            value={massNIOSH}
            onChange={(e) => setMassNIOSH(e.target.value)}
          />
          <button>Gerar Resultado</button>
          <button>Salvar Análise</button>
          <input type="text" placeholder="Resultado ..." disabled />
        </div>
      );
    } else if (selectedMethod == 2) {
      return (
        <div className="input-container">
          <Select
            options={optionsOWAS.armPosture}
            value={armPostureOWAS}
            onChange={(e) => setArmPostureOWAS(e.target.value)}
          />
          <Select
            options={optionsOWAS.backPosture}
            value={backPostureOWAS}
            onChange={(e) => setBackPostureOWAS(e.target.value)}
          />
          <Select
            options={optionsOWAS.legPosture}
            value={legPostureOWAS}
            onChange={(e) => setLegPostureOWAS(e.target.value)}
          />
          <Select
            options={optionsOWAS.highLoad}
            value={highLoadOWAS}
            onChange={(e) => setHighLoadOWAS(e.target.value)}
          />
          <button>Gerar Resultado</button>
          <button>Salvar Análise</button>
          <input type="text" placeholder="Resultado ..." disabled />
        </div>
      );
    } else if (selectedMethod == 3) {
      return <div className="input-container"></div>;
    } else {
      return (
        <div className="input-container">
          <h1>Selecione um Método</h1>
        </div>
      );
    }
  }

  return (
    <ErgonomicAnalysisContainer>
      <ErgonomicAnalysisSubContainer>
        <Button text="Criar ou Editar Documento" />
      </ErgonomicAnalysisSubContainer>
      <ErgonomicAnalysisSubContainer>
        <Select
          options={[
            { value: 0, label: "Selecione uma opção" },
            { value: 1, label: "Opção 1" },
            { value: 2, label: "Opção 2" },
          ]}
          // value={"Opção 0"}
          onChange={(e) => {}}
          onBlur={() => {}}
        />
        <Button text="Abrir Análise" />
        <Button text="Criar Análise (ScreenShot)" onClick={handleScreenshot} />
      </ErgonomicAnalysisSubContainer>
      <InputFile type="file" accept="video/*" onChange={handleFileChange} />
      <StyledVideo
        ref={videoRef}
        controls
        height={"100%"}
        style={{ maxWidth: "100%" }}
      >
        Selecione um vídeo para reproduzir.
      </StyledVideo>
      <Modal
        isAnalysis={true}
        isOpen={isOpenAnalysis}
        onClose={() => {
          setIsOpenAnalysis(!isOpenAnalysis);
        }}
        onSubmit={() => {
          setIsOpenAnalysis(!isOpenAnalysis);
        }}
      >
        <div className="analysis-container">
          <Select
            options={optionsMethods}
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <button className="small-component">Ajuda</button>
        </div>
        <div className="sub-container">
          <div className="img-container">
            {screenshotUrl && (
              <img
                className="screenshot"
                src={screenshotUrl}
                alt="Screenshot"
              />
            )}
            <div className="params-container">
              <button className="small-component">
                <Image
                  src={IconDrawing}
                  alt="Desenhar"
                  title="Desenhar"
                  className={"icon"}
                  onClick={() => {}}
                />
              </button>
              <button className="small-component">
                <Image
                  src={IconRuler}
                  alt="Distância"
                  title="Distância"
                  className={"icon"}
                  onClick={() => {}}
                />
              </button>
              <input type="text" disabled placeholder="Distância" />
              <button className="small-component">
                <Image
                  src={IconAngle}
                  alt="Ângulo"
                  title="Ângulo"
                  className={"icon"}
                  onClick={() => {}}
                />
              </button>
              <input type="text" disabled placeholder="Ângulo" />
              <button className="small-component">
                <Image
                  src={IconClean}
                  alt="Apagar"
                  title="Apagar"
                  className={"icon"}
                  onClick={() => {}}
                />
              </button>
              <button>Salvar Imagem</button>
            </div>
          </div>
          {renderInputContainer()}
        </div>
      </Modal>
    </ErgonomicAnalysisContainer>
  );
}
