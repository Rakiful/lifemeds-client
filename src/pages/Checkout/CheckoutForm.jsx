// ==== React Checkout Component with Stripe + DB Post ====

import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";

export const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: user?.displayName, email: user?.email },
  });

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
        };
      });
    },
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const amountInCents = Math.round(total * 100);

  const onSubmit = async (data) => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { data: paymentIntentRes } = await axiosSecure.post(
        "/create-payment-intent",
        {
          amountInCents,
        }
      );

      const { clientSecret } = paymentIntentRes;
      console.log(clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: { line1: data.address },
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const cartData = await axiosSecure.get(`/cart/${user.email}`);

        const newCartData = [];
        for (const cart of cartData.data) {
          const newCart = {
            cartId: cart._id,
            medicineId: cart.medicineId,
            quantity: cart.quantity,
          };
          newCartData.push(newCart);
        }

        const orderData = {
          buyerName: data.name,
          buyerEmail: data.email,
          phone: data.phone,
          address: data.address,
          cartData: newCartData,
          total,
          transactionId: result.paymentIntent.id,
          paymentStatus: "pending",
          orderDate: new Date(),
        };
        console.log(orderData);

        const dbOrder = await axiosSecure.post("/orders", orderData);
        console.log(dbOrder);
        if (dbOrder) {
          toast.success("Order placed successfully!");
          navigate("/invoice");
        }
      }
    } catch (err) {
      toast.error("Checkout failed");
    }
  };

  if (cartItems.length === 0) {
    return <Navigate to={"/cart"}></Navigate>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="input input-bordered w-full"
          readOnly
        />
        <input
          {...register("phone", { required: true })}
          placeholder="Phone"
          className="input input-bordered w-full"
        />
        <input
          {...register("address", { required: true })}
          placeholder="Address"
          className="input input-bordered w-full"
        />

        <div className="p-2 border rounded">
          <CardElement />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full mt-4"
        >
          Pay ${total.toFixed(2)}
        </button>
      </form>
    </div>
  );
};