import React from "react";
import { FaSignInAlt, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { SocialLogin } from "./SocialLogin";
import { useAuth } from "../../hooks/useAuth";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useState } from "react";
import { Processing } from "../../components/Processing/Processing";
import { postUserToDB } from "../../utils/postUserToDB";
import { Helmet } from "react-helmet-async";

export const Register = () => {
  const { createUser, userProfileUpdate } = useAuth();
  const [processing, setProcessing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const uploadUserToDB = postUserToDB();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setProcessing(true);
      const { name, email, password, role, image } = data;

      // console.log(data);

      const user = await createUser(email, password);
      // console.log(user);

      if (!image || image.length === 0) {
        console.error("No profile image selected.");
        return;
      }

      const imageUrl = await uploadToCloudinary(image[0]);

      await userProfileUpdate({
        displayName: name,
        photoURL: imageUrl || "https://i.ibb.co/PztCdK3s/34653.png",
      });

      const userInfo = {
        name,
        email,
        uid: user.user.uid,
        photo: imageUrl || "https://i.ibb.co/PztCdK3s/34653.png",
        role,
        createdAt: user.user.metadata.creationTime,
        lastLogin: new Date(),
      };

      const userDB = await uploadUserToDB(userInfo);

      setProcessing(false);
      // console.log("after all complete : ", userDB);
      Swal.fire({
        title: "Registered successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (err) {
      // console.log(err);
      setProcessing(false);
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        var messege = "The Email Already Used";
      }
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text: messege || err.message,
      });
    }
  };

  return (
    <div className="space-y-4 w-full md:w-3/4 px-5 md:px-0 lg:px-20">
      <Helmet>
        <title>Register| LifeMeds</title>
      </Helmet>
      <div>{processing && <Processing />}</div>
      <div className="">
        <h1 className="text-3xl lg:text-4xl font-bold text-teal-600">
          Sign Up to Your Account
        </h1>
        <p className="text-gray-500 lg:text-xl mt-2">
          Let's sign up and get started!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Username */}
        <div>
          <label className="block font-bold mb-1">Username</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Username is required" })}
              className="border border-gray-400 focus:outline-none focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUser />
            </span>
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
                  message:
                    "Password must be at least 6 characters, include uppercase, lowercase, and a number",
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

        {/* Role */}
        <div>
          <label className="block font-bold mb-1">Select Your Role</label>
          <div className="relative">
            <select
              {...register("role", { required: "Role is required" })}
              className="border border-gray-400 focus:outline-none focus:border-teal-500 w-full py-3 pl-10 rounded-full"
            >
              <option value="">Select Your Role</option>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block font-bold mb-1">Add Your Profile Photo</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Profile photo is required",
                validate: {
                  isFile: (value) =>
                    value && value.length > 0 ? true : "File is required",
                },
              })}
              className="border border-gray-400 focus:outline-none focus:border-teal-500 w-full py-3 pl-4 pr-4 rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
            />
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-full w-full py-6 flex items-center justify-center gap-2"
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
