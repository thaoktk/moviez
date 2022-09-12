import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { setDocument } from "../../firebase/service";
import useToastify from "../../hooks/useToastify";
import useCommonStore from "../../store/common";

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

function SignInWith() {
  const navigate = useNavigate();
  const { path } = useCommonStore();
  const showToast = useToastify();

  const addUser = (tokenResponse, user) => {
    if (tokenResponse?.isNewUser) {
      setDocument("users", user.uid, {
        uid: user.uid,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        email: user.email,
      });
    }
  };
  const handleSignInGG = () => {
    signInWithPopup(auth, GoogleProvider).then((userCredential) => {
      const { _tokenResponse, user } = userCredential;
      addUser(_tokenResponse, user);

      showToast({
        title: "Login successfully.",
        status: "success",
      });

      setTimeout(() => {
        navigate(`${path}`);
      }, 2000);
    });
  };

  const handleSignInFB = () => {
    signInWithPopup(auth, FacebookProvider).then((userCredential) => {
      const { _tokenResponse, user } = userCredential;
      addUser(_tokenResponse, user);

      showToast({
        title: "Login successfully.",
        description: "We will direct you to Homepage",
        status: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    });
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={handleSignInGG} className="px-5 py-2">
        <FcGoogle className="mr-3 text-5xl text-white" />
      </button>
      <button onClick={handleSignInFB} className="px-5 py-2">
        <BsFacebook className="mr-3 text-5xl text-blue-700" />
      </button>
    </div>
  );
}

export default SignInWith;
