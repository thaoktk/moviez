import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useCollections = (collect, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let colRef = collection(db, collect);
    const queryOrder = query(colRef, orderBy("createdAt", "desc"));

    const { fieldName, operator, compareValue } = condition;
    if (condition) {
      if (!compareValue || !compareValue.length) {
        setDocuments([]);
        return;
      }
      colRef = query(queryOrder, where(fieldName, operator, compareValue));
    }

    const unSubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(data);
    });

    return () => {
      unSubscribe();
    };
  }, [collect, condition]);

  return documents;
};

export default useCollections;
