import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// REEMPLAZA ESTO CON TUS DATOS DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyA58G7qIU1Kh5D1mkguvargc1VnxdGlSbE",
  authDomain: "mi-app-habitos-1f745.firebaseapp.com",
  projectId: "mi-app-habitos-1f745",
  storageBucket: "mi-app-habitos-1f745.firebasestorage.app",
  messagingSenderId: "1007184354693",
  appId: "1:1007184354693:web:ac2dc4c1bcfa107510b8ec"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);