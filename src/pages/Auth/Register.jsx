import React from "react";
import { FaSignInAlt, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router";
import { CustomFileInput } from "../../components/CustomFileInput/CustomFileInput";
import { SocialLogin } from "./SocialLogin";

export const Register = () => {
  return (
    <div className="space-y-4 w-full md:w-3/4 px-5 md:px-0 lg:px-20">
      <div className="">
        <h1 className="text-3xl lg:text-4xl font-bold text-teal-600">
          Sign Up to Your Account
        </h1>
        <p className="text-gray-500 lg:text-xl mt-2">
          Let's sign up and get started!
        </p>
      </div>

      <form className="space-y-3">
        {/* Username */}
        <div>
          <label className="block font-bold mb-1">Username</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-400 focus:outline-none
               focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUser />
            </span>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block font-bold mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-400 focus:outline-none
               focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaEnvelope />
            </span>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block font-bold mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-400 focus:outline-none
               focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block font-bold mb-1">Select Your Role</label>
          <div className="relative">
            <select
              className="border border-gray-400 focus:outline-none
             focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            >
              <option>Select Your Role</option>
              <option>User</option>
              <option>Seller</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
          </div>
        </div>

        {/* Profile Photo */}
        <CustomFileInput />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-full
           w-full py-6 flex items-center justify-center gap-2"
        >
          <FaSignInAlt /> Sign Up
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm mt-4 space-y-2">
        <p>
          Already have an account?{" "}
          <Link
            to="/auth"
            className="text-teal-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
        <p className="text-teal-600 font-semibold hover:underline cursor-pointer">
          Forgot Password?
        </p>
      </div>
      <SocialLogin />
    </div>
  );
};
