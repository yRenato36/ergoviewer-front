import {
  AboutContainer,
  IndexContainer,
  SearchContainer,
} from "@/styles/pages/index";

import { InputIndex } from "@/components/InputIndex";

export default function Index() {
  return (
    <IndexContainer>
      <AboutContainer>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          praesentium quibusdam, odio beatae non aliquam asperiores nulla sit
          debitis inventore sequi aut animi veritatis magnam adipisci ipsum
          itaque reiciendis doloribus! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Ipsam corporis magni ut, porro obcaecati quos totam.
          Omnis ex, eos dolorem assumenda deleniti laborum sunt quaerat, quam
          consequuntur porro sint cupiditate.
        </p>
      </AboutContainer>
      <SearchContainer>
        <label>PESQUISE PELO SEU PROJETO</label>
        <InputIndex />
      </SearchContainer>
    </IndexContainer>
  );
}
