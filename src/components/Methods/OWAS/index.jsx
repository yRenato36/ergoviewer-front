import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { UserContext } from "@/context/UserContext";
import { createAnalysisFirebase } from "@/service/firebase";

import { Select } from "@/components/Select";

import ArmPosture1 from "@/assets/method/owas/arm-posture-01.png";
import ArmPosture2 from "@/assets/method/owas/arm-posture-02.png";
import ArmPosture3 from "@/assets/method/owas/arm-posture-03.png";
import BackPosture1 from "@/assets/method/owas/back-posture-01.png";
import BackPosture2 from "@/assets/method/owas/back-posture-02.png";
import BackPosture3 from "@/assets/method/owas/back-posture-03.png";
import BackPosture4 from "@/assets/method/owas/back-posture-04.png";
import LegPosture1 from "@/assets/method/owas/leg-posture-01.png";
import LegPosture2 from "@/assets/method/owas/leg-posture-02.png";
import LegPosture3 from "@/assets/method/owas/leg-posture-03.png";
import LegPosture4 from "@/assets/method/owas/leg-posture-04.png";
import LegPosture5 from "@/assets/method/owas/leg-posture-05.png";
import LegPosture6 from "@/assets/method/owas/leg-posture-06.png";
import LegPosture7 from "@/assets/method/owas/leg-posture-07.png";
import HighLoad1 from "@/assets/method/owas/high-load-01.png";
import HighLoad2 from "@/assets/method/owas/high-load-02.png";
import HighLoad3 from "@/assets/method/owas/high-load-03.png";

export const options = {
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

export const OWASMethodComponent = ({
  content,
  idAnalysis,
  idProject,
  isSavedImage,
}) => {
  const { data } = useContext(UserContext);
  //Nome da Analise
  const [nameAnalysis, setNameAnalysis] = useState("");
  //Postura dos Braços
  const [armPosture, setArmPosture] = useState(0);
  //Postura das Costas
  const [backPosture, setBackPosture] = useState(0);
  //Postura das Pernas
  const [legPosture, setLegPosture] = useState(0);
  //Carga Alta
  const [highLoad, setHighLoad] = useState(0);
  //Resultado do OWAS
  const [OWASResult, setOWASResult] = useState();

  const result = OWASResult || { message: "", color: "" };

  function clearOWASResult() {
    setArmPosture(0);
    setBackPosture(0);
    setLegPosture(0);
    setHighLoad(0);
    setOWASResult();
  }

  function calculateOWASResult() {
    if (!armPosture || !backPosture || !legPosture || !highLoad) return;

    const armPostureValue = parseInt(armPosture);
    const backPostureValue = parseInt(backPosture);
    const legPostureValue = parseInt(legPosture);
    const highLoadValue = parseInt(highLoad);

    const owasTable = [
      [1, 1, 2, 2],
      [1, 1, 2, 3],
      [1, 2, 3, 3],
      [2, 2, 3, 3],
      [2, 3, 4, 4],
      [2, 3, 4, 4],
      [3, 4, 5, 5],
      [4, 5, 5, 5],
    ];

    const armIndex = armPostureValue - 1;
    const backIndex = backPostureValue - 1;
    const legIndex = legPostureValue - 1;
    const loadIndex = highLoadValue - 1;

    if (
      armIndex < 0 ||
      armIndex >= owasTable.length ||
      backIndex < 0 ||
      backIndex >= owasTable[0].length ||
      legIndex < 0 ||
      legIndex >= owasTable[0].length ||
      loadIndex < 0 ||
      loadIndex >= owasTable[0].length
    ) {
      return;
    }

    const owasScore =
      owasTable[armIndex][loadIndex] +
      owasTable[backIndex][loadIndex] +
      owasTable[legIndex][loadIndex];

    let result = "";
    switch (owasScore) {
      case 1:
        result = {
          owasScore,
          message: "Não são necessárias medidas corretivas.",
          color: "green",
        };
        break;
      case 2:
        result = {
          owasScore,
          message: "São necessárias correções em um futuro próximo.",
          color: "yellow",
        };
        break;
      case 3:
        result = {
          owasScore,
          message: "São necessárias correções tão logo quanto possível.",
          color: "orange",
        };
        break;
      case 4:
        result = {
          owasScore,
          message: "São necessárias correções imediatamente.",
          color: "red",
        };
        break;
      default:
        result = "Resultado não definido.";
    }

    setOWASResult(result);
  }

  async function saveOWASResult() {
    if (
      !OWASResult ||
      !nameAnalysis ||
      !armPosture ||
      !backPosture ||
      !legPosture ||
      !highLoad
    )
      return;

    if (!isSavedImage) {
      const confirm = window.confirm("Deseja continuar sem salvar a imagem?");
      if (!confirm) return;
    }

    await createAnalysisFirebase(data.uid, idProject, {
      method: "OWAS",
      name_analysis: nameAnalysis,
      result: result,
      arm_posture: armPosture,
      back_posture: backPosture,
      leg_posture: legPosture,
      high_load: highLoad,
    });
  }

  useEffect(() => {
    clearOWASResult();
  }, [idAnalysis]);

  if (content === "help") {
    return (
      <>
        <h1>Método OWAS</h1>

        <h3>Postura dos Braços</h3>
        <span>Os dois braços abaixo dos ombros</span>
        <Image src={ArmPosture1} alt="Postura dos Braços" />
        <span>Um braço no nível ou acima dos ombros</span>
        <Image src={ArmPosture2} alt="Postura dos Braços" />
        <span>Ambos os braços no nível ou acima dos ombros</span>
        <Image src={ArmPosture3} alt="Postura dos Braços" />

        <h3>Postura das Costas</h3>
        <span>Postura ereta</span>
        <Image src={BackPosture1} alt="Postura das Costas" />
        <span>Postura inclinada</span>
        <Image src={BackPosture2} alt="Postura das Costas" />
        <span>Postura ereta e torcida</span>
        <Image src={BackPosture3} alt="Postura das Costas" />
        <span>Postura inclinada e torcida</span>
        <Image src={BackPosture4} alt="Postura das Costas" />

        <h3>Postura das Pernas</h3>
        <span>Sentado</span>
        <Image src={LegPosture1} alt="Postura das Pernas" />
        <span>De-pe com ambas as pernas esticadas</span>
        <Image src={LegPosture2} alt="Postura das Pernas" />
        <span>De-pe com uma das pernas esticada</span>
        <Image src={LegPosture3} alt="Postura das Pernas" />
        <span>De-pe com ambos os joelhos dobrados</span>
        <Image src={LegPosture4} alt="Postura das Pernas" />
        <span>De-pe com um dos joelhos dobrados</span>
        <Image src={LegPosture5} alt="Postura das Pernas" />
        <span>Ajoelhado com ambos os joelhos</span>
        <Image src={LegPosture6} alt="Postura das Pernas" />
        <span>Andando ou se movendo</span>
        <Image src={LegPosture7} alt="Postura das Pernas" />

        <h3>Nível de Carga</h3>
        <span>Menor que 10kg</span>
        <Image src={HighLoad1} alt="Nível de Carga" />
        <span>Entre 10kg e 20kg</span>
        <Image src={HighLoad2} alt="Nível de Carga" />
        <span>Maior que 20kg</span>
        <Image src={HighLoad3} alt="Nível de Carga" />
      </>
    );
  } else {
    return (
      <div className="input-container">
        <div className="input-with-label">
          <label htmlFor="name-analysis">Nome da Análise</label>
          <input
            id="name-analysis"
            type="text"
            value={nameAnalysis}
            onChange={(e) => setNameAnalysis(e.target.value)}
          />
        </div>
        <Select
          options={options.armPosture}
          value={armPosture}
          onChange={(e) => setArmPosture(e.target.value)}
        />
        <Select
          options={options.backPosture}
          value={backPosture}
          onChange={(e) => setBackPosture(e.target.value)}
        />
        <Select
          options={options.legPosture}
          value={legPosture}
          onChange={(e) => setLegPosture(e.target.value)}
        />
        <Select
          options={options.highLoad}
          value={highLoad}
          onChange={(e) => setHighLoad(e.target.value)}
        />
        <button
          onClick={calculateOWASResult}
          disabled={
            !nameAnalysis ||
            !armPosture ||
            !backPosture ||
            !legPosture ||
            !highLoad
              ? true
              : false
          }
        >
          Gerar Resultado
        </button>
        <button onClick={saveOWASResult}>Salvar Análise</button>
        <input
          type="text"
          placeholder="Resultado ..."
          value={result.message}
          style={
            result.color
              ? {
                  height: "4.0625rem",
                  color: "black",
                  fontWeight: "bold",
                  overflowWrap: "break-word",
                  backgroundColor: result.color,
                  resize: "none",
                }
              : {}
          }
          disabled
        />
      </div>
    );
  }
};
