import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth } from "../../firebase/config";
import { translateError } from "../../shared/utils";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

function SignInAccount() {
  const navigate = useNavigate();

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
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showToast({
          title: "Login successfully.",
          description: "We will direct you to Homepage",
          status: "success",
        });
        
        setTimeout(() => {
          navigate("/")
        }, 2000)
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
          Login
        </button>
      </div>
    </form>
  );
}

export default SignInAccount;
