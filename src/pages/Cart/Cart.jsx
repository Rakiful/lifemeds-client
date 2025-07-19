import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { EmptyCart } from "./EmptyCart";
import { Loading } from "../../components/Loading/Loading";
import Swal from "sweetalert2";

export const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch cart items + merge with medicine data
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/${user.email}`);
      console.log(res.data);
      const medicinesRes = await axiosSecure.get("/medicines");
      const medicines = medicinesRes.data;

      return res.data.map((item) => {
        const medicine = medicines.find((m) => m._id === item.medicineId);
        return {
          ...medicine,
          cartId: item._id, // preserve cart item's _id separately
          quantity: item.quantity,
          userEmail: item.userEmail,
        };
      });
    },
    onError: () => {
      toast.error("Failed to load cart");
    },
  });

  // Increase quantity mutation
  const increaseQuantity = useMutation({
    mutationFn: (item) =>
      axiosSecure.patch(`/cart/${item.cartId}`, { operation: "increase" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => toast.error("Failed to increase quantity"),
  });

  // Decrease quantity mutation
  const decreaseQuantity = useMutation({
    mutationFn: (item) => {
      if (item.quantity > 1) {
        return axiosSecure.patch(`/cart/${item.cartId}`, {
          operation: "decrease",
        });
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => toast.error("Failed to decrease quantity"),
  });

  // Remove item mutation
  const removeItem = useMutation({
    mutationFn: (item) =>
      axiosSecure.patch(`/cart/${item.cartId}`, { operation: "removeItem" }),
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => toast.error("Failed to remove item"),
  });

  const clearCart = useMutation({
    mutationFn: () => axiosSecure.delete(`/cart/clear/${user.email}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Cleared!",
        text: "Your cart has been cleared.",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to clear cart.",
      });
    },
  });

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will clear all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart.mutate();
      }
    });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return <Loading />;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="p-5">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          My Cart
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Company</th>
              <th>Unit Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
              <th className="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.cartId}>
                <td className="flex items-center gap-2">
                  <img src={item.medicineImage} alt="" className="w-10" />
                  <p>{item.medicineName}</p>
                </td>
                <td>{item.company}</td>
                <td>${item.price}</td>
                <td className="flex justify-center items-center gap-4">
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => increaseQuantity.mutate(item)}
                    disabled={increaseQuantity.isLoading}
                  >
                    <FaPlus />
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => decreaseQuantity.mutate(item)}
                    disabled={item.quantity <= 1 || decreaseQuantity.isLoading}
                  >
                    <FaMinus />
                  </button>
                </td>
                <td className="text-center">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td>
                  <div className="flex justify-center">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => removeItem.mutate(item)}
                      disabled={removeItem.isLoading}
                    >
                      <FaTrash className="text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 md:flex justify-between items-center space-y-4">
        <p className="text-lg md:text-3xl font-semibold">
          <span className="mr-2">Subtotal:</span>
          <span className="text-teal-600">${total.toFixed(2)}</span>
        </p>

        <div className="flex gap-4">
          <button
            className="btn btn-outline"
            onClick={handleClearCart}
            disabled={clearCart.isLoading}
          >
            Clear Cart
          </button>

          <button
            className="btn bg-teal-500 hover:bg-teal-700 text-white"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
