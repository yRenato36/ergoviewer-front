import {
  AuthenticationContainer,
  AuthenticationSubContainer,
  PasswordContainer,
} from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Authentication() {
  return (
    <AuthenticationContainer>
      <AuthenticationSubContainer>
        <h1>Entrar</h1>
        <Input type="email" placeholder="Email" />
        <PasswordContainer>
          <Input type="password" placeholder="Senha" />
          <Button type="button" text="Esqueceu?" />
        </PasswordContainer>
        <Button type="button" text="Entrar" />
        <Button type="button" text="Cadastre-se" />
      </AuthenticationSubContainer>
    </AuthenticationContainer>
  );
}
