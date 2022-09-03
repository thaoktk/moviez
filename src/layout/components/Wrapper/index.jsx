import React from "react";

function Wrapper({ children }) {
  return (
    <div className="bg-black flex justify-center items-center">
      <div className="min-h-screen max-w-screen-2xl w-full">{children}</div>
    </div>
  );
}

export default Wrapper;
