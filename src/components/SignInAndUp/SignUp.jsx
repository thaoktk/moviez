import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { auth } from "../../firebase/config";
import { setDocument } from "../../firebase/service";
import { defaultAvatar } from "../../shared/constant";
import { translateError } from "../../shared/utils";

const schema = yup.object().shape({
  userName: yup.string().required("Username is required!"),
  email: yup.string().email().required("Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters!"),
});

function SignUp({ setIsSignIn }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const showToast = (value) =>
    toast({
      ...value,
      position: "top-right",
      duration: 7000,
      isClosable: true,
    });

  const onSubmitHandler = (data) => {
    const { email, password, userName } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setDocument("users", user.uid, {
          uid: user.uid,
          displayName: userName,
          photoURL: defaultAvatar,
          email: user.email,
        });

        showToast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
        });

        setTimeout(() => {
          setIsSignIn(true);
        }, 2000);
      })
      .catch((err) => {
        showToast({
          title: "Error.",
          description: translateError(err.code),
          status: "error",
        });
      });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-5">
      <div className="mb-4">
        <label htmlFor="" className="block mb-3 text-xl text-white">
          Username
        </label>
        <input
          {...register("userName")}
          type="text"
          className="px-4 py-2 lg:w-[400px] w-[300px] text-white outline-none bg-gray-800 rounded-lg"
        />
        <p className="mt-1 text-red">{errors.userName?.message}</p>
      </div>
      <div>
        <label htmlFor="" className="block mb-3 text-xl text-white">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="px-4 py-2 lg:w-[400px] w-[300px] text-white outline-none bg-gray-800 rounded-lg"
        />
        <p className="mt-1 text-red">{errors.email?.message}</p>
      </div>
      <div className="mt-4">
        <label htmlFor="" className="block mb-3 text-xl text-white">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          className="px-4 py-2 lg:w-[400px] w-[300px] text-white outline-none bg-gray-800 rounded-lg"
        />
        <p className="mt-1 text-red">{errors.password?.message}</p>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="px-8 py-2 text-xl text-white hover:bg-red hover:border-red rounded-full border border-1 transition-all"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export default SignUp;
