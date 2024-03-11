import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0gju_9kZe5vbUMBT15yZVvli0i_Adguc",
  authDomain: "ergoviewer-95a5d.firebaseapp.com",
  projectId: "ergoviewer-95a5d",
  storageBucket: "ergoviewer-95a5d.appspot.com",
  messagingSenderId: "403941572765",
  appId: "1:403941572765:web:51b76185e37ec41d259474",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
