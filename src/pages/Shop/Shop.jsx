import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Loading } from "../../components/Loading/Loading";
import { useAuth } from "../../hooks/useAuth";

export const Shop = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all medicines
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicines");
      return res.data;
    },
  });

  // Simulate cart
  const handleAddToCart = async (item) => {
    const data = {
      userEmail: user.email,
      medicineId: item._id,
      quantity: 1,
      addedAt: new Date(),
    };
    const res = await axiosSecure.post("/cart", data);
    if (res.data.insertedId) {
      toast.success(`${item.name} added to cart`, {
        position: "top-right",
      });
    }
    if (res.data.message) {
      toast.warning(`${item.name} ${res.data.message}`, {
        position: "top-right",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Shop Medicines
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Generic</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Company</th>
              <th>Unit</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.genericName}</td>
                <td>${item.price}</td>
                <td>{item.discount}%</td>
                <td>{item.company}</td>
                <td>{item.unit}</td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => setSelectedMedicine(item)}
                    className="btn btn-sm btn-info text-white"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn btn-sm btn-success text-white"
                  >
                    <FaPlus /> Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <>
          <input
            type="checkbox"
            id="medicineDetailsModal"
            className="modal-toggle"
            checked
            readOnly
          />
          <div className="modal modal-open">
            <div className="modal-box max-w-xl">
              <h3 className="font-bold text-lg mb-3">
                {selectedMedicine.name}
              </h3>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <p>
                <strong>Generic:</strong> {selectedMedicine.genericName}
              </p>
              <p>
                <strong>Category:</strong> {selectedMedicine.category}
              </p>
              <p>
                <strong>Company:</strong> {selectedMedicine.company}
              </p>
              <p>
                <strong>Unit:</strong> {selectedMedicine.unit}
              </p>
              <p>
                <strong>Price:</strong> ${selectedMedicine.price}
              </p>
              <p>
                <strong>Discount:</strong> {selectedMedicine.discount}%
              </p>
              <p>
                <strong>Description:</strong> {selectedMedicine.description}
              </p>

              <div className="modal-action">
                <label
                  htmlFor="medicineDetailsModal"
                  className="btn"
                  onClick={() => setSelectedMedicine(null)}
                >
                  Close
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
