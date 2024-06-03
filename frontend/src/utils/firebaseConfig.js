import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFdTKbwpYmkGbcBJKLMgXvQQHR8ej6SzY",
  authDomain: "netflix-clone-b9131.firebaseapp.com",
  projectId: "netflix-clone-b9131",
  storageBucket: "netflix-clone-b9131.appspot.com",
  messagingSenderId: "478649950420",
  appId: "1:478649950420:web:42b3c2e6b2432b3bc49b41",
  measurementId: "G-9CHQX25EV4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);