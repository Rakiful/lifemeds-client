import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { Loading } from "../../../components/Loading/Loading";
import { useAuth } from "../../../hooks/useAuth";
import dayjs from "dayjs";

export const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["seller-payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading message="Fetching data..." />;

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
        Payment History
      </h1>
      <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 rounded-2xl mx-auto" />

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="table table-zebra w-full text-sm text-center">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>#</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Medicine ID</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Transaction ID</th>
              <th>Order Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.buyerName}</td>
                <td>{payment.buyerEmail}</td>
                <td>{payment.medicineId}</td>
                <td>{payment.quantity}</td>
                <td>${payment.total.toFixed(2)}</td>
                <td>{payment.transactionId}</td>
                <td>{dayjs(payment.orderDate).format("YYYY-MM-DD hh:mm A")}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      payment.paymentStatus === "paid"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {payment.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
