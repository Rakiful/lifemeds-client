import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";

export const NoPaymentHistory = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600 text-center">
      <FaMoneyBillAlt className="text-6xl text-teal-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Payment History</h2>
      <p className="text-sm text-gray-500">
        You have not received any payments yet.
      </p>
    </div>
  );
};
