import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useCollections(collection, condition = null) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let colRef = collection(db, collection);
    const queryOrder = query(colRef, orderBy("createdAt"));

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
  }, [collection, condition]);

  return documents;
}

export default useCollections;
