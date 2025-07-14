import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import { useAuth } from "../../../../hooks/useAuth";

export const AddMecineModal = ({ refetch }) => {
  const { user } = useAuth();
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // Load categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  // Load companies
  const { data: companies = [] } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/companies");
      return res.data;
    },
  });

  // Form Submit
  const onSubmit = async (data) => {
    data.discount = parseFloat(data.discount || 0);
    data.price = parseFloat(data.price);
    data.sellerEmail = user.email;
    data.createdAt = new Date();

    try {
      console.log(data);
      const res = await axiosSecure.post("/medicines", data);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Medicine added successfully!", "success");
        reset();
        modalRef.current.checked = false;
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add medicine.", "error");
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="addMedicineModal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <div className="modal-box max-w-2xl w-full">
          <h3 className="font-bold text-xl mb-4">Add New Medicine</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              {...register("name")}
              type="text"
              placeholder="Item Name"
              className="input input-bordered"
              required
            />
            <input
              {...register("genericName")}
              type="text"
              placeholder="Generic Name"
              className="input input-bordered"
            />
            <textarea
              {...register("description")}
              placeholder="Short Description"
              className="textarea textarea-bordered md:col-span-2"
              rows={2}
            ></textarea>
            <input
              {...register("image")}
              type="url"
              placeholder="Image URL"
              className="input input-bordered"
              required
            />
            <select
              {...register("category")}
              className="select select-bordered"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              {...register("company")}
              className="select select-bordered"
              required
            >
              <option value="">Select Company</option>
              {companies.map((comp, i) => (
                <option key={i} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
            <select
              {...register("unit")}
              className="select select-bordered"
              required
            >
              <option value="mg">Mg</option>
              <option value="ml">Ml</option>
            </select>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              placeholder="Per Unit Price"
              className="input input-bordered"
              required
            />
            <input
              {...register("discount")}
              type="number"
              placeholder="Discount % (default 0)"
              defaultValue={0}
              className="input input-bordered"
            />

            <div className="modal-action md:col-span-2">
              <label htmlFor="addMedicineModal" className="btn">
                Cancel
              </label>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
