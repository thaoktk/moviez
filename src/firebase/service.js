import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";

const addDocument = async (col, data) => {
  const colRef = collection(db, col);
  await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
};

const updateDocument = async (col, idValue, data) => {
  const docRef = doc(db, col, idValue);
  await updateDoc(docRef, {
    ...data,
  });
};

const setDocument = async (col, id, data) => {
  const docRef = doc(db, col, id);
  await setDoc(docRef, { ...data, createdAt: serverTimestamp() });
};

const deleteDocument = async (col, id) => {
  const docRef = doc(db, col, id);
  await deleteDoc(docRef);
};

export { addDocument, setDocument, updateDocument, deleteDocument };
