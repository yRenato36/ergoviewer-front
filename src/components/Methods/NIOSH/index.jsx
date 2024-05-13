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
  //Nome da Analise
  const [nameAnalysis, setNameAnalysis] = useState("");
  //Distancia Horizontal
  const [hDistance, setHDistance] = useState(0);
  //Distancia Vertical
  const [vDistance, setVDistance] = useState(0);
  //Deslocamento Vertical
  const [vDisplacement, setVDisplacement] = useState(0);
  //Angulo de Torção do Tronco
  const [tAngle, setTAngle] = useState(0);
  //Frequencia Média de Levantamento
  const [aFrequency, setAFrequency] = useState(0);
  //Qualidade da Pega
  const [quality, setQuality] = useState(0);
  //Massa da Carga
  const [mass, setMass] = useState(0);
  //Resultado do NIOSH
  const [nioshResult, setNioshResult] = useState();

  const result = nioshResult || { message: "", color: "" };

  function clearNioshResult() {
    setHDistance("");
    setVDistance("");
    setVDisplacement("");
    setTAngle("");
    setAFrequency("");
    setQuality("");
    setMass("");
    setNioshResult(null);
  }

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
      !hDistance ||
      !vDistance ||
      !vDisplacement ||
      !tAngle ||
      !aFrequency ||
      !quality
    ) {
      return;
    }

    const H = parseFloat(hDistance);
    const V = parseFloat(vDistance);
    const D = parseFloat(vDisplacement);
    const A = parseFloat(tAngle);
    const F = parseFloat(aFrequency);
    const C = parseFloat(quality);
    const P = parseFloat(mass);

    const LPR = calcularPLR(H, V, D, A, F, C);

    let color, message;
    const threshold = 0.05 * LPR;

    if (P < LPR - threshold || P > LPR + threshold) {
      if (P < LPR) {
        color = "green";
        message = "Não são necessárias medidas corretivas.";
      } else {
        color = "red";
        message = "São necessárias correções tão logo quanto possível.";
      }
    } else {
      color = "yellow";
      message = "São necessárias correções em um futuro próximo.";
    }

    setNioshResult({ score: LPR, color, message });
  }

  async function saveNioshResult() {
    if (
      !nioshResult ||
      !nameAnalysis ||
      !hDistance ||
      !vDistance ||
      !vDisplacement ||
      !tAngle ||
      !aFrequency ||
      !quality ||
      !mass
    )
      return;

    if (!isSavedImage) {
      const confirm = window.confirm("Deseja continuar sem salvar a imagem?");
      if (!confirm) return;
    }

    await createAnalysisFirebase(data.uid, idProject, {
      method: "NIOSH",
      name_analysis: nameAnalysis,
      result: nioshResult,
      h_distance: hDistance,
      v_distance: vDistance,
      v_displacement: vDisplacement,
      t_angle: tAngle,
      a_frequency: aFrequency,
      quality: quality,
      mass: mass,
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
          Refere-se à distância h percorrida ao levantar ou movimentar a carga.
          Este parâmetro é crucial para avaliar o esforço físico envolvido na
          tarefa e a possibilidade de lesões musculoesqueléticas.
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
        <div className="input-with-label">
          <label htmlFor="name-analysis">Nome da Análise</label>
          <input
            id="name-analysis"
            type="text"
            value={nameAnalysis}
            onChange={(e) => setNameAnalysis(e.target.value)}
          />
        </div>
        <div className="input-with-label">
          <label htmlFor="distance-horizontal">Distância Horizontal (cm)</label>
          <input
            id="distance-horizontal"
            type="number"
            value={hDistance}
            onChange={(e) => setHDistance(e.target.value)}
          />
        </div>
        <div className="input-with-label">
          <label htmlFor="distance-vertical">Distância Vertical (cm)</label>
          <input
            id="distance-vertical"
            type="number"
            value={vDistance}
            onChange={(e) => setVDistance(e.target.value)}
          />
        </div>
        <div className="input-with-label">
          <label htmlFor="displacement-vertical">
            Deslocamento Vertical (cm)
          </label>
          <input
            id="displacement-vertical"
            type="number"
            value={vDisplacement}
            onChange={(e) => setVDisplacement(e.target.value)}
          />
        </div>
        <div className="input-with-label">
          <label htmlFor="torso-angle">
            Angulo de Torção do Tronco (graus)
          </label>
          <input
            id="torso-angle"
            type="number"
            value={tAngle}
            onChange={(e) => setTAngle(e.target.value)}
          />
        </div>
        <div className="input-with-label">
          <label htmlFor="average-frequency">
            Frequência Média de Levantamento
          </label>
          <input
            id="average-frequency"
            type="number"
            value={aFrequency}
            onChange={(e) => setAFrequency(e.target.value)}
          />
        </div>
        <div className="input-with-label">
          <label htmlFor="quality">Qualidade da Pega</label>
          <input
            id="quality"
            type="number"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          />
        </div>
        <div className="input-with-label">
          <label htmlFor="mass">Massa da Carga</label>
          <input
            id="mass"
            type="number"
            value={mass}
            onChange={(e) => setMass(e.target.value)}
          />
        </div>
        <button
          onClick={calculateNioshResult}
          disabled={
            !nameAnalysis ||
            !hDistance ||
            !vDistance ||
            !vDisplacement ||
            !tAngle ||
            !aFrequency ||
            !quality ||
            !mass
              ? true
              : false
          }
        >
          Gerar Resultado
        </button>
        <button onClick={saveNioshResult}>Salvar Análise</button>
        <textarea
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
