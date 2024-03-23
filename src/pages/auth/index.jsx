import { useContext } from "react";
import {
  AuthenticationContainer,
  AuthenticationSubContainer,
  PasswordContainer,
} from "./styles";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { useForm } from "@/hooks/useForm";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function Authentication() {
  const router = useRouter();

  const email = useForm("email");
  const password = useForm("password");

  const { login, userLogin } = useContext(UserContext);

  async function handleAuth(event) {
    event.preventDefault();
    if (email.validation() && password.validation()) {
      const response = await userLogin(email.value, password.value);
      if (response) {
        router.push("/projects");
      }
    }
  }

  return (
    <AuthenticationContainer>
      <AuthenticationSubContainer onSubmit={handleAuth}>
        <h1>Entrar</h1>
        <Input type="email" placeholder="Email" {...email} />
        <PasswordContainer>
          <Input type="password" placeholder="Senha" {...password} />
          <Button type="button" text="Esqueceu?" />
        </PasswordContainer>
        <Button type="submit" text="Entrar" />
        <Button type="button" text="Cadastre-se" />
      </AuthenticationSubContainer>
    </AuthenticationContainer>
  );
}
