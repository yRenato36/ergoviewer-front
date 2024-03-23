import { useState } from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Por favor, insira um email válido.",
  },
  password: {
    regex: /^.{6,}$/,
    message: "A senha deve conter pelo menos 6 caracteres",
  },
};

export const useForm = (type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  function validation(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor.");
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validation(target.value);
    setValue(target.value);
  }

  return {
    error,
    value,
    onChange,
    validation: () => validation(value),
    onBlur: () => validation(value),
  };
};
