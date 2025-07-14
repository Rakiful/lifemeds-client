import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-40 text-center text-gray-600">
      <FaShoppingCart size={80} className="text-gray-400" />
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <p className="max-w-xs">
        Looks like you haven’t added any items to your cart yet.
      </p>
      <button
        onClick={() => navigate("/shop")}
        className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 transition"
      >
        Go to Shop
      </button>
    </div>
  );
};
