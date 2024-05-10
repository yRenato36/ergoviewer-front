import { SelectContainer, SelectComponent } from "./style";
import { Error } from "../Error";

export const Select = ({ options, value, onChange, onBlur, error }) => {
  return (
    <SelectContainer>
      <SelectComponent value={value} onBlur={onBlur} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectComponent>
      {error && <Error error={error} />}
    </SelectContainer>
  );
};
