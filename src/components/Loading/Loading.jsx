import React from "react";
import { LifeMeds } from "../LifeMeds/LifeMeds";

export const Loading = ({ message }) => {
  return (
    <div className="relative min-h-[100vh]">
      <div className="absolute inset-0 z-50">
        <div className="flex h-full w-full flex-col justify-center items-center text-white">
          <div className="w-32 md:w-56">
            <LifeMeds />
          </div>
          <span className="text-teal-500 loading px-6 lg:px-10 loading-dots loading-lg"></span>
          <p className="text-sm md:text-base font-medium mt-2">
            {message || "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};
