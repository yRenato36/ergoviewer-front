import { TextareaContainer, TextareaComponent } from "./style";
import { Error } from "../Error";

export const Textarea = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <TextareaContainer>
      <TextareaComponent
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error && <Error error={error} />}
    </TextareaContainer>
  );
};
