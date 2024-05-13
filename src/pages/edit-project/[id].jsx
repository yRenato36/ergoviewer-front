import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  ContainerButton,
  FormContainer,
  ProfileContainer,
  ProfileSubContainer,
} from "../../styles/pages/edit-project/style";

import { getProjectById, updateProjectFirebase } from "@/service/firebase";

import { useForm } from "@/hooks/useForm";
import { UserContext } from "@/context/UserContext";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";

export default function Profile() {
  const router = useRouter();
  const { id: project_id } = router.query;

  const [loading, setLoading] = useState(false);

  const [projectData, setProjectData] = useState(null);

  const { data, login } = useContext(UserContext);

  const name = useForm("");
  const description = useForm("");
  const social_reason = useForm("");
  const cnpj = useForm("cnpj");
  const author = useForm("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (
      name.validation() &&
      description.validation() &&
      social_reason.validation() &&
      cnpj.validation() &&
      author.validation()
    ) {
      const changed = await updateProjectFirebase(data.uid, project_id, {
        name: name.value,
        description: description.value,
        social_reason: social_reason.value,
        cnpj: cnpj.value,
        author: author.value,
      });

      if (changed) fetchDataProject();
    }
    setLoading(false);
  }

  async function fetchDataProject() {
    setLoading(true);
    if (data) {
      const projectData = await getProjectById(data.uid, project_id);
      if (projectData) {
        setProjectData(projectData);
      } else {
        router.push("/projects");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!login) {
      router.push("/auth");
    } else if (!project_id) {
      router.push("/projects");
    }
    fetchDataProject();
  }, [data]);

  useEffect(() => {
    if (projectData) {
      setLoading(true);
      name.setValue(projectData.name);
      description.setValue(projectData.description);
      social_reason.setValue(projectData.social_reason);
      cnpj.setValue(projectData.cnpj);
      author.setValue(projectData.author);
      setLoading(false);
    }
  }, [projectData]);

  return (
    <ProfileContainer className="animeLeft">
      <FormContainer onSubmit={handleSubmit}>
        <h1>Editar Informações do Projeto</h1>
        <ProfileSubContainer>
          <lable>Nome</lable>
          <Input type="text" {...name} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Descrição</lable>
          <Textarea type="text" {...description} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Razão Social</lable>
          <Input type="text" {...social_reason} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>CNPJ</lable>
          <Input type="text" {...cnpj} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Autor</lable>
          <Input type="text" {...author} />
        </ProfileSubContainer>
        <ContainerButton>
          <Button
            type="button"
            text="Voltar"
            disabled={loading}
            onClick={() => {
              router.back();
            }}
          />
          <Button type="submit" disabled={loading} text="Atualizar" />
        </ContainerButton>
      </FormContainer>
    </ProfileContainer>
  );
}
