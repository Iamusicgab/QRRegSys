// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvHe01h8-M427h54Bc1nZXcuM-je_2S84",
  authDomain: "org-registration-system.firebaseapp.com",
  projectId: "org-registration-system",
  storageBucket: "org-registration-system.appspot.com",
  messagingSenderId: "23046355694",
  appId: "1:23046355694:web:40b131e432d6a653f291ff",
  measurementId: "G-0PM6CWLS76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
