// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Caso use Firestore
import { getDatabase } from "firebase/database"; // Caso use Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBx7degWRAyjKoey5vrsKXDeMD4EXegWcc",
  authDomain: "mundonerd-app.firebaseapp.com",
  projectId: "mundonerd-app",
  storageBucket: "mundonerd-app.appspot.com",
  messagingSenderId: "507296290570",
  appId: "1:507296290570:web:6ad22a11d99055cb124cf3"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporte o Firestore e/ou Realtime Database
const db = getFirestore(app); // Firestore
const rtdb = getDatabase(app); // Realtime Database

export { db, rtdb };
