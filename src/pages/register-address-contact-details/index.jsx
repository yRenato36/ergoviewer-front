import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import {
  RegisterAddressContactDetailsContainer,
  FormContainer,
  ContainerInput,
  ContainerButton,
} from "../../styles/pages/register-address-contact-details/style";

import { useForm } from "@/hooks/useForm";
import { createUserFirebase } from "@/service/firebase";
import { RegisterContext } from "@/context/RegisterContext";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Authentication() {
  const router = useRouter();

  const {
    dataRegister,
    setDataRegister,
    errorRegister,
    setErrorRegister,
    loadingRegister,
    setLoadingRegister,
    clearRegister,
  } = useContext(RegisterContext);

  const name_contact = useForm("");
  const email_contact = useForm("email");
  const cep = useForm("cep");
  const street = useForm("");
  const number = useForm("");
  const neighborhood = useForm("");
  const city = useForm("");
  const admin_password = useForm("number");

  async function handleOnBlurCep() {
    setLoadingRegister(true);
    if (cep.validation()) {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.value}/json/`
      );
      if (response.status === 200) {
        const data = await response.json();
        street.setValue(data.logradouro);
        neighborhood.setValue(data.bairro);
        city.setValue(data.localidade);
      }
    }
    setLoadingRegister(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      name_contact.validation() &&
      email_contact.validation() &&
      cep.validation() &&
      street.validation() &&
      number.validation() &&
      neighborhood.validation() &&
      city.validation() &&
      admin_password.validation()
    ) {
      await createUserFirebase(dataRegister.email, dataRegister.password, {
        name: dataRegister.name,
        name_contact: name_contact.value,
        email_contact: email_contact.value,
        cep: cep.value,
        street: street.value,
        number: number.value,
        neighborhood: neighborhood.value,
        city: city.value,
        admin_password: admin_password.value,
      });
      router.push("/auth");
    }
  }

  function handleClickBack() {
    clearRegister();
    router.push("/register-acess-data");
  }

  useEffect(() => {
    if (!dataRegister?.name | !dataRegister?.email | !dataRegister?.password) {
      router.push("/register-acess-data");
    }
  }, []);

  return (
    <RegisterAddressContactDetailsContainer className="animeLeft">
      <FormContainer onSubmit={handleSubmit}>
        <h1>Detalhes de Contato e Endereço</h1>
        <Input type="text" placeholder="Nome Contato" {...name_contact} />
        <Input type="email" placeholder="Email Contato" {...email_contact} />
        <Input type="password" placeholder="Senha Admin" {...admin_password} />
        <Input
          type="text"
          placeholder="CEP (apenas números)"
          {...cep}
          onBlur={handleOnBlurCep}
        />
        <ContainerInput>
          <Input type="text" placeholder="Número" {...number} />
          <Input type="text" placeholder="Rua" {...street} />
          <Input type="text" placeholder="Bairro" {...neighborhood} />
          <Input type="text" placeholder="Cidade" {...city} />
        </ContainerInput>
        <ContainerButton>
          <Button
            type="button"
            text="Voltar"
            disabled={loadingRegister}
            onClick={handleClickBack}
          />
          <Button type="submit" text="Enviar" disabled={loadingRegister} />
        </ContainerButton>
      </FormContainer>
    </RegisterAddressContactDetailsContainer>
  );
}
