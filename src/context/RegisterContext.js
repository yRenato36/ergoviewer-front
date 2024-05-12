import { createContext, useState } from "react";

export const RegisterContext = createContext();

export const RegisterStorage = ({ children }) => {
  const [dataRegister, setDataRegister] = useState(null);
  const [errorRegister, setErrorRegister] = useState(null);
  const [loadingRegister, setLoadingRegister] = useState(false);

  function clearRegister() {
    setDataRegister(null);
    setErrorRegister(null);
    setLoadingRegister(false);
  }

  return (
    <RegisterContext.Provider
      value={{
        clearRegister,
        dataRegister,
        setDataRegister,
        errorRegister,
        setErrorRegister,
        loadingRegister,
        setLoadingRegister,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
