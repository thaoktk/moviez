import React, { useState } from "react";
import SignInAccount from "./SignInAccount";
import SignInWith from "./SignInWith";
import SignUp from "./SignUp";

function SignInAndUp() {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div>
      <SignInWith />
      <p className="mt-5 text-center text-xl text-white">or use your account</p>
      {(isSignIn && <SignInAccount />) || <SignUp setIsSignIn={setIsSignIn} />}
      <p className="mt-6 text-center text-xl">
        {(isSignIn && (
          <>
            <span className="mr-2 text-white">Need an accounts ? </span>
            <button
              onClick={() => setIsSignIn((prev) => !prev)}
              className="text-red font-semibold"
            >
              SignUp
            </button>
          </>
        )) || (
          <>
            <span className="mr-2 text-white">Already have an accounts ? </span>
            <button
              onClick={() => setIsSignIn((prev) => !prev)}
              className="text-red font-semibold"
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default SignInAndUp;
