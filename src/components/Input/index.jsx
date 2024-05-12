import { InputContainer, InputComponent } from "./style";
import { Error } from "../Error";

export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <InputContainer>
      <InputComponent
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error && <Error error={error} />}
    </InputContainer>
  );
};
