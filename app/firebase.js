// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4QSH4W338JIMKzchwt7PpZ51zozfL8zE",
  authDomain: "cscode-61826.firebaseapp.com",
  projectId: "cscode-61826",
  storageBucket: "cscode-61826.appspot.com",
  messagingSenderId: "420929323867",
  appId: "1:420929323867:web:ff363031b4a1607a09507e",
  measurementId: "G-3EXPYMK4JY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };

