import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/context/UserContext";
import { createAnalysisFirebase } from "@/service/firebase";

export const NIOSHMethodComponent = ({
  content,
  idAnalysis,
  idProject,
  isSavedImage,
}) => {
  const { data } = useContext(UserContext);

  const [nameAnalysis, setNameAnalysis] = useState("");

  const [horizontalDistance, setHorizontalDistance] = useState("");
  const [verticalDistance, setVerticalDistance] = useState("");
  const [verticalDisplacement, setVerticalDisplacement] = useState("");
  const [torsionAngle, setTorsionAngle] = useState("");
  const [averageFrequency, setAverageFrequency] = useState("");
  const [quality, setQuality] = useState("");
  const [mass, setMass] = useState("");

  const [nioshResult, setNioshResult] = useState("");

  function calcularPLR(H, V, D, A, F, C) {
    return (
      23 *
      (25 / H) *
      (1 - 0.003 / Math.abs(V - 75)) *
      (0.82 + 4.5 / D) *
      (1 - 0.0032 * A) *
      F *
      C
    );
  }

  function calculateNioshResult() {
    if (
      !horizontalDistance ||
      !verticalDistance ||
      !verticalDisplacement ||
      !torsionAngle ||
      !averageFrequency ||
      !quality ||
      !mass
    ) {
      return;
    }

    const H = parseFloat(horizontalDistance);
    const V = parseFloat(verticalDistance);
    const D = parseFloat(verticalDisplacement);
    const A = parseFloat(torsionAngle);
    const F = parseFloat(averageFrequency);
    const C = parseFloat(quality);
    const P = parseFloat(mass);

    const LPR = calcularPLR(H, V, D, A, F, C);

    let color, message;
    if (P < LPR) {
      color = "green";
      message = "Bom, não há necessidade de mudar a operação.";
    } else if (P >= LPR && P < LPR) {
      color = "yellow";
      message = "Alerta, é recomendável considerar mudar a forma de operação.";
    } else {
      color = "red";
      message =
        "Risco para a saúde, é necessário mudar a forma de operação o mais rápido possível.";
    }

    setNioshResult({ LPR, color, message });
  }

  function clearNioshResult() {
    setHorizontalDistance("");
    setVerticalDistance("");
    setVerticalDisplacement("");
    setTorsionAngle("");
    setAverageFrequency("");
    setQuality("");
    setMass("");
    setNioshResult(null);
  }

  async function saveNioshResult() {
    if (
      !nioshResult ||
      !nameAnalysis ||
      !horizontalDistance ||
      !verticalDistance ||
      !verticalDisplacement ||
      !torsionAngle ||
      !averageFrequency ||
      !quality ||
      !mass
    ) {
      return;
    }
    if (!isSavedImage) {
      const confirm = window.confirm("Deseja continuar sem salvar a imagem?");
      if (!confirm) return;
    }
    await createAnalysisFirebase(data.uid, idProject, {
      name_analysis: nameAnalysis,
      horizontal_distance: horizontalDistance,
      vertical_distance: verticalDistance,
      vertical_displacement: verticalDisplacement,
      torsion_angle: torsionAngle,
      average_frequency: averageFrequency,
      quality: quality,
      mass: mass,
      niosh_result: nioshResult,
    });
  }

  useEffect(() => {
    clearNioshResult();
  }, [idAnalysis]);

  if (content === "help") {
    return (
      <>
        <h1>Método NIOSH</h1>
        <span>Nome da Análise</span>
        <p>
          Este é o título que identifica a avaliação ergonômica específica sendo
          realizada. Geralmente, reflete o tipo de atividade sendo analisada,
          como "Levantamento de Caixas" ou "Movimentação de Pacientes".
        </p>
        <span>Distância Horizontal (cm)</span>
        <p>
          Refere-se à distância horizontal percorrida ao levantar ou movimentar
          a carga. Este parâmetro é crucial para avaliar o esforço físico
          envolvido na tarefa e a possibilidade de lesões musculoesqueléticas.
        </p>
        <span>Distância Vertical (cm)</span>
        <p>
          Indica a altura da carga em relação ao ponto de partida. Esta medida é
          importante para determinar a extensão do levantamento e seu impacto na
          postura do trabalhador.
        </p>
        <span>Deslocamento Vertical (cm)</span>
        <p>
          Representa a diferença de altura entre a posição inicial e final da
          carga durante o levantamento. Esse parâmetro influencia diretamente a
          biomecânica do movimento e o risco de lesões.
        </p>
        <span>Ângulo de Torção do Tronco (graus)</span>
        <p>
          Refere-se ao grau de rotação do tronco durante o levantamento.
          Avalia-se o impacto da torção sobre a coluna vertebral e a
          probabilidade de lesões associadas.
        </p>
        <span>Frequência Média de Levantamento</span>
        <p>
          Indica com que frequência a tarefa de levantamento é realizada em um
          determinado período de tempo. Este parâmetro ajuda a determinar a
          carga de trabalho total e a necessidade de pausas ou ajustes
          ergonômicos.
        </p>
        <span>Qualidade da Pega</span>
        <p>
          Avalia a facilidade ou dificuldade de segurar e manusear a carga. Uma
          pega inadequada pode aumentar a demanda física sobre o trabalhador e o
          risco de acidentes.
        </p>
        <span>Massa da Carga</span>
        <p>
          Representa o peso da carga a ser levantada. Este é um dos fatores mais
          importantes na avaliação ergonômica, pois o peso influencia
          diretamente a carga sobre os músculos e articulações do trabalhador.
        </p>
        <span>Resultado... (este campo está desabilitado)</span>
        <p>
          Nesta seção, seria apresentado o resultado da análise, considerando
          todos os parâmetros acima mencionados. O resultado pode incluir
          recomendações para ajustes ergonômicos, treinamento de segurança ou
          redistribuição de tarefas para reduzir o risco de lesões e promover um
          ambiente de trabalho mais saudável.
        </p>

        <span>Resultado... (este campo está desabilitado)</span>
        <p>
          Nesta seção, seria apresentado o resultado da análise, considerando
          todos os parâmetros acima mencionados. O resultado pode incluir
          recomendações para ajustes ergonômicos, treinamento de segurança ou
          redistribuição de tarefas para reduzir o risco de lesões e promover um
          ambiente de trabalho mais saudável.
        </p>

        <span>Resultado... (este campo está desabilitado)</span>
        <p>
          Nesta seção, seria apresentado o resultado da análise, considerando
          todos os parâmetros acima mencionados. O resultado pode incluir
          recomendações para ajustes ergonômicos, treinamento de segurança ou
          redistribuição de tarefas para reduzir o risco de lesões e promover um
          ambiente de trabalho mais saudável.
        </p>
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
        <input
          type="number"
          placeholder="Distância Horizontal (cm)"
          value={horizontalDistance}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) || value === "") {
              setHorizontalDistance(value);
            }
          }}
        />
        <input
          type="number"
          placeholder="Distância Vertical (cm)"
          value={verticalDistance}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) || value === "") {
              setVerticalDistance(value);
            }
          }}
        />
        <input
          type="number"
          placeholder="Deslocamento Vertical (cm)"
          value={verticalDisplacement}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) || value === "") {
              setVerticalDisplacement(value);
            }
          }}
        />
        <input
          type="number"
          placeholder="Angulo de Torção do Tronco (graus)"
          value={torsionAngle}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) || value === "") {
              setTorsionAngle(value);
            }
          }}
        />
        <input
          type="number"
          placeholder="Frequência Média de Levantamento"
          value={averageFrequency}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) || value === "") {
              setAverageFrequency(value);
            }
          }}
        />
        <input
          type="number"
          placeholder="Qualidade da Pega"
          value={quality}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) || value === "") {
              setQuality(value);
            }
          }}
        />
        <input
          type="number"
          placeholder="Massa da Carga"
          value={mass}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value) || value === "") {
              setMass(value);
            }
          }}
        />
        <button onClick={calculateNioshResult}>Gerar Resultado</button>
        <button onClick={saveNioshResult}>Salvar Análise</button>
        <input
          type="text"
          placeholder="Resultado ..."
          value={nioshResult && nioshResult.message}
          style={
            nioshResult && nioshResult.color
              ? {
                  height: "4.0625rem",
                  color: "black",
                  fontWeight: "bold",
                  overflowWrap: "break-word",
                  backgroundColor: nioshResult.color,
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
