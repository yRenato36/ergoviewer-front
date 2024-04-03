import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  RegisterAcessDataContainer,
  FormContainer,
  ContainerButton,
} from "./style";

import { useForm } from "@/hooks/useForm";
import { RegisterContext } from "@/context/RegisterContext";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function RegisterAcessData() {
  const router = useRouter();

  const {
    setDataRegister,
    errorRegister,
    setErrorRegister,
    loadingRegister,
    clearRegister,
  } = useContext(RegisterContext);

  const [confirmPassword, setConfirmPassword] = useState("");

  const name = useForm("");
  const email = useForm("email");
  const password = useForm("password");

  function handleClickBack() {
    clearRegister();
    router.back();
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (confirmPassword !== password.value) {
      setErrorRegister(
        "Confirmação de senha incorreta. Por favor, verifique e tente novamente."
      );
    } else {
      if (name.validation() && email.validation() && password.validation()) {
        setDataRegister({
          name: name.value,
          email: email.value,
          password: password.value,
        });
        router.push("/register-address-contact-details");
      }
    }
  }

  return (
    <RegisterAcessDataContainer className="animeLeft">
      <FormContainer onSubmit={handleSubmit}>
        <h1>Dados de Acesso</h1>
        <Input type="text" placeholder="Nome" {...name} />
        <Input type="email" placeholder="Email" {...email} />
        <Input type="password" placeholder="Senha" {...password} />
        <Input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          error={errorRegister}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <ContainerButton>
          <Button
            type="button"
            text="Voltar"
            disabled={loadingRegister}
            onClick={handleClickBack}
          />
          <Button type="submit" text="Proximo" disabled={loadingRegister} />
        </ContainerButton>
      </FormContainer>
    </RegisterAcessDataContainer>
  );
}
