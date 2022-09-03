import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";

function FilmLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}

export default FilmLayout;
