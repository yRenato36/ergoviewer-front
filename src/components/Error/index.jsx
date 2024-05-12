import { ErrorSpan } from "./style";

export const Error = ({ error }) => {
  if (!error) return null;
  return <ErrorSpan>{error}</ErrorSpan>;
};
