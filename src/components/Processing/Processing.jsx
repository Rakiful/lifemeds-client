import React from "react";
import { LifeMeds } from "../LifeMeds/LifeMeds";

export const Processing = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 z-[9999] w-full h-screen bg-teal-500/70">
      <div className="flex h-full flex-col justify-center items-center text-white">
        <div className="w-40 md:w-70">
          <LifeMeds />
        </div>
        <span className="loading px-7 lg:px-10 loading-dots loading-xl"></span>
        <p className="text-sm md:text-lg font-medium">{message || ""}</p>
      </div>
    </div>
  );
};
