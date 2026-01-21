// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdrni9gLS_Z0pHJyvta5jB6ha9ThkGyTg",
  authDomain: "nextjs-portfolio-c84d3.firebaseapp.com",
  projectId: "nextjs-portfolio-c84d3",
  storageBucket: "nextjs-portfolio-c84d3.firebasestorage.app",
  messagingSenderId: "223671927189",
  appId: "1:223671927189:web:cb919ff78e6a7dd0e1f69c",
  measurementId: "G-1M7W48J2F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);