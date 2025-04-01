// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK7irjDHpCBPZa2Nw0C9qXR8LeLzPQT00",
  authDomain: "mediskin-eddbd.firebaseapp.com",
  projectId: "mediskin-eddbd",
  storageBucket: "mediskin-eddbd.firebasestorage.app",
  messagingSenderId: "644648583952",
  appId: "1:644648583952:web:4d5fe18679ca4d6afb5b95",
  measurementId: "G-5SM0P4X7EV"
};

// Initialize Firebase

initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
