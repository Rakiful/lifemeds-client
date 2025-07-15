import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AddMecineModal } from "./AddMedicineModal";
import { FaPlusCircle } from "react-icons/fa";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import { Loading } from "../../../../components/Loading/Loading";

export const ManageMedicines = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all medicines
  const {
    data: medicines = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicines");
      return res.data;
    },
  });

  if (isLoading) return <Loading message="Fetching data..." />;

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Manage Medicines
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>
      <div className="flex justify-end items-center mb-5">
        <label
          htmlFor="addMedicineModal"
          className="btn bg-teal-500 text-white gap-2"
        >
          <FaPlusCircle /> Add Medicine
        </label>
      </div>

      {/* Placeholder table */}
      <div className="text-center">
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Generic</th>
                <th>Category</th>
                <th>Company</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Discount %</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, index) => (
                <tr key={med._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-12 h-12 object-contain"
                    />
                  </td>
                  <td>{med.name}</td>
                  <td>{med.genericName}</td>
                  <td>{med.category}</td>
                  <td>{med.company}</td>
                  <td>{med.unit.toUpperCase()}</td>
                  <td>${med.price.toFixed(2)}</td>
                  <td>{med.discount}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <AddMecineModal refetch={refetch} />
    </div>
  );
};
