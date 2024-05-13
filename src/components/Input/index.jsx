import { InputContainer, InputComponent } from "./style";
import { Error } from "../Error";

export const Input = ({
  type,
  value,
  label,
  placeholder,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <InputContainer>
      {label && <LabelComponent>{label}</LabelComponent>}
      <InputComponent
        type={type}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error && <Error error={error} />}
    </InputContainer>
  );
};
