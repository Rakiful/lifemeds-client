import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";
import { Loading } from "../../../components/Loading/Loading";

export const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  const handleAcceptPayment = async (id) => {
    try {
      const res = await axiosSecure.patch(`/orders/${id}/payment`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Payment marked as paid", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update payment status", "error");
    }
  };

  if (isLoading) return <Loading message="Fetching payments..." />;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load orders.</p>;

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
          Payment Management
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 rounded-2xl mx-auto" />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border border-teal-200">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>#</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Total Bill</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className=" hover:bg-teal-100">
                <td>{index + 1}</td>
                <td>{order.buyerName}</td>
                <td>{order.buyerEmail}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.transactionId}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.paymentStatus === "paid"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  {order.paymentStatus === "pending" ? (
                    <button
                      onClick={() => handleAcceptPayment(order._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Accept Payment
                    </button>
                  ) : (
                    <FaCheckCircle className="text-green-500 text-xl mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};