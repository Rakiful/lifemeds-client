import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { Loading } from "../../../components/Loading/Loading";
import { useForm } from "react-hook-form";

export const AskAdvertisement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const {
    data: ads = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["ads", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements/${user.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const adData = {
      sellerEmail: user.email,
      medicineName: data.medicineName.trim(),
      medicineImage: data.medicineImage.trim(),
      description: data.description.trim(),
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/advertisements", adData);
      if (res.data?.insertedId) {
        Swal.fire("Success", "Ad request submitted!", "success");
        reset();
        modalRef.current.checked = false;
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure you want to cancel this advertisement request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#14b8a6",
      confirmButtonText: "Yes, cancel it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/advertisements/${id}`);
        if (res.data?.success) {
          Swal.fire(
            "Cancelled",
            "Advertisement request has been cancelled",
            "success"
          );
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to cancel request", "error");
      }
    }
  };

  if (isLoading) return <Loading message="Fetching advertisement..." />;

  return (
    <div className="p-4">
      {/* Title */}
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
          Ask for Advertisement
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      {/* Add Ad Button */}
      <div className="flex justify-end mb-5">
        <label htmlFor="adModal" className="btn bg-teal-500 text-white gap-2">
          <FaPlusCircle /> Request Advertisement
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Description</th>
              <th className="text-center">Status</th>
              <th className="text-center">Cancel Request</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, index) => (
              <tr key={ad._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={ad.medicineImage}
                    alt="ad"
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td>{ad.description}</td>
                <td className="text-center">
                  <span
                    className={`badge ${
                      ad.status === "approved"
                        ? "badge-success"
                        : ad.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="text-center">
                  {ad.status === "pending" ? (
                    <button
                      onClick={() => handleCancel(ad._id)}
                      className="btn text-white bg-red-600"
                    >
                      Cancel
                    </button>
                  ) : (
                    <p>You Don't Have Permission To Cancel Approved Ads</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {ads.length === 0 && !isLoading && (
          <div className="h-[50vh] flex flex-col items-center justify-center py-8 text-gray-500">
            <MdCampaign className="text-7xl text-red-400 mb-2" />
            <p className="text-center">No advertisement requests found.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <input
        type="checkbox"
        id="adModal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal px-3">
        <div className="modal-box max-w-xl w-full">
          <h3 className="font-bold text-xl mb-4 text-center">
            Request Advertisement
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
            noValidate
          >
            {/* Medicine Name */}
            <div>
              <label htmlFor="medicineName" className="block mb-1 font-medium">
                Advertisement Medicine Name
              </label>
              <input
                id="medicineName"
                {...register("medicineName", {
                  required: "Medicine name is required",
                  maxLength: {
                    value: 100,
                    message: "Maximum length is 100 characters",
                  },
                })}
                type="text"
                className={`input input-bordered w-full ${
                  errors.medicineName ? "input-error" : ""
                }`}
                aria-invalid={errors.medicineName ? "true" : "false"}
              />
              {errors.medicineName && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.medicineName.message}
                </p>
              )}
            </div>

            {/* Medicine Image URL */}
            <div>
              <label htmlFor="medicineImage" className="block mb-1 font-medium">
                Advertisement Medicine Image URL
              </label>
              <input
                id="medicineImage"
                {...register("medicineImage", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Enter a valid URL",
                  },
                })}
                type="url"
                className={`input input-bordered w-full ${
                  errors.medicineImage ? "input-error" : ""
                }`}
                aria-invalid={errors.medicineImage ? "true" : "false"}
              />
              {errors.medicineImage && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.medicineImage.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-1 font-medium">
                Short Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 300,
                    message: "Maximum length is 300 characters",
                  },
                })}
                rows={3}
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="modal-action">
              <label
                htmlFor="adModal"
                className="btn bg-red-500 text-white"
                tabIndex={0}
                onClick={() => reset()}
              >
                Cancel
              </label>
              <button
                type="submit"
                className="btn bg-teal-500 text-white"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
