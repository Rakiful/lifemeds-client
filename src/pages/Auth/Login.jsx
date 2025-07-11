import React from "react";
import { FaSignInAlt, FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { SocialLogin } from "./SocialLogin";

export const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await signInUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="space-y-4 w-full md:w-3/4 px-5 lg:px-20">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-teal-600">
          Sign in to Your Account
        </h1>
        <p className="text-gray-500 lg:text-xl mt-2">
          Let's sign in and get started!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Email */}
        <div>
          <label className="block font-bold mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-400 focus:outline-none focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaEnvelope />
            </span>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-bold mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                  message: "wrong password",
                },
              })}
              className="border border-gray-400 focus:outline-none focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-full w-full py-6 flex items-center justify-center gap-2"
        >
          <FaSignInAlt /> Sign In
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm mt-4 space-y-2">
        <p>
          Don't have an account?{" "}
          <Link
            to="/auth/sign-up"
            className="text-teal-600 font-semibold hover:underline"
          >
            Sign Up
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
