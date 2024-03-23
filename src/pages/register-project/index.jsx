import {
  RegisterProjectContainer,
  FormContainer,
  ContainerButton,
} from "./style";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function RegisterProject() {
  return (
    <RegisterProjectContainer>
      <FormContainer>
        <h1>Novo Projeto</h1>
        <Input type="text" placeholder="Autor" />
        <Input type="text" placeholder="Nome" />
        <Input type="text" placeholder="Descrição" />
        <Input type="text" placeholder="Razão Social" />
        <Input type="text" placeholder="CNPJ" />
        <ContainerButton>
          <Button type="button" text="Voltar" />
          <Button type="button" text="Proximo" />
        </ContainerButton>
      </FormContainer>
    </RegisterProjectContainer>
  );
}
