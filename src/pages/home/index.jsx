import { HomeContainer, FormContainer } from "./styles";

export default function Home() {
  return (
    <HomeContainer>
      <FormContainer>
        <label htmlFor="projeto">Seus Projetos</label>
        <input id="projeto" type="text" />
        <button>Pesquisar</button>
      </FormContainer>
    </HomeContainer>
  );
}
