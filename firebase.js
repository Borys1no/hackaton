// Importa las funciones necesarias de los SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3D72Ty30HfcrLtuPxHDghQDoQ30OJAmI",
  authDomain: "hackaton-2cae6.firebaseapp.com",
  projectId: "hackaton-2cae6",
  storageBucket: "hackaton-2cae6.appspot.com",
  messagingSenderId: "988457717083",
  appId: "1:988457717083:web:334d7db5445cd12dec5e7e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

// Define y exporta la función para crear un usuario con email y contraseña
export const doCreateUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export default app;
