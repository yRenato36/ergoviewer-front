import { useState } from "react";
import Image from "next/image";
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

export const OWASMethodComponent = ({ content }) => {
  const [nameAnalysis, setNameAnalysis] = useState("");

  const [armPosture, setArmPosture] = useState(0);
  const [backPosture, setBackPosture] = useState(0);
  const [legPosture, setLegPosture] = useState(0);
  const [highLoad, setHighLoad] = useState(0);

  const options = {
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
        <input
          type="text"
          placeholder="Nome da Análise"
          value={nameAnalysis}
          onChange={(e) => setNameAnalysis(e.target.value)}
        />
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
        <button>Gerar Resultado</button>
        <button>Salvar Análise</button>
        <input type="text" placeholder="Resultado ..." disabled />
      </div>
    );
  }
};
