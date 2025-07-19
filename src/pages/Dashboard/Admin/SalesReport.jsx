import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { utils, writeFile } from "xlsx";
import { Loading } from "../../../components/Loading/Loading";
import { FiAlertCircle } from "react-icons/fi";

export const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: report = [], isLoading } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/sales-report");
      return res.data;
    },
  });

  // Filter data by date range
  const filteredReport = report.filter((item) => {
    const itemDate = new Date(item.orderDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;

    return true;
  });

  // Handle export
  const handleDownloadXLSX = () => {
    const rows = filteredReport.map((item, index) => ({
      "#": index + 1,
      "Medicine Name": item.medicineName,
      "Seller Email": item.sellerEmail,
      "Buyer Email": item.buyerEmail,
      Quantity: item.quantity,
      "Unit Price": `$${item.price}`,
      "Total Price": `$${item.totalPrice.toFixed(2)}`,
      "Order Date": item.orderDate,
      "Payment Status": item.paymentStatus,
    }));

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sales Report");
    writeFile(workbook, `sales-report-${new Date()}.xlsx`);
  };

  if (isLoading) return <Loading message="Fetching categories..." />;

  return (
    <div className="p-4">
      {/* Title */}
      <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
        Sales Report
      </h1>
      <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />

      {/* Filters */}
      <div className="flex justify-end items-center gap-2 flex-wrap mb-5">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        {filteredReport.length > 0 && (
          <button
            className="btn bg-teal-500 text-white"
            onClick={handleDownloadXLSX}
          >
            Download XLSX
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Medicine Name</th>
              <th>Seller Email</th>
              <th>Buyer Email</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReport.map((cat, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={cat.categoryImage}
                    alt={cat.medicineName}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{cat.medicineName}</td>
                <td>{cat.sellerEmail}</td>
                <td>{cat.buyerEmail}</td>
                <td>{cat.quantity}</td>
                <td>$ {cat.price} </td>
                <td>$ {cat.totalPrice.toFixed(2)}</td>
                <td>{new Date(cat.orderDate).toISOString().split("T")[0]}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      cat.paymentStatus === "paid"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {cat.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReport.length === 0 && (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-2 py-8 text-gray-500">
            <FiAlertCircle className="text-4xl md:text-7xl text-red-400" />
            <p>No sales found in this date range.</p>
          </div>
        )}
      </div>
    </div>
  );
};
