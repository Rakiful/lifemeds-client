import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const ManageAdvertisement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: ads = [], refetch } = useQuery({
    queryKey: ["allAdvertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  const handleToggle = async (id, current) => {
    try {
      const res = await axiosSecure.patch(`/advertisements/slider/${id}`, {
        showInSlider: !current,
      });

      if (res.data.success) {
        Swal.fire("Updated", "Slider status changed successfully", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update slider status", "error");
    }
  };

  return (
    <div className="p-4">
      {/* Title */}
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
          Manage Advertisement Slider
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Seller Email</th>
              <th>Status</th>
              <th>Add to Slider</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, idx) => (
              <tr key={ad._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={ad.medicineImage}
                    alt="Medicine"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{ad.medicineName || "N/A"}</td>
                <td>{ad.description}</td>
                <td>{ad.sellerEmail}</td>
                <td>
                  <span
                    className={`badge ${
                      ad.status === "approved"
                        ? "badge-success"
                        : ad.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={ad.showInSlider || false}
                    onChange={() => handleToggle(ad._id, ad.showInSlider)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
