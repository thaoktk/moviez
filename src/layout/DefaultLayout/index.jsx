import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";

function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <div className="lg:px-8 px-5 py-5 flex justify-start items-start">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </Wrapper>
  );
}

export default DefaultLayout;
