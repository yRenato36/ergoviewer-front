import { InputContainer, InputComponent, SpanError } from "./style";

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
      <SpanError>{error && error}</SpanError>
    </InputContainer>
  );
};
