// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCAK1K7sMpqTZWYZbx16Zw4vO6wYdYqhQ",
  authDomain: "listenup-b1bd1.firebaseapp.com",
  projectId: "listenup-b1bd1",
  storageBucket: "listenup-b1bd1.appspot.com",
  messagingSenderId: "746981457916",
  appId: "1:746981457916:web:b1baa41e8f5ba4596e3c79",
  measurementId: "G-D3VBMVJR7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
