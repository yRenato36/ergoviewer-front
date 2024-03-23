import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0gju_9kZe5vbUMBT15yZVvli0i_Adguc",
  authDomain: "ergoviewer-95a5d.firebaseapp.com",
  projectId: "ergoviewer-95a5d",
  storageBucket: "ergoviewer-95a5d.appspot.com",
  messagingSenderId: "403941572765",
  appId: "1:403941572765:web:51b76185e37ec41d259474",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const signInFirebase = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    if (error.message.includes("auth/invalid-credential")) {
      return { error: "Nenhum usuário encontrado" };
    } else if (error.message.includes("auth/invalid-email")) {
      return { error: "E-mail inválido" };
    } else if (error.message.includes("auth/missing-email")) {
      return { error: "E-mail inválido" };
    } else {
      return error.message;
    }
  }
};

export const signOutFirebase = async () => {
  return auth.signOut();
};

export const getUserFirebase = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const createUserFirebase = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    await setDoc(doc(db, "users", uid), userData);
    return true;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return false;
  }
};

export const db = getFirestore(firebaseApp);
