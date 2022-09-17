import { Avatar, useDisclosure } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { v4 } from "uuid";
import { storage } from "../../firebase/config";
import { updateDocument } from "../../firebase/service";
import useToastify from "../../hooks/useToastify";
import useAuthStore from "../../store/auth";

function SettingProfile() {
  const { currentUser, setCurrentUser } = useAuthStore();
  const [usernameChange, setUsernameChange] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useToastify();
  // const user = auth.currentUser;
  // const credential = EmailAuthProvider.credential(user.email, password);

  const handleChangeUsername = (e) => {
    e.preventDefault();

    if (usernameChange.length > 0) {
      updateDocument("users", currentUser.uid, {
        displayName: usernameChange,
      });

      setCurrentUser({ ...currentUser, displayName: usernameChange });

      setUsernameChange("");

      showToast({
        title: "Successfully.",
        description: "Change username successfully.",
        status: "success",
      });
    } 
  };

  const handleChangePhoto = (e) => {
    e.preventDefault();

    if (!e.target.files[0]) return;
    const storageRef = ref(storage, `images/${e.target.files[0].name + v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateDocument("users", currentUser.uid, {
          photoURL: downloadURL,
        });

        setCurrentUser({ ...currentUser, photoURL: downloadURL });
        
        showToast({
          title: "Successfully.",
          description: "Change avatar successfully.",
          status: "success",
        });
      });
    });
  };

  // const handleDeleteAccount = () => {
  //   reauthenticateWithCredential(user, credential).then(() => {
  //     deleteUser(user).then(() => {
  //       deleteDocument("users", currentUser.uid);

  //       setCurrentUser({});
  //     });
  //   });
  // };

  // const handleCloseModal = () => {
  //   setPassword("");
  //   onClose();
  // };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Avatar
          size="2xl"
          name={currentUser.displayName}
          src={currentUser.photoURL}
        />
        <div className="mt-8">
          <form action="" className="w-full">
            <label
              htmlFor="upload-photo"
              className="px-8 py-2 bg-white/20 text-white hover:bg-white/10 transition-all rounded-full"
            >
              Upload image
            </label>
            <input
              onChange={handleChangePhoto}
              id="upload-photo"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
            />
          </form>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl text-white text-center font-semibold">
          {currentUser.displayName}
        </p>
        <div className="mt-8">
          <form action="" onSubmit={handleChangeUsername}>
            <label htmlFor="" className="block mb-3 text-xl text-white">
              Change username
            </label>
            <div className="flex items-center justify-center">
              <input
                onChange={(e) => setUsernameChange(e.target.value)}
                value={usernameChange}
                type="text"
                className="px-4 py-2 md:w-[400px] w-[250px] text-white outline-none bg-gray-800 rounded-lg"
              />
              <button type="submit" className="ml-4">
                <RiSendPlaneFill className="text-4xl text-red" />
              </button>
            </div>
          </form>
        </div>
        {/* <div className="mt-10 flex justify-center">
          <button
            onClick={onOpen}
            className="px-8 py-2 text-xl text-red bg-white/20 hover:bg-white/10 transition-all rounded-full"
          >
            Delete account
          </button>
        </div> */}
      </div>
      {/* <ModalMovie
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Type password"
        hasSecondBtn
        onClickSecondBtn={handleDeleteAccount}
      >
        <form action="">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="px-4 py-2 md:w-[400px] w-[250px] text-white outline-none bg-white/20 rounded-lg"
          />
        </form>
      </ModalMovie> */}
    </div>
  );
}

export default SettingProfile;
