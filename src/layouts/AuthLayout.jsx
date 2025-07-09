import React from "react";
import { Outlet } from "react-router";
import { LifeMeds } from "../components/LifeMeds/LifeMeds";

export const AuthLayout = () => {
  return (
    <div className="md:flex h-screen relative">
      <div className=" m-5 md:m-15 p-3 w-32 md:w-40 lg:w-60 rounded-2xl absolute">
        <LifeMeds/>
      </div>
      <div className="w-1/2 hidden md:flex h-screen flex-col justify-end bg-gradient-to-b from-teal-500  to-white">
        <div className="p-15">
          <h1 className="text-6xl text-black font-bold">
            Your trusted medicine partner 💊
          </h1>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center py-30 ">
        <Outlet />
      </div>
    </div>
  );
};
