import React from "react";
import { ToastContainer } from "react-toastify";
import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import { Footer } from "../components/Footer/Footer";
import { ScrollToTop } from "../components/ScrollToTop/ScrollToTop";

export const MainLayout = () => {
  return (
    <div className="container mx-auto px-2">
      <ScrollToTop />
      <Navbar />
      <div className="min-h-[85vh]">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
