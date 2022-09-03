import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

const addDocument = async (col, data) => {
  const colRef = collection(db, col);
  await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
};

const setDocument = async (col, id, data) => {
  const docRef = doc(db, col, id);
  await setDoc(docRef, { ...data, createdAt: serverTimestamp() });
};

export { addDocument, setDocument };
