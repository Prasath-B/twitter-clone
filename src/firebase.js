// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "virtup-4d0e1.firebaseapp.com",
  databaseURL: "https://virtup-4d0e1-default-rtdb.firebaseio.com",
  projectId: "virtup-4d0e1",
  storageBucket: "virtup-4d0e1.appspot.com",
  messagingSenderId: "340292211992",
  appId: "1:340292211992:web:80e8a1fc24814fd46d3a6d",
  measurementId: "G-LYH1QHL9Y6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export {db,storage}
