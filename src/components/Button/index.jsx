import { ButtonContainer } from "./style";

export const Button = ({ type, text }) => {
  return <ButtonContainer type={type}>{text}</ButtonContainer>;
};
