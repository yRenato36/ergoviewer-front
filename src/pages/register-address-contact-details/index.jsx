import {
  RegisterAddressContactDetailsContainer,
  FormContainer,
  ContainerInput,
  ContainerButton,
} from "./style";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Authentication() {
  return (
    <RegisterAddressContactDetailsContainer>
      <FormContainer>
        <h1>Detalhes de Contato e Endereço</h1>
        <Input type="text" placeholder="Nome Contato" />
        <Input type="email" placeholder="Email Contato" />
        <Input type="text" placeholder="CEP" />
        <ContainerInput>
          <Input type="text" placeholder="Rua" />
          <Input type="text" placeholder="Número" />
          <Input type="text" placeholder="Bairro" />
          <Input type="text" placeholder="Cidade" />
        </ContainerInput>
        <ContainerButton>
          <Button type="button" text="Voltar" />
          <Button type="button" text="Proximo" />
        </ContainerButton>
      </FormContainer>
    </RegisterAddressContactDetailsContainer>
  );
}
