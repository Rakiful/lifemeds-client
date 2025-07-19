import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AddMecineModal } from "./AddMedicineModal";
import {
  FaCapsules,
  FaEdit,
  FaPlusCircle,
  FaSearch,
  FaSortAmountDown,
  FaTrash,
} from "react-icons/fa";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import { Loading } from "../../../../components/Loading/Loading";
import { useAuth } from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { EditMecineModal } from "./EditMedicineModal";
import { Helmet } from "react-helmet-async";

export const ManageMedicines = () => {
  const [selectedMedicine, setSelectedMedicine] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all medicines
  const {
    data: medicines = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicines/seller/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/medicines/${id}`);
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Medicine deleted successfully.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <Loading message="Fetching data..." />;

  // Filter, sort and paginate
  const filteredMedicines = medicines
    .filter((med) => {
      const search = searchTerm.toLowerCase();
      return (
        med.medicineName.toLowerCase().includes(search) ||
        med.genericName.toLowerCase().includes(search) ||
        med.company.toLowerCase().includes(search)
      );
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <Helmet>
        <title>Manage Medicines | LifeMeds</title>
      </Helmet>
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Manage Medicines
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search medicine, generic, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered text-sm w-full pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-teal-600" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <label htmlFor="sortOrder" className="text-sm font-medium">
            Sort by Price:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="addMedicineModal"
            className="btn bg-teal-500 text-white gap-2"
          >
            <FaPlusCircle /> Add Medicine
          </label>
        </div>
      </div>

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMedicines.map((med, index) => (
                <tr key={med._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    <img
                      src={med.medicineImage}
                      alt={med.medicineName}
                      className="w-12 h-12 object-contain"
                    />
                  </td>
                  <td>{med.medicineName}</td>
                  <td>{med.genericName}</td>
                  <td>{med.category}</td>
                  <td>{med.company}</td>
                  <td>{med.unit.toUpperCase()}</td>
                  <td>${med.price.toFixed(2)}</td>
                  <td>{med.discount}%</td>
                  <td>
                    <label
                      htmlFor="editMedicineModal"
                      className="btn btn-sm btn-warning mr-2"
                      onClick={() => setSelectedMedicine(med)}
                    >
                      <FaEdit />
                    </label>
                    <button
                      onClick={() => handleDelete(med._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedMedicines.length === 0 && (
            <div className="flex flex-col justify-center items-center h-[50vh]">
              <FaCapsules className="text-7xl text-teal-500" />
              <p className="text-gray-600 font-semibold">No Medicine Found</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n + 1)}
            className={`btn btn-sm ${
              currentPage === n + 1 ? "btn-active bg-teal-600 text-white" : ""
            }`}
          >
            {n + 1}
          </button>
        ))}
      </div>

      {/* DaisyUI Modal */}
      <AddMecineModal refetch={refetch} />
      <EditMecineModal selectedMedicine={selectedMedicine} refetch={refetch} />
    </div>
  );
};
