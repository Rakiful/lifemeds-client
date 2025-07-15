import React from "react";
import logo from "../../assets/web_logo.png";
import { useLocation } from "react-router";

export const PreviewInvoice = () => {
  const { state: order } = useLocation();

  if (!order) {
    return (
      <p className="text-red-600 text-center mt-10">No invoice data found.</p>
    );
  }

  const paymentStatus = order.transactionId ? "PAID" : "UNPAID";
  const paymentColor = order.transactionId ? "text-green-600" : "text-red-600";
  const dateStr = new Date(order.orderDate).toLocaleDateString();

  return (
    <div className="p-6 bg-white shadow-lg rounded max-w-2xl min-h-[90vh] mx-auto my-10 border border-gray-300">
      <div className="flex justify-between items-start mb-6">
        {/* Logo left */}
        <img src={logo} alt="Logo" className="w-32 h-auto" />

        {/* Right side title */}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-teal-600">INVOICE</h1>
          <p className="text-sm text-gray-600 mt-1">
            Transaction ID: {order.transactionId}
          </p>
          <p className="text-sm text-gray-600">Date: {dateStr}</p>
          <p className={`text-3xl font-bold mt-2 ${paymentColor}`}>
            {paymentStatus}
          </p>
        </div>
      </div>

      {/* Billing Info */}
      <div className="mb-6 font-bold -mt-22">
        <h2 className="text-lg font-semibold text-green-800 mb-2">
          Billing To:
        </h2>
        <p className="text-sm text-gray-800">Name: {order.buyerName}</p>
        <p className="text-sm text-gray-800">Email: {order.buyerEmail}</p>
        <p className="text-sm text-gray-800">Phone: {order.phone}</p>
        <p className="text-sm text-gray-800">Address: {order.address}</p>
      </div>

      {/* Table */}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-teal-500 text-white text-left">
            <th className="p-2">#</th>
            <th className="p-2">Medicine</th>
            <th className="p-2">Price</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.cartData.map((item, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{item.medicineName}</td>
              <td className="p-2">${item.price.toFixed(2)}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right mt-6">
        <p className="text-2xl font-bold text-emerald-700">
          Total Paid: ${order.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
