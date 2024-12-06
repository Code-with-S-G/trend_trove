import React from "react";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="main-content min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
