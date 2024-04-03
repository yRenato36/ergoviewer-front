import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getUserFirebase,
  signInFirebase,
  signOutFirebase,
} from "@/service/firebase";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  async function userLogin(email, password) {
    setLoading(true);
    setError(null);
    try {
      const user_credential = await signInFirebase(email, password);
      if (user_credential.user) {
        setData(user_credential.user);
        setLogin(true);
        return true;
      } else {
        throw new Error("E-mail ou senha inválidos");
      }
    } catch (err) {
      setError(err.message);
      userLogout();
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    setLoading(true);
    await signOutFirebase();
    setData(null);
    setLogin(false);
    setLoading(false);
    router.push("/");
  }

  async function verifyLogin() {
    if (!login) router.push("/");
  }

  async function autoLogin() {
    setLoading(true);
    try {
      const user = await getUserFirebase();
      if (!user) throw new Error("Usuário não encontrado");
      setData(user);
      setLogin(true);
    } catch (err) {
      userLogout();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        data,
        error,
        loading,
        login,
        userLogin,
        userLogout,
        verifyLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
