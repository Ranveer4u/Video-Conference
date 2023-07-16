// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection,getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDUtpj9s7UpJegCoyoY77SofkObReRxJ0",
  authDomain: "video-call-7e7b6.firebaseapp.com",
  projectId: "video-call-7e7b6",
  storageBucket: "video-call-7e7b6.appspot.com",
  messagingSenderId: "844386709447",
  appId: "1:844386709447:web:f5c5819d3148c3e1ceb3e2",
  measurementId: "G-BDJJX7GFEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "user");
export const meetingsRef = collection(firebaseDB, "meetings");