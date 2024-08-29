import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVx3VnQnoz77j-UOowypMvWtMACqzfsFE",
  authDomain: "mel-hotel.firebaseapp.com",
  projectId: "mel-hotel",
  storageBucket: "mel-hotel.appspot.com",
  messagingSenderId: "888770094636",
  appId: "1:888770094636:web:147ec6a7041a63b0e5d389",
  measurementId: "G-8DGC55DXEX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      console.log(error.code);
      return Promise.reject(error.code);
    });
};

export const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      return Promise.reject(error.code);
    });
};

export const logoutUser = async () => {
  auth.signOut();
};
onAuthStateChanged(auth, (user) => {
  console.log(user?.email);
});
