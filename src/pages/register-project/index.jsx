import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

import {
  RegisterProjectContainer,
  FormContainer,
  ContainerButton,
} from "../../styles/pages/register-project/style";

import { useForm } from "@/hooks/useForm";
import { UserContext } from "@/context/UserContext";
import { createProjectFirebase } from "@/service/firebase";

import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";

export default function RegisterProject() {
  const router = useRouter();

  const { data, login } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isOpenErro, setIsOpenErro] = useState(false);

  const name = useForm("");
  const description = useForm(false);
  const social_reason = useForm("");
  const cnpj = useForm("cnpj");
  const author = useForm("");
  const access_password = useForm("");

  // async function handleOnBlurCNPJ() {
  // setLoading(true);
  // if (cnpj.validation() && cnpj.value != "00.000.000/0001-00") {
  //   try {
  //     const response = await fetch(
  //       `https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cnpj-basica/v2/basica/${cnpj.value}`
  //     );
  //     if (!response.ok) {
  //       setIsOpenErro(true);
  //       setError("Erro ao fazer a solicitação.");
  //     }
  //   } catch (error) {
  //     setError("Erro ao processar a solicitação: " + error.message);
  //   }
  // }
  // setLoading(false);
  // }

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();

    if (
      author.validation() &&
      name.validation() &&
      description.validation() &&
      social_reason.validation() &&
      cnpj.validation()
    ) {
      if (data) {
        await createProjectFirebase(data.uid, {
          content: "",
          name: name.value,
          description: description.value,
          social_reason: social_reason.value,
          cnpj: cnpj.value,
          author: author.value,
          active: false,
          created_at: format(new Date(), "dd/MM/yyyy"),
        });
        router.push("/projects");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!login) {
      router.push("/auth");
    }
  });

  return (
    <RegisterProjectContainer className="animeLeft">
      <FormContainer onSubmit={onSubmit}>
        <h1>Novo Projeto</h1>
        <Input type="text" placeholder="Nome" {...name} />
        <Textarea type="text" placeholder="Descrição" {...description} />
        <Input type="text" placeholder="Razão Social" {...social_reason} />
        <Input type="text" placeholder="CNPJ (00.000.000/0001-00)" {...cnpj} />
        <Input type="text" placeholder="Autor" {...author} />
        <Input
          type="password"
          placeholder="Senha de Acesso"
          {...access_password}
        />
        <ContainerButton>
          <Button
            type="button"
            text="Voltar"
            onClick={() => router.back()}
            disabled={loading}
          />
          <Button type="submit" text="Proximo" disabled={loading} />
        </ContainerButton>
      </FormContainer>
      <Modal
        isOpen={isOpenErro}
        onSubmit={() => {
          setError(null);
        }}
        onClose={() => {
          setIsOpenErro(!isOpenErro);
        }}
      >
        <h1>Erro ao criar o projeto</h1>
        <p>{error && error}</p>
      </Modal>
    </RegisterProjectContainer>
  );
}
