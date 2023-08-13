// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
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
const provider = new GoogleAuthProvider();

const loginGoogle = () => {
  signInWithPopup(auth, provider)
    .then(() => {})
    .catch((error) => {
      console.log(error.code);
    });
};

const onAuthChange = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in");
      console.log(user);
    } else {
      console.log("User is signed out");
    }
  });
};

const signOutUser = () => {
  signOut(auth);
};

export { loginGoogle, signOutUser, onAuthChange };
