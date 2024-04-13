// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOzouDARO6j7V2AmOofjG5MGZZ9Vv133E",
  authDomain: "e-commerce-7b6ac.firebaseapp.com",
  projectId: "e-commerce-7b6ac",
  storageBucket: "e-commerce-7b6ac.appspot.com",
  messagingSenderId: "133878801987",
  appId: "1:133878801987:web:dbd31fb5d5f4e3a87bd6f6",
  measurementId: "G-4H44PC8ECY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
