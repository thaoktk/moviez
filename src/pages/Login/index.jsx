import React from "react";
import SignInAndUp from "../../components/SignInAndUp";

function Login() {
  return (
    <div className="px-8 py-10 flex items-center justify-center">
      <div>
        <h1 className="mb-5 text-center text-5xl text-red font-semibold leading-tight">
          Sign in to <span className="text-white">Movie</span>z
        </h1>
        <div className="flex items-center justify-center">
          <SignInAndUp />
        </div>
      </div>
    </div>
  );
}

export default Login;
