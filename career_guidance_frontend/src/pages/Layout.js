// src/pages/Home.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Auth/Navbar";
import Footer from "../components/Auth/Footer";

const Layout = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <Outlet />
     

      <Footer />
    </div>
    </>
  );
};

export default Layout;
