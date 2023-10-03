import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: "moviewebreact.firebaseapp.com",
  projectId: "moviewebreact",
  storageBucket: "moviewebreact.appspot.com",
  messagingSenderId: "700373242928",
  appId: "1:700373242928:web:af96ddcad551d8110349f5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
