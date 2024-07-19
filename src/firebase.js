import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIpFMI7d_SLnrIgaM1JANW_82aTmnKb54",
  authDomain: "listenup2-e5778.firebaseapp.com",
  projectId: "listenup2-e5778",
  storageBucket: "listenup2-e5778.appspot.com",
  messagingSenderId: "80233121106",
  appId: "1:80233121106:web:43c21fadec45abf687268b",
  measurementId: "G-PP1S1T47PS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firebaseConfig, db, auth, storage, ref, listAll, getDownloadURL };
