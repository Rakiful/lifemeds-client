import React from "react";
import { OrderSummary } from "./OrderSummary";
import { Payment } from "./Payment";

export const Checkout = () => {
  return (
    <div className="py-5">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
          Checkout
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 rounded-2xl mx-auto" />
      </div>

      <div className="md:flex gap-8 px-5 space-y-5">
        <div className="md:w-1/2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <OrderSummary />
          </div>
        </div>

        <div className="md:w-1/2 space-y-6">
          <Payment />
        </div>
      </div>
    </div>
  );
};