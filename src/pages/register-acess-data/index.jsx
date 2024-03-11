import {
  RegisterAcessDataContainer,
  FormContainer,
  ContainerButton,
} from "./style";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function RegisterAcessData() {
  return (
    <RegisterAcessDataContainer>
      <FormContainer>
        <h1>Dados de Acesso</h1>
        <Input type="text" placeholder="Nome" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Input type="password" placeholder="Confirme sua senha" />
        <ContainerButton>
          <Button type="button" text="Voltar" />
          <Button type="button" text="Proximo" />
        </ContainerButton>
      </FormContainer>
    </RegisterAcessDataContainer>
  );
}
