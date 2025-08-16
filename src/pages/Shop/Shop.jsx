import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Loading } from "../../components/Loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import {
  FaCapsules,
  FaEye,
  FaPlus,
  FaRegBuilding,
  FaTags,
  FaSyringe,
  FaDollarSign,
  FaPercentage,
  FaNotesMedical,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const Shop = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate()

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/medicines", {
        withCredentials: "include",
      });
      return res.data;
    },
  });

  const handleAddToCart = async (item) => {
    if (!user) return navigate('/auth');
    const data = {
      userEmail: user?.email,
      medicineId: item._id,
      quantity: 1,
      addedAt: new Date(),
    };
    const res = await axiosSecure.post("/cart", data);
    if (res.data.insertedId) {
      toast.success(`${item.medicineName} added to cart`, {
        position: "top-right",
      });
      queryClient.invalidateQueries(["cartCount", user?.email]);
    }
    if (res.data.message) {
      toast.warning(`${item.medicineName} ${res.data.message}`, {
        position: "top-right",
      });
    }
  };

  if (isLoading) return <Loading />;

  // Filter and sort logic
  const filtered = medicines.filter((med) => {
    const target =
      `${med.medicineName} ${med.genericName} ${med.company}`.toLowerCase();
    return target.includes(searchTerm.toLowerCase());
  });

  const sorted = [...filtered].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <Helmet>
        <title>Shop | LifeMeds</title>
      </Helmet>
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
          Shop Medicines
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 rounded-2xl mx-auto" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search medicine, generic, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-teal-600" />
        </div>
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="sortOrder" className="text-sm font-medium">
            Sort by Price:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>Generic</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Company</th>
              <th>Unit</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, idx) => (
              <tr key={item._id}>
                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td className="flex items-center gap-2">
                  <img src={item.medicineImage} alt="" className="w-10" />
                  <p>{item.medicineName}</p>
                </td>
                <td>{item.genericName}</td>
                <td>${item.price}</td>
                <td>{item.discount}%</td>
                <td>{item.company}</td>
                <td>{item.unit}</td>
                <td>
                  <div className="flex justify-center gap-2">
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[50vh]">
            <FaCapsules className="text-7xl text-teal-500" />
            <p className="text-gray-600 font-semibold">No Medicine Found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
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

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-2xl p-6 bg-white shadow-xl rounded-xl relative">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="btn btn-sm btn-circle absolute right-4 top-4 bg-red-500 text-white"
            >
              ✕
            </button>

            <h2 className="text-4xl font-bold text-center mb-4 text-teal-600 flex items-center justify-center gap-2">
              <FaCapsules /> {selectedMedicine.medicineName}
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={selectedMedicine.medicineImage}
                alt={selectedMedicine.name}
                className="w-48 h-48 object-contain border border-teal-500 rounded-md shadow"
              />

              <div className="w-full text-sm md:text-base space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaNotesMedical className="text-teal-500" />
                  <span className="font-medium">Generic Name:</span>{" "}
                  {selectedMedicine.genericName}
                </p>
                <p className="flex items-center gap-2">
                  <FaTags className="text-teal-500" />
                  <span className="font-medium">Category:</span>{" "}
                  {selectedMedicine.category}
                </p>
                <p className="flex items-center gap-2">
                  <FaRegBuilding className="text-teal-500" />
                  <span className="font-medium">Company:</span>{" "}
                  {selectedMedicine.company}
                </p>
                <p className="flex items-center gap-2">
                  <FaSyringe className="text-teal-500" />
                  <span className="font-medium">Unit:</span>{" "}
                  {selectedMedicine.unit}
                </p>
                <p className="flex items-center gap-2">
                  <FaDollarSign className="text-teal-500" />
                  <span className="font-medium">Price:</span> $
                  {selectedMedicine.price}
                </p>
                <p className="flex items-center gap-2">
                  <FaPercentage className="text-teal-500" />
                  <span className="font-medium">Discount:</span>{" "}
                  {selectedMedicine.discount}%
                </p>
              </div>
            </div>

            <div className="mt-5 bg-gray-50 p-4 rounded-md border border-teal-500 text-sm text-gray-800">
              <strong className="block mb-1 text-gray-900">Description:</strong>
              {selectedMedicine.description}
            </div>

            <div className="modal-action justify-center mt-6">
              <button
                onClick={() => handleAddToCart(selectedMedicine)}
                className="btn bg-teal-600 hover:bg-teal-700 text-white px-6"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
