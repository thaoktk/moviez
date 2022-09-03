import React from "react";
import Footer from "../components/Footer";
import Wrapper from "../components/Wrapper";

function LoginLayout({ children }) {
  return (
    <Wrapper>
      {children}
      <Footer />
    </Wrapper>
  );
}

export default LoginLayout;
