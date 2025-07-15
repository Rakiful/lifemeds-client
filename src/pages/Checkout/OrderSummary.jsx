import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

export const OrderSummary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/${user.email}`);
      const medicinesRes = await axiosSecure.get("/medicines");
      const medicines = medicinesRes.data;

      return res.data.map((item) => {
        const medicine = medicines.find((m) => m._id === item.medicineId);
        return {
          ...medicine,
          cartId: item._id,
          quantity: item.quantity,
          userEmail: item.userEmail,
        };
      });
    },
    onError: () => {
      toast.error("Failed to load cart");
    },
  });

  console.log(cartItems);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-teal-100 ">
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Unit Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.cartId}>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>${item.price}</td>
                <td className="flex justify-center items-center gap-4">
                  <p>{item.quantity}</p>
                </td>
                <td className="text-center">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-end items-end mt-5 gap-3">
        <p className="text-lg text-gray-600">
          You have {cartItems.length} items in cart.
        </p>
        <p className="text-xl md:text-2xl font-bold">
          Subtotal: $
          {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </p>
      </div>
    </div>
  );
};
