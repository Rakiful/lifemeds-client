import React from "react";
import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";

export const Errorpage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <FiAlertTriangle className="text-red-500 text-7xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};
