// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_C8QMa-EgrQB4HBHiSpWVJcKWDqDzo8I",
  authDomain: "moviez-a42eb.firebaseapp.com",
  projectId: "moviez-a42eb",
  storageBucket: "moviez-a42eb.appspot.com",
  messagingSenderId: "187343422873",
  appId: "1:187343422873:web:df09285f971df3538dff08",
  measurementId: "G-3G7WTSK034",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage };
