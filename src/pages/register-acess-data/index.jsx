import { useState } from "react";
import {
  RegisterAcessDataContainer,
  FormContainer,
  ContainerButton,
} from "./style";

import { useRouter } from "next/router";

import { useForm } from "@/hooks/useForm";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function RegisterAcessData() {
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const name = useForm();
  const email = useForm();
  const password = useForm();

  function handleClick() {}

  return (
    <RegisterAcessDataContainer>
      <FormContainer>
        <h1>Dados de Acesso</h1>
        <Input type="text" placeholder="Nome" {...name} />
        <Input type="email" placeholder="Email" {...email} />
        <Input type="password" placeholder="Senha" {...password} />
        <Input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <ContainerButton>
          <Button type="button" text="Voltar" />
          <Button type="button" text="Proximo" onClick={handleClick} />
        </ContainerButton>
        <span>{errorConfirmPassword && errorConfirmPassword}</span>
      </FormContainer>
    </RegisterAcessDataContainer>
  );
}
