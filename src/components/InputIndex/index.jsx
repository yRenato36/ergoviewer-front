import { SearchButton, SearchForm, SearchInput } from "./styles";

import Image from "next/image";
import IconSearch from "../../assets/icon-search.svg";

export const InputIndex = ({ type, value, onBlur, onChange, onSubmit }) => {
  return (
    <SearchForm onSubmit={onSubmit}>
      <SearchInput
        placeholder="Pesquisar..."
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <SearchButton type="submit">
        <Image src={IconSearch} alt="Pesquisar" width={35} height={35} />
      </SearchButton>
    </SearchForm>
  );
};
