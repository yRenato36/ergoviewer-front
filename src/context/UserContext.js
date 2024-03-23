import {
  getUserFirebase,
  signInFirebase,
  signOutFirebase,
} from "@/service/firebase";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // async function getUser() {
  //   const user = await getUserFirebase();
  //   setData(user);
  //   setLogin(true);
  // }

  async function userLogin(email, password) {
    const user_credential = await signInFirebase(email, password);
    if (user_credential.user) {
      const user = user_credential.user;
      setData(user);
      setLogin(true);
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

  async function autoLogin() {
    setLoading(true);
    setError(null);
    try {
      const user = await getUserFirebase();
      if (!user) throw new Error("Usuário não encontrado");
      setData(user);
      setLogin(true);
      console.log(user);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <UserContext.Provider value={{ data, login, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
