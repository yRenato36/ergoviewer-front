import {
  InputFileContainer,
  InputFileComponent,
  InputFileLabel,
} from "./style";
import { Error } from "../Error";

export const InputFile = ({ onChange, onBlur, error, accept }) => {
  return (
    <InputFileContainer>
      <InputFileLabel>
        Selecione um arquivo
        <InputFileComponent
          type="file"
          accept={accept}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.files[0])}
        />
      </InputFileLabel>
      {error && <Error error={error} />}
    </InputFileContainer>
  );
};
