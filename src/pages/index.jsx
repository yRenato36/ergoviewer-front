import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  AboutContainer,
  ContainerProjects,
  IndexContainer,
  Project,
  SearchContainer,
} from "@/styles/pages/index";

import { useForm } from "@/hooks/useForm";
import { searchProjectsWithFilters } from "@/service/firebase";

import { InputIndex } from "@/components/InputIndex";

import IconErgoViewer from "@/assets/icon-ergoviewer.png";

export default function Index() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const search = useForm("");

  async function handleSearch(event) {
    event.preventDefault();
    const response = await searchProjectsWithFilters("", "");
    setProjects(response);
  }

  return (
    <IndexContainer className="animeLeft">
      <AboutContainer>
        <Image src={IconErgoViewer} alt="Menu" width={325} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          praesentium quibusdam, odio beatae non aliquam asperiores nulla sit
          debitis inventore sequi aut animi veritatis magnam adipisci ipsum
          itaque reiciendis doloribus! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Ipsam corporis magni ut, porro obcaecati quos totam.
          Omnis ex, eos dolorem assumenda deleniti laborum sunt quaerat, quam
          consequuntur porro sint cupiditate.
        </p>
      </AboutContainer>
      <SearchContainer>
        <label>PESQUISE PELO SEU PROJETO</label>
        <InputIndex {...search} onSubmit={handleSearch} />
        <ContainerProjects>
          {projects &&
            projects?.map((p, i) => {
              return (
                <Project
                  key={i}
                  onClick={() => router.push(`/project/${p.id}`)}
                >
                  <p>{p.name}</p>
                  <p>{p.social_reason}</p>
                  <p>{p.cnpj}</p>
                </Project>
              );
            })}
        </ContainerProjects>
      </SearchContainer>
    </IndexContainer>
  );
}
