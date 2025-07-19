import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import payment_methods from "../../assets/icons/payment_methods.jpg";
import stripe_logo from "../../assets/icons/stripe.png";
import { Loading } from "../../components/Loading/Loading";

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

  const { data: cartItems = [],isLoading  } = useQuery({
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
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
      } else if (result.paymentIntent.status === "succeeded") {
        const cartData = await axiosSecure.get(`/cart/${user.email}`);
        const medicinesRes = await axiosSecure.get("/medicines");
        const medicines = medicinesRes.data;
        const newCartData = [];
        for (const cart of cartData.data) {
          const medicine = medicines.find((m) => m._id === cart.medicineId);
          const newCart = {
            cartId: cart._id,
            medicineId: cart.medicineId,
            medicineName: medicine?.medicineName || "Unknown",
            price: medicine?.price || 0,
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
          Swal.fire({
            title: "Order placed successfully!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          navigate("/invoice", { state: orderData });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Checkout failed",
        text: err.message,
      });
    }
  };

  if(isLoading){
    return <Loading/>
  }

  if (cartItems.length === 0) {
    return <Navigate to={"/cart"}></Navigate>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-teal-100 rounded-lg shadow">
      <div className="flex justify-between items-center mb-5">
        <img className="w-20 md:w-30" src={stripe_logo} alt="" />
        <img className="w-40 md:w-60" src={payment_methods} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid md:grid-cols-2 gap-4">
        <div>
          <label>Name <span className="text-red-600">*</span></label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="input input-bordered w-full bg-transparent"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>Email <span className="text-red-600">*</span></label>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="input input-bordered w-full bg-transparent"
            readOnly
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Phone <span className="text-red-600">*</span></label>
          <input
            {...register("phone", { required: "Phone is required" })}
            placeholder="Phone"
            className="input input-bordered w-full bg-transparent"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label>Address <span className="text-red-600">*</span></label>
          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="input input-bordered w-full bg-transparent"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="p-2 border rounded md:col-span-2">
          <CardElement className="p-3 text-2xl"/>
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="btn bg-teal-500 text-white hover:bg-teal-700 w-full mt-4 md:col-span-2"
        >
          Pay ${total.toFixed(2)}
        </button>
      </form>
    </div>
  );
};
