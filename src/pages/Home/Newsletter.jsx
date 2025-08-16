import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

export const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/subscribers", {
        email: data.email,
      });

      if (res.data.message === "This email already taken") {
        Swal.fire("Oops!", "This email is already subscribed.", "info");
      } else {
        Swal.fire("Success!", "You are subscribed to the newsletter.", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong. Try again later.", "error");
    }
  };

  return (
    <div className="bg-teal-50 py-10 px-6 rounded-3xl shadow-md max-w-5xl mx-auto my-16">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-4xl font-bold text-teal-700">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Get the latest updates, health tips, and exclusive discounts delivered straight to your inbox.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-teal-300 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl shadow-md hover:bg-teal-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {errors.email && (
        <p className="text-red-500 text-sm mt-2 text-center">{errors.email.message}</p>
      )}

      <p className="text-xs text-gray-500 text-center mt-4">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
};
