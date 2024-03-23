import { ButtonContainer } from "./style";

export const Button = ({ type, text, ...props }) => {
  return (
    <ButtonContainer {...props} type={type}>
      {text}
    </ButtonContainer>
  );
};
