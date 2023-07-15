import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbNjM2pvmpVCI0WVZVJEFD1bElaG4fBYM",
  authDomain: "chat-real-time-82dae.firebaseapp.com",
  projectId: "chat-real-time-82dae",
  storageBucket: "chat-real-time-82dae.appspot.com",
  messagingSenderId: "1006456128059",
  appId: "1:1006456128059:web:95e3d895f866b877f7521e",
  measurementId: "G-R1DPB0WYPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase =app;
export const auth = getAuth(app);
export const db = getFirestore(app);