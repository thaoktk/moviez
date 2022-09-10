import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";

function useFireStorage(file) {
  const [imgFromFireStorage, setImgFromFireStorage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressPercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgFromFireStorage(downloadURL);
          });
        }
      );
    }
  }, [file]);

  return { imgFromFireStorage, progressPercent, setProgressPercent };
}

export default useFireStorage;
