import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useCollect(collection, id) {
  const [document, setDocument] = useState({});

  useEffect(() => {
    const docRef = doc(db, collection, id);
    const unSubscribe = onSnapshot(docRef, (doc) => {
      setDocument({
        ...doc.data(),
        id: doc.id,
      });
    });

    return () => unSubscribe();
  }, [collection, id]);

  return document;
}

export default useCollect;
