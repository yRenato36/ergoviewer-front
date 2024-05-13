import { useContext } from "react";
import { useRouter } from "next/router";

import {
  AuthenticationContainer,
  AuthenticationSubContainer,
  PasswordContainer,
} from "../../styles/pages/auth/styles";

import { useForm } from "@/hooks/useForm";
import { UserContext } from "@/context/UserContext";

import { Input } from "@/components/Input";
import { Error } from "@/components/Error";
import { Button } from "@/components/Button";

export default function Authentication() {
  const router = useRouter();

  const email = useForm("email");
  const password = useForm("password");

  const { userLogin, error, loading } = useContext(UserContext);

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
    <AuthenticationContainer className="animeLeft">
      <AuthenticationSubContainer onSubmit={handleAuth}>
        <h1>Entrar</h1>
        <Input type="email" placeholder="Email" {...email} />
        <PasswordContainer>
          <Input type="password" placeholder="Senha" {...password} />
          <Button type="button" text="Esqueceu?" />
        </PasswordContainer>
        <Button type="submit" text="Entrar" disabled={loading} />
        <Button
          type="button"
          text="Cadastre-se"
          disabled={loading}
          onClick={() => router.push("/register-acess-data")}
        />
        {error && <Error error={error} />}
      </AuthenticationSubContainer>
    </AuthenticationContainer>
  );
}
