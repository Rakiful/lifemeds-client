import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  return (
    <div className="container mx-auto px-2">
      <Navbar />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
