import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCmJ057ZvVXwlk9UPOrOwFzVGn9OnMAn0",
  authDomain: "thedevhamim.firebaseapp.com",
  projectId: "thedevhamim",
  storageBucket: "thedevhamim.firebasestorage.app",
  messagingSenderId: "424545791640",
  appId: "1:424545791640:web:5cced39a1acbeec6fceaed",
  measurementId: "G-BWXKJK2TE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
