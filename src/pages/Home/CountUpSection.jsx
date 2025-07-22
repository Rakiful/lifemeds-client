import React from "react";
import CountUp from "react-countup";
import { FaCapsules, FaUsers, FaStore, FaShoppingCart } from "react-icons/fa";

export const CountUpSection = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Trusted by Thousands Nationwide
        </h1>
        <p className="text-sm md:text-lg text-center mt-2 text-gray-600">
          Fast, reliable medicine delivery from certified sellers across the
          country.
        </p>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        <div className="bg-white shadow-md rounded-3xl p-6 text-center">
          <FaCapsules className="text-teal-500 text-6xl mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-teal-600 mb-2">
            <CountUp end={15000} duration={6} />+
          </h2>
          <p className="text-lg font-semibold text-gray-700">Medicines Sold</p>
        </div>

        <div className="bg-white shadow-md rounded-3xl p-6 text-center">
          <FaUsers className="text-emerald-500 text-6xl mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-emerald-600 mb-2">
            <CountUp end={5000} duration={6} />+
          </h2>
          <p className="text-lg font-semibold text-gray-700">Happy Customers</p>
        </div>

        <div className="bg-white shadow-md rounded-3xl p-6 text-center">
          <FaStore className="text-indigo-500 text-6xl mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-indigo-600 mb-2">
            <CountUp end={120} duration={6} />+
          </h2>
          <p className="text-lg font-semibold text-gray-700">
            Verified Sellers
          </p>
        </div>

        <div className="bg-white shadow-md rounded-3xl p-6 text-center">
          <FaShoppingCart className="text-rose-500 text-6xl mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-rose-600 mb-2">
            <CountUp end={35000} duration={6} />+
          </h2>
          <p className="text-lg font-semibold text-gray-700">
            Orders Delivered
          </p>
        </div>
      </div>
    </div>
  );
};
