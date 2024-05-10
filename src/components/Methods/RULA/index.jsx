import Image from "next/image";
import { useState } from "react";
import { Select } from "@/components/Select";

import ArmPosture1 from "@/assets/method/rula/arm-posture-01.png";
import ArmPosture2 from "@/assets/method/rula/arm-posture-02.png";
import ArmPosture3 from "@/assets/method/rula/arm-posture-03.png";
import ArmPosture4 from "@/assets/method/rula/arm-posture-04.png";
import ArmPosture5 from "@/assets/method/rula/arm-posture-05.png";
import ForearmPosture1 from "@/assets/method/rula/forearm-posture-01.png";
import ForearmPosture2 from "@/assets/method/rula/forearm-posture-02.png";
import ForearmPosture3 from "@/assets/method/rula/forearm-posture-03.png";
import ForearmPosture4 from "@/assets/method/rula/forearm-posture-04.png";
import FistPosture1 from "@/assets/method/rula/fist-posture-01.png";
import FistPosture2 from "@/assets/method/rula/fist-posture-02.png";
import FistPosture3 from "@/assets/method/rula/fist-posture-03.png";
import FistPosture4 from "@/assets/method/rula/fist-posture-04.png";
import FistPosture5 from "@/assets/method/rula/fist-posture-05.png";
import FistPosture6 from "@/assets/method/rula/fist-posture-06.png";
import FistPosture7 from "@/assets/method/rula/fist-posture-07.png";
import TrunkPosture1 from "@/assets/method/rula/trunk-posture-01.png";
import TrunkPosture2 from "@/assets/method/rula/trunk-posture-02.png";
import TrunkPosture3 from "@/assets/method/rula/trunk-posture-03.png";
import TrunkPosture4 from "@/assets/method/rula/trunk-posture-04.png";
import TrunkPosture5 from "@/assets/method/rula/trunk-posture-05.png";
import TrunkPosture6 from "@/assets/method/rula/trunk-posture-06.png";

export const RULAMethodComponent = ({ content }) => {
  const [nameAnalysis, setNameAnalysis] = useState("");

  const [armPosture, setArmPosture] = useState(0);
  const [forearmPosture, setForearmPosture] = useState(0);
  const [fistPosture, setFistPosture] = useState(0);
  const [trunkPosture, setTrunkPosture] = useState(0);
  const [gruoupA, setGruoupA] = useState(0);
  const [loadGruoupA, setLoadGruoupA] = useState(0);
  const [gruoupB, setGruoupB] = useState(0);
  const [loadGruoupB, setLoadGruoupB] = useState(0);
  const options = {
    armPosture: [
      { value: 0, label: "Selecione uma opção de Postura dos Braços" },
      { value: 1, label: "+ 20 graus para trás do abdômen" },
      { value: 2, label: "20 graus para trás e para frente do abdômen" },
      { value: 3, label: "Entre 20 e 45 graus para frente do abdômen" },
      { value: 4, label: "Entre 45 e 90 graus para frente do abdômen" },
      { value: 5, label: "+ 90 graus para frente do abdômen" },
    ],
    forearmPosture: [
      { value: 0, label: "Selecione uma opção de Postura dos Antebraços" },
      { value: 1, label: "Entre 0 e 60 graus para frente do braço" },
      { value: 2, label: "Entre 60 e 100 graus para frente do braço" },
      { value: 3, label: "+ 100 graus para frente do braço" },
      { valeu: 4, label: "Com o braço dobrado e para os lados" },
    ],
    fistPosture: [
      { value: 0, label: "Selecione uma opção de Postura dos Punhos" },
      { value: 1, label: "Punho reto (0 graus)" },
      { value: 2, label: "Entre 15 graus para cima e para baixo" },
      { value: 3, label: "+ 15 graus para cima" },
      { value: 4, label: "+ 15 graus para baixo" },
      { value: 5, label: "Punho reto para os lados" },
      { value: 6, label: "Punho reto com polegar para cima" },
      { value: 7, label: "Punho reto com polegar para baixo ou para os lados" },
    ],
    trunkPosture: [
      { value: 0, label: "Selecione uma opção de Postura do Tronco" },
      { value: 1, label: "Tronco reto (0 graus)" },
      { value: 2, label: "Entre 0 e 20 graus inclinado para frente" },
      { value: 3, label: "Entre 20 e 60 graus inclinado para frente" },
      { value: 4, label: "+ 60 graus inclinado para frente" },
      { value: 5, label: "Tronco inclinado para os lados" },
      { value: 6, label: "Tronco torcido para os lados" },
    ],
    gruoupA: [
      { value: 0, label: "Selecione uma opção de Grupo A" },
      { value: 1, label: "Nenhuma das opções" },
      {
        value: 2,
        label:
          "Postura estática mantida por período superior a 1 min ou postura repetitiva, mais que 4 vezes/min",
      },
    ],
    loadGruoupA: [
      { value: 0, label: "Selecione uma opção de Carga do Grupo A" },
      { value: 1, label: "Sem carga ou carga menor que 2 Kg intermitente" },
      { value: 2, label: "Carga entre 2 e 10 Kg intermitente" },
      { value: 3, label: "Carga entre 2 e 10 Kg estática ou repetitiva" },
      { value: 4, label: "Carga superior a 10 Kg intermitente" },
      { value: 5, label: "Carga superior a 10 Kg estática ou repetitiva" },
      { value: 6, label: "Há força bruta ou repentina" },
    ],
    gruoupB: [
      { value: 0, label: "Selecione uma opção de Grupo B" },
      { value: 1, label: "Nenhuma das opções" },
      {
        value: 2,
        label:
          "Postura estática mantida por período superior a 1 min ou postura repetitiva, mais que 4 vezes/min.",
      },
    ],
    loadGruoupB: [
      { value: 0, label: "Selecione uma opção de Carga do Grupo B" },
      { value: 1, label: "Sem carga ou carga menor que 2 Kg intermitente" },
      { value: 2, label: "Carga entre 2 e 10 Kg intermitente" },
      { value: 3, label: "Carga entre 2 e 10 Kg estática ou repetitiva" },
      { value: 4, label: "Carga superior a 10 Kg intermitente" },
      { value: 5, label: "Carga superior a 10 Kg estática ou repetitiva" },
      { value: 6, label: "Há força bruta ou repentina" },
    ],
  };

  if (content === "help") {
    return (
      <>
        <h1>Método RULA</h1>

        <h3>Postura dos Braços</h3>
        <span>+ 20 graus para trás do abdômen</span>
        <Image src={ArmPosture1} alt="Postura dos Braços" />
        <span>Entre 20 graus para trás e para frente do abdômen</span>
        <Image src={ArmPosture2} alt="Postura dos Braços" />
        <span>Entre 20 e 45 graus para frente do abdômen</span>
        <Image src={ArmPosture3} alt="Postura dos Braços" />
        <span>Entre 45 e 90 graus para frente do abdômen</span>
        <Image src={ArmPosture4} alt="Postura dos Braços" />
        <span>+ 90 graus para frente do abdômen</span>
        <Image src={ArmPosture5} alt="Postura dos Braços" />

        <h3>Postura dos Antebraços</h3>
        <span>Entre 0 e 60 graus para frente do braço</span>
        <Image src={ForearmPosture1} alt="Postura dos Antebraços" />
        <span>Entre 60 e 100 graus para frente do braço</span>
        <Image src={ForearmPosture2} alt="Postura dos Antebraços" />
        <span>+ 100 graus para frente do braço</span>
        <Image src={ForearmPosture3} alt="Postura dos Antebraços" />
        <span>Com o braço dobrado e para os lados</span>
        <Image src={ForearmPosture4} alt="Postura dos Antebraços" />

        <h3>Postura dos Punhos</h3>
        <span>Punho reto (0 graus)</span>
        <Image src={FistPosture1} alt="Postura dos Punhos" />
        <span>Entre 15 graus para cima e para baixo</span>
        <Image src={FistPosture2} alt="Postura dos Punhos" />
        <span>+ 15 graus para cima</span>
        <Image src={FistPosture3} alt="Postura dos Punhos" />
        <span>+ 15 graus para baixo</span>
        <Image src={FistPosture5} alt="Postura dos Punhos" />
        <span>Punho reto para os lados</span>
        <Image src={FistPosture4} alt="Postura dos Punhos" />
        <span>Punho reto com polegar para cima</span>
        <Image src={FistPosture6} alt="Postura dos Punhos" />
        <span>Punho reto com polegar para baixo ou para os lados</span>
        <Image src={FistPosture7} alt="Postura dos Punhos" />

        <h3>Postura do Tronco</h3>
        <span>Tronco reto (0 graus)</span>
        <Image src={TrunkPosture1} alt="Postura do Tronco" />
        <span>Entre 0 e 20 graus inclinado para frente</span>
        <Image src={TrunkPosture2} alt="Postura do Tronco" />
        <span>Entre 20 e 60 graus inclinado para frente</span>
        <Image src={TrunkPosture3} alt="Postura do Tronco" />
        <span>+ 60 graus inclinado para frente</span>
        <Image src={TrunkPosture4} alt="Postura do Tronco" />
        <span>Tronco inclinado para os lados</span>
        <Image src={TrunkPosture5} alt="Postura do Tronco" />
        <span>Tronco torcido para os lados</span>
        <Image src={TrunkPosture6} alt="Postura do Tronco" />
        {/* 
        <h3>Grupo A</h3>
        <span>Nenhuma das opções</span>
        <span>
          Postura estática mantida por período superior a 1 min ou postura
          repetitiva, mais que 4 vezes/min
        </span>

        <h3>Carga do Grupo A</h3>
        <span>Sem carga ou carga menor que 2 Kg intermitente</span>
        <span>Carga entre 2 e 10 Kg intermitente</span>
        <span>Carga entre 2 e 10 Kg estática ou repetitiva</span>
        <span>Carga superior a 10 Kg intermitente</span>
        <span>Carga superior a 10 Kg estática ou repetitiva</span>
        <span>Há força bruta ou repentina</span>

        <h3>Grupo B</h3>
        <span>Nenhuma das opções</span>
        <span>
          Postura estática mantida por período superior a 1 min ou postura
          repetitiva, mais que 4 vezes/min.
        </span>

        <h3>Carga do Grupo B</h3>
        <span>Sem carga ou carga menor que 2 Kg intermitente</span>
        <span>Carga entre 2 e 10 Kg intermitente</span>
        <span>Carga entre 2 e 10 Kg estática ou repetitiva</span>
        <span>Carga superior a 10 Kg intermitente</span>
        <span>Carga superior a 10 Kg estática ou repetitiva</span>
        <span>Há força bruta ou repentina</span> */}
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
          options={options.forearmPosture}
          value={forearmPosture}
          onChange={(e) => setForearmPosture(e.target.value)}
        />
        <Select
          options={options.fistPosture}
          value={fistPosture}
          onChange={(e) => setFistPosture(e.target.value)}
        />
        <Select
          options={options.trunkPosture}
          value={trunkPosture}
          onChange={(e) => setTrunkPosture(e.target.value)}
        />
        <Select
          options={options.gruoupA}
          value={gruoupA}
          onChange={(e) => setGruoupA(e.target.value)}
        />
        <Select
          options={options.loadGruoupA}
          value={loadGruoupA}
          onChange={(e) => setLoadGruoupA(e.target.value)}
        />
        <Select
          options={options.gruoupB}
          value={gruoupB}
          onChange={(e) => setGruoupB(e.target.value)}
        />
        <Select
          options={options.loadGruoupB}
          value={loadGruoupB}
          onChange={(e) => setLoadGruoupB(e.target.value)}
        />
        <button>Gerar Resultado</button>
        <button>Salvar Análise</button>
        <input type="text" placeholder="Resultado ..." disabled />
      </div>
    );
  }
};
