import { SearchButton, SearchForm, SearchInput } from "./styles";

import Image from "next/image";
import IconSearch from "../../assets/icon-search.svg";

export const InputIndex = () => {
  return (
    <SearchForm action="">
      <SearchInput placeholder="Pesquisar..." />
      <SearchButton type="">
        <Image src={IconSearch} alt="Pesquisar" width={35} height={35} />
      </SearchButton>
    </SearchForm>
  );
};
