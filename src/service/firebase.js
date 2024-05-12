import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";

import { ref, getStorage, getDownloadURL, uploadBytes } from "firebase/storage";

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
    if (
      error.message.includes("auth/invalid-credential") |
      error.message.includes("auth/invalid-email") |
      error.message.includes("auth/missing-email")
    ) {
      return { error: "E-mail ou senha inválidos" };
    } else {
      return error.message;
    }
  }
};

export const signOutFirebase = async () => {
  return signOut(auth);
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

export const db = getFirestore(firebaseApp);

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

export const getUserDataFromFirestore = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updateUserDataInFirestore = async (uid, userData) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, userData);
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
  }
};

export const createProjectFirebase = async (uid, projectData) => {
  try {
    const projectsCollectionRef = collection(db, "users", uid, "projects");
    const projectDocRef = await addDoc(projectsCollectionRef, projectData);

    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      projects: FieldValue.arrayUnion(projectDocRef),
    });

    return true;
  } catch (error) {
    console.error("Erro ao adicionar projeto ao usuário:", error);
    return false;
  }
};

export const searchProjectsWithFilters = async (razaoSocial, cnpj) => {
  let listProjects = [];
  try {
    const projectsRef = collectionGroup(db, "projects");

    let consulta = projectsRef;

    if (razaoSocial) {
      const razaoSocialQuery = `${razaoSocial}%`;
      consulta = query(
        consulta,
        where("social_reason", ">=", razaoSocialQuery)
      );
    }

    if (cnpj) {
      const cnpjQuery = `${cnpj}%`;
      consulta = query(consulta, where("cnpj", ">=", cnpjQuery));
    }

    const projectsSnapshot = await getDocs(consulta);

    listProjects = listProjects.concat(
      projectsSnapshot.docs.map((project) => {
        return {
          id: project.id,
          ...project.data(),
        };
      })
    );

    return listProjects;
  } catch (error) {
    console.error("Erro ao listar os projects:", error);
    return [];
  }
};

export const listUserProjects = async (uid) => {
  let listProjects = [];
  try {
    const projectsCollectionRef = collection(db, "users", uid, "projects");
    const projectsSnapshot = await getDocs(projectsCollectionRef);

    listProjects = listProjects.concat(
      projectsSnapshot.docs.map((project) => {
        return {
          id: project.id,
          ...project.data(),
        };
      })
    );

    return listProjects;
  } catch (error) {
    console.error("Erro ao listar os projects:", error);
    return [];
  }
};

export const getProjectById = async (uid, projectId) => {
  try {
    const projectDocRef = doc(db, "users", uid, "projects", projectId);
    const projectDocSnapshot = await getDoc(projectDocRef);

    if (projectDocSnapshot.exists()) {
      return {
        id: projectDocSnapshot.id,
        ...projectDocSnapshot.data(),
      };
    } else {
      console.error("Projeto não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return null;
  }
};

export const toggleProjectActiveStatus = async (uid, projectId) => {
  try {
    const projectDocRef = doc(db, "users", uid, "projects", projectId);
    const projectDocSnapshot = await getDoc(projectDocRef);

    if (projectDocSnapshot.exists()) {
      const { active } = projectDocSnapshot.data();
      await updateDoc(projectDocRef, { active: !active });
      return true;
    } else {
      console.error("Projeto não encontrado");
      return false;
    }
  } catch (error) {
    console.error("Erro ao atualizar o status do projeto:", error);
    return false;
  }
};

export const updateProjectFirebase = async (
  uid,
  projectId,
  updatedProjectData
) => {
  try {
    const projectDocRef = doc(db, "users", uid, "projects", projectId);
    await updateDoc(projectDocRef, updatedProjectData);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return false;
  }
};

export const deleteProjectFirebase = async (uid, projectId) => {
  try {
    const projectDocRef = doc(db, "users", uid, "projects", projectId);
    await deleteDoc(projectDocRef);

    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      projects: FieldValue.arrayRemove(projectDocRef),
    });

    return true;
  } catch (error) {
    console.error("Erro ao excluir projeto:", error);
    return false;
  }
};

export const updateProjectContent = async (uid, projectId, newContent) => {
  try {
    const projectDocRef = doc(db, "users", uid, "projects", projectId);

    await updateDoc(projectDocRef, {
      content: newContent,
    });

    return true;
  } catch (error) {
    console.error("Erro ao atualizar conteúdo do projeto:", error);
    return false;
  }
};

export const uploadPdfToStorage = async (projectId, pdfFile) => {
  const storage = getStorage();
  const storageRef = ref(storage, `projects/${projectId}/file.pdf`);
  try {
    await getDownloadURL(storageRef);
    await uploadBytes(storageRef, pdfFile);
    return true;
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      await uploadBytes(storageRef, pdfFile);
      return true;
    } else {
      console.error("Erro ao enviar arquivo PDF:", error);
      return false;
    }
  }
};

export const downloadPdfFromStorage = async (projectId) => {
  const storage = getStorage();
  const storageRef = ref(storage, `projects/${projectId}/file.pdf`);

  try {
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Erro ao obter URL de download do arquivo PDF:", error);
    return null;
  }
};

export const createAnalysisFirebase = async (uid, projectId, analysisData) => {
  try {
    const analysisCollectionRef = collection(
      db,
      "users",
      uid,
      "projects",
      projectId,
      "analyses"
    );
    const analysisDocRef = await addDoc(analysisCollectionRef, analysisData);

    const projectDocRef = doc(db, "users", uid, "projects", projectId);
    await updateDoc(projectDocRef, {
      analyses: FieldValue.arrayUnion(analysisDocRef),
    });

    return true;
  } catch (error) {
    console.error("Erro ao adicionar análise ao projeto:", error);
    return false;
  }
};
