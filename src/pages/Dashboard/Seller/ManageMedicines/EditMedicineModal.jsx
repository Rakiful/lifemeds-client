import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import { useAuth } from "../../../../hooks/useAuth";

export const EditMecineModal = ({ refetch, selectedMedicine }) => {
  const { user } = useAuth();
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedMedicine) {
      for (const key in selectedMedicine) {
        if (selectedMedicine[key] !== undefined) {
          setValue(key, selectedMedicine[key]);
        }
      }
    }
  }, [selectedMedicine, setValue]);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  const { data: companies = [] } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/companies");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    data.discount = parseFloat(data.discount || 0);
    data.price = parseFloat(data.price);
    data.sellerEmail = user.email;

    try {
      const res = await axiosSecure.put(`/medicines/${selectedMedicine._id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Medicine updated successfully!", "success");
        reset();
        modalRef.current.checked = false;
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update medicine.", "error");
    }
  };

  return (
    <div>
      <input type="checkbox" id="editMedicineModal" className="modal-toggle" ref={modalRef} />
      <div className="modal p-3">
        <div className="modal-box max-w-2xl w-full">
          <h3 className="font-bold text-xl mb-4">Edit Medicine</h3>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Medicine Name</label>
              <input
                {...register("medicineName", { required: "Medicine Name is required" })}
                type="text"
                className="input input-bordered w-full"
              />
              {errors.medicineName && <p className="text-red-500 text-sm mt-1">{errors.medicineName.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Generic Name</label>
              <input
                {...register("genericName", { required: "Generic Name is required" })}
                type="text"
                className="input input-bordered w-full"
              />
              {errors.genericName && <p className="text-red-500 text-sm mt-1">{errors.genericName.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="textarea textarea-bordered w-full"
                rows={2}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Image URL</label>
              <input
                {...register("medicineImage", { required: "Image URL is required" })}
                type="url"
                className="input input-bordered w-full"
              />
              {errors.medicineImage && <p className="text-red-500 text-sm mt-1">{errors.medicineImage.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Company</label>
              <select
                {...register("company", { required: "Company is required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select Company</option>
                {companies.map((comp, i) => (
                  <option key={i} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Unit</label>
              <select
                {...register("unit", { required: "Unit is required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select Unit</option>
                <option value="mg">mg</option>
                <option value="ml">ml</option>
              </select>
              {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Price (per unit)</label>
              <input
                {...register("price", { required: "Price is required", valueAsNumber: true })}
                type="number"
                step="0.01"
                className="input input-bordered w-full"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Discount (%)</label>
              <input
                {...register("discount", { required: "Discount is required", valueAsNumber: true })}
                type="number"
                className="input input-bordered w-full"
              />
              {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
            </div>

            <div className="modal-action md:col-span-2 flex justify-end gap-2">
              <label htmlFor="editMedicineModal" className="btn bg-red-500 text-white">
                Cancel
              </label>
              <button type="submit" className="btn bg-teal-500 text-white">
                Update Medicine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
