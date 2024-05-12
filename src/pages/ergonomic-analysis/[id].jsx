import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import html2canvas from "html2canvas";

import { UserContext } from "@/context/UserContext";

import { getProjectById } from "@/service/firebase";

import {
  ErgonomicAnalysisContainer,
  ErgonomicAnalysisSubContainer,
  StyledVideo,
} from "./style";

import { InputFile } from "@/components/InputFile";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";

import { NIOSHMethodComponent } from "@/components/Methods/NIOSH";
import { OWASMethodComponent } from "@/components/Methods/OWAS";
import { RULAMethodComponent } from "@/components/Methods/RULA";

import IconDrawing from "@/assets/icon-edit.svg";
import IconRuler from "@/assets/icon-ruler.svg";
import IconAngle from "@/assets/icon-angle.svg";
import IconText from "@/assets/icon-text.svg";
import IconClean from "@/assets/icon-clean.svg";

export default function ErgonomicAnalysis() {
  const router = useRouter();
  const { id: project_id } = router.query;

  const { data } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState(null);

  async function fetchDataProject() {
    setLoading(true);
    if (data) {
      const projectData = await getProjectById(data.uid, project_id);
      if (projectData) {
        setProjectData(projectData);
        console.log(projectData);
      } else {
        router.push("/projects");
      }
    }
    setLoading(false);
  }

  const videoRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [isOpenAnalysis, setIsOpenAnalysis] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState(0);
  const optionsMethods = [
    { value: 0, label: "Selecione uma opção" },
    { value: 1, label: "Método NIOSH" },
    { value: 2, label: "Método OWAS" },
    { value: 3, label: "Método RULA" },
  ];

  const [isOpenHelp, setIsOpenHelp] = useState(false);

  //Imagem salva?
  const [isSavedImage, setIsSavedImage] = useState(false);

  const handleFileChange = (file) => {
    if (file) setSelectedVideo(URL.createObjectURL(file));
  };

  const handleScreenshot = () => {
    html2canvas(videoRef.current).then(function (canvas) {
      var imgData = canvas.toDataURL();
      setScreenshotUrl(imgData);
      setIsOpenAnalysis(true);
    });
  };

  const handleHelpClick = () => {
    switch (selectedMethod) {
      case "1":
        return <NIOSHMethodComponent content="help" />;
      case "2":
        return <OWASMethodComponent content="help" />;
      case "3":
        return <RULAMethodComponent content="help" />;
      default:
        return <h1>Selecione uma opção</h1>;
    }
  };

  const [color, setColor] = useState("red");

  const primaryColors = [
    { label: "Vermelho - Branco", value: "red" },
    { label: "Azul - Branco", value: "blue" },
    { label: "Amarelo - Preto", value: "yellow" },
    { label: "Verde - Branco", value: "green" },
    { label: "Laranja - Preto", value: "orange" },
    { label: "Roxo - Branco", value: "purple" },
    { label: "Ciano - Preto", value: "cyan" },
    { label: "Magenta - Branco", value: "magenta" },
  ];

  const contrastColors = {
    red: "white",
    blue: "white",
    yellow: "black",
    green: "white",
    orange: "black",
    purple: "white",
    cyan: "black",
    magenta: "white",
  };

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const toggleDrawingMode = () => {
    cancelDistance();
    cancelAngle();
    setIsDrawingMode(!isDrawingMode);
  };

  useEffect(() => {
    if (!isOpenAnalysis) return;
    setIsSavedImage(false);
    const canvas = canvasRef.current;
    canvas.width = 720 * 2;
    canvas.height = 480 * 2;
    canvas.style.width = `720px`;
    canvas.style.height = `480px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color || "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, [isOpenAnalysis]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isOpenAnalysis) return;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!isOpenAnalysis) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isDrawing || !isOpenAnalysis) return;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const drawCircle = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, 5, 0, Math.PI * 2);
    contextRef.current.fillStyle = contrastColors[color] || "yellow";
    contextRef.current.fill();
  };

  const [isMeasuringDistanceMode, setIsMeasuringDistanceMode] = useState(false);
  const [firstPointDistance, setFirstPointDistance] = useState(null);
  const [secondPointDistance, setSecondPointDistance] = useState(null);

  const toggleMeasuringDistanceMode = () => {
    cancelDrawing();
    cancelAngle();
    setIsMeasuringDistanceMode(!isMeasuringDistanceMode);
  };

  const drawDistanceText = (startPointDistance, endPointDistance, distance) => {
    const midPointX = (startPointDistance.x + endPointDistance.x) / 2;
    const midPointY = (startPointDistance.y + endPointDistance.y) / 2;
    contextRef.current.font = "14px Arial";
    contextRef.current.fillStyle = contrastColors[color] || "yellow";
    contextRef.current.textAlign = "center";
    contextRef.current.fillText(distance.toFixed(2), midPointX, midPointY);
  };

  const drawMeasureLine = () => {
    if (!firstPointDistance || !secondPointDistance) return;

    contextRef.current.beginPath();
    contextRef.current.moveTo(firstPointDistance.x, firstPointDistance.y);
    contextRef.current.lineTo(secondPointDistance.x, secondPointDistance.y);
    contextRef.current.stroke();
  };

  const calculateDistance = () => {
    if (!firstPointDistance || !secondPointDistance) return 0;

    const distance = Math.sqrt(
      Math.pow(secondPointDistance.x - firstPointDistance.x, 2) +
        Math.pow(secondPointDistance.y - firstPointDistance.y, 2)
    );
    return distance;
  };

  const startMeasuringDistance = ({ nativeEvent }) => {
    if (!isOpenAnalysis) return;
    const { offsetX, offsetY } = nativeEvent;
    if (!firstPointDistance) {
      setFirstPointDistance({ x: offsetX, y: offsetY });
    } else {
      setSecondPointDistance({ x: offsetX, y: offsetY });
    }
  };

  const endMeasuringDistance = () => {
    if (!isOpenAnalysis) return;
    if (!firstPointDistance || !secondPointDistance) return;

    drawCircle(firstPointDistance.x, firstPointDistance.y);
    drawCircle(secondPointDistance.x, secondPointDistance.y);
    drawMeasureLine();

    const distance = calculateDistance();
    drawDistanceText(firstPointDistance, secondPointDistance, distance);

    setFirstPointDistance(null);
    setSecondPointDistance(null);
  };

  const [isMeasuringAngleMode, setIsMeasuringAngleMode] = useState(false);
  const [firstPointAngle, setFirstPointAngle] = useState(null);
  const [secondPointAngle, setSecondPointAngle] = useState(null);
  const [thirdPointAngle, setThirdPointAngle] = useState(null);

  const toggleMeasuringAngleMode = () => {
    cancelDrawing();
    cancelDistance();
    setIsMeasuringAngleMode(!isMeasuringAngleMode);
  };

  const calculateAngle = () => {
    if (!firstPointAngle || !secondPointAngle || !thirdPointAngle) return 0;

    const vector1 = {
      x: secondPointAngle.x - firstPointAngle.x,
      y: secondPointAngle.y - firstPointAngle.y,
    };
    const vector2 = {
      x: thirdPointAngle.x - secondPointAngle.x,
      y: thirdPointAngle.y - secondPointAngle.y,
    };

    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;

    const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);

    // Verifica se os vetores são quase paralelos
    if (Math.abs(dotProduct / (magnitude1 * magnitude2) - 1) < 1e-10) {
      return 180; // Quase paralelo, ângulo próximo de 180 graus
    }

    let angleRad = Math.acos(dotProduct / (magnitude1 * magnitude2));

    let angleDeg = (angleRad * 180) / Math.PI;

    angleDeg = angleDeg > 180 ? 360 - angleDeg : angleDeg;

    return angleDeg;
  };

  const drawAngleText = (firstPoint, secondPoint, thirdPoint, angleDegrees) => {
    const centroidX = (firstPoint.x + secondPoint.x + thirdPoint.x) / 3;
    const centroidY = (firstPoint.y + secondPoint.y + thirdPoint.y) / 3;

    contextRef.current.font = "14px Arial";
    contextRef.current.fillStyle = contrastColors[color] || "yellow";
    contextRef.current.textAlign = "center";
    contextRef.current.fillText(
      angleDegrees.toFixed(2) + "°",
      centroidX,
      centroidY
    );
  };

  const startMeasuringAngle = ({ nativeEvent }) => {
    if (!isOpenAnalysis) return;
    const { offsetX, offsetY } = nativeEvent;
    if (!firstPointAngle) {
      setFirstPointAngle({ x: offsetX, y: offsetY });
    } else if (!secondPointAngle) {
      setSecondPointAngle({ x: offsetX, y: offsetY });
    } else if (!thirdPointAngle) {
      setThirdPointAngle({ x: offsetX, y: offsetY });
    }
  };

  const endMeasuringAngle = () => {
    if (!isOpenAnalysis) return;
    if (!firstPointAngle || !secondPointAngle || !thirdPointAngle) return;

    drawCircle(firstPointAngle.x, firstPointAngle.y);
    drawCircle(secondPointAngle.x, secondPointAngle.y);
    drawCircle(thirdPointAngle.x, thirdPointAngle.y);

    contextRef.current.beginPath();
    contextRef.current.moveTo(firstPointAngle.x, firstPointAngle.y);
    contextRef.current.lineTo(secondPointAngle.x, secondPointAngle.y);
    contextRef.current.lineTo(thirdPointAngle.x, thirdPointAngle.y);
    contextRef.current.stroke();

    const angle = calculateAngle();

    drawAngleText(firstPointAngle, secondPointAngle, thirdPointAngle, angle);

    setFirstPointAngle(null);
    setSecondPointAngle(null);
    setThirdPointAngle(null);
  };

  const [isDrawingTextMode, setIsDrawingTextMode] = useState(false);

  const toggleDrawingTextMode = () => {
    cancelDrawing();
    cancelDistance();
    cancelAngle();
    setIsDrawingTextMode(!isDrawingTextMode);
  };

  const startDrawText = ({ nativeEvent }) => {
    if (!isOpenAnalysis) return;
    const { offsetX, offsetY } = nativeEvent;

    const text = prompt("Digite o texto:");
    if (!text) return;

    contextRef.current.font = "bold 20px Arial";
    contextRef.current.fillStyle = contrastColors[color] || "black";
    contextRef.current.textAlign = "center";
    contextRef.current.fillText(text, offsetX, offsetY);

    setIsDrawingTextMode(false);
  };

  const clearCanvas = () => {
    cancelDrawing();
    cancelDistance();
    cancelAngle();
    if (!isOpenAnalysis) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  function cancelDrawing() {
    setIsDrawing(false);
    setIsDrawingMode(false);
  }

  function cancelDistance() {
    setIsMeasuringDistanceMode(false);
    setFirstPointDistance(null);
    setSecondPointDistance(null);
  }

  function cancelAngle() {
    setIsMeasuringAngleMode(false);
    setFirstPointAngle(null);
    setSecondPointAngle(null);
    setThirdPointAngle(null);
  }

  const saveCanvasAndImage = () => {
    const canvas = canvasRef.current;
    const img = document.querySelector(".screenshot");
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);

    const url = tempCanvas.toDataURL();
    const link = document.createElement("a");
    link.href = url;
    link.download = "canvas_and_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsSavedImage(true);
  };

  useEffect(() => {
    if (selectedVideo) videoRef.current.src = selectedVideo;
  }, [selectedVideo]);

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
          <button
            className="small-component"
            onClick={() => setIsOpenHelp(!isOpenHelp)}
          >
            Ajuda
          </button>
        </div>
        <div className="sub-container">
          <div className="img-container">
            {!screenshotUrl ? (
              <img className="screenshot" src="" alt="Screenshot" />
            ) : (
              <img
                className="screenshot"
                src={screenshotUrl}
                alt="Screenshot"
              />
            )}
            <canvas
              className="canvas-overlay"
              onMouseDown={
                isDrawingMode
                  ? startDrawing
                  : isMeasuringDistanceMode
                  ? startMeasuringDistance
                  : isMeasuringAngleMode
                  ? startMeasuringAngle
                  : isDrawingTextMode
                  ? startDrawText
                  : null
              }
              onMouseUp={
                isDrawingMode
                  ? finishDrawing
                  : isMeasuringDistanceMode
                  ? endMeasuringDistance
                  : isMeasuringAngleMode
                  ? endMeasuringAngle
                  : null
              }
              onMouseMove={isDrawingMode ? draw : null}
              ref={canvasRef}
            />
            <div className="params-container">
              <Select
                options={primaryColors}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <button
                className="small-component"
                onClick={toggleDrawingMode}
                style={isDrawingMode ? { backgroundColor: "lightcyan" } : {}}
              >
                <Image
                  src={IconDrawing}
                  alt="Desenhar"
                  title="Desenhar"
                  className={"icon"}
                />
              </button>
              <button
                className="small-component"
                onClick={toggleMeasuringDistanceMode}
                style={
                  isMeasuringDistanceMode
                    ? { backgroundColor: "lightcyan" }
                    : {}
                }
              >
                <Image
                  src={IconRuler}
                  alt="Distância"
                  title="Distância"
                  className={"icon"}
                />
              </button>
              <button
                className="small-component"
                onClick={toggleMeasuringAngleMode}
                style={
                  isMeasuringAngleMode ? { backgroundColor: "lightcyan" } : {}
                }
              >
                <Image
                  src={IconAngle}
                  alt="Ângulo"
                  title="Ângulo"
                  className={"icon"}
                />
              </button>
              <button
                className="small-component"
                onClick={toggleDrawingTextMode}
                style={
                  isDrawingTextMode ? { backgroundColor: "lightcyan" } : {}
                }
              >
                <Image
                  src={IconText}
                  alt="Texto"
                  title="Texto"
                  className={"icon"}
                />
              </button>
              <button className="small-component">
                <Image
                  src={IconClean}
                  alt="Apagar"
                  title="Apagar"
                  className={"icon"}
                  onClick={clearCanvas}
                />
              </button>
              <button type="button" onClick={saveCanvasAndImage}>
                Salvar Imagem
              </button>
            </div>
          </div>
          {selectedMethod == 1 ? (
            <NIOSHMethodComponent
              isSavedImage={isSavedImage}
              idProject={project_id}
            />
          ) : selectedMethod == 2 ? (
            <OWASMethodComponent />
          ) : selectedMethod == 3 ? (
            <RULAMethodComponent />
          ) : (
            <h1>Selecione um método</h1>
          )}
        </div>
        <Modal
          isOpen={isOpenHelp}
          onClose={() => {
            setIsOpenHelp(!isOpenHelp);
          }}
          onSubmit={() => {
            setIsOpenHelp(!isOpenHelp);
          }}
        >
          {handleHelpClick()}
        </Modal>
      </Modal>
    </ErgonomicAnalysisContainer>
  );
}
