import React from "react";
import { FaBan, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

export const Forbidden = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-medium transition"
      >
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
};