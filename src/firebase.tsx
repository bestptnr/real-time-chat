import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR API KEY",
  projectId: "YOUR API KEY",
  storageBucket: "YOUR API KEY",
  messagingSenderId: "YOUR API KEY",
  appId: "YOUR API KEY",
  measurementId: "YOUR API KEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase =app;
export const auth = getAuth(app);
export const db = getFirestore(app);