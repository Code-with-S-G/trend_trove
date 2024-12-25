// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoU-tnBFdEIMRtMoti3BlcmF-ZncsQsi0",
  authDomain: "trendtrove-5ffdb.firebaseapp.com",
  projectId: "trendtrove-5ffdb",
  storageBucket: "trendtrove-5ffdb.firebasestorage.app",
  messagingSenderId: "1084779756074",
  appId: "1:1084779756074:web:1705f39cbc9e03f78ca153"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };