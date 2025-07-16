import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";

export const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);

  const [editData, setEditData] = useState(null);

  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
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
      const res = await axiosSecure.delete(`/categories/${id}`);
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Category deleted successfully.", "success");
        refetch();
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.categoryName.value.trim();
    const categoryImage = form.categoryImage.value.trim();

    if (!categoryName || !categoryImage) {
      return Swal.fire("Error", "All fields are required.", "error");
    }

    const res = await axiosSecure.post("/categories", { categoryName, categoryImage });
    if (res.data?.insertedId) {
      Swal.fire("Success", "Category added successfully.", "success");
      form.reset();
      addModalRef.current.checked = false;
      refetch();
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.categoryName.value.trim();
    const categoryImage = form.categoryImage.value.trim();

    if (!categoryName || !categoryImage) {
      return Swal.fire("Error", "All fields are required.", "error");
    }

    const res = await axiosSecure.put(`/categories/${editData._id}`, {
      categoryName,
      categoryImage,
    });

    if (res.data?.modifiedCount > 0) {
      Swal.fire("Updated!", "Category updated successfully.", "success");
      editModalRef.current.checked = false;
      setEditData(null);
      refetch();
    }
  };

  return (
    <div className="p-4">
      {/* Title */}
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
          Manage Categories
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      {/* Add Button */}
      <div className="flex justify-end items-center mb-5">
        <label
          htmlFor="addCategoryModal"
          className="btn bg-teal-500 text-white gap-2"
        >
          <FaPlusCircle /> Add Category
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={cat.categoryImage}
                    alt={cat.categoryName}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td>{cat.categoryName}</td>
                <td>
                  <label
                    htmlFor="editCategoryModal"
                    className="btn btn-sm btn-warning mr-2"
                    onClick={() => setEditData(cat)}
                  >
                    <FaEdit />
                  </label>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <input type="checkbox" id="addCategoryModal" className="modal-toggle" ref={addModalRef} />
      <div className="modal">
        <div className="modal-box max-w-xl w-full">
          <h3 className="font-bold text-xl mb-4 text-center">Add New Category</h3>
          <form onSubmit={handleAddCategory} className="grid grid-cols-1 gap-4">
            <input
              name="categoryName"
              type="text"
              placeholder="Category Name"
              className="input input-bordered"
              required
            />
            <input
              name="categoryImage"
              type="url"
              placeholder="Image URL"
              className="input input-bordered"
              required
            />
            <div className="modal-action">
              <label htmlFor="addCategoryModal" className="btn">Cancel</label>
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Modal */}
      <input type="checkbox" id="editCategoryModal" className="modal-toggle" ref={editModalRef} />
      <div className="modal">
        <div className="modal-box max-w-xl w-full">
          <h3 className="font-bold text-xl mb-4 text-center">Edit Category</h3>
          <form onSubmit={handleEditCategory} className="grid grid-cols-1 gap-4">
            <input
              name="categoryName"
              defaultValue={editData?.categoryName}
              type="text"
              placeholder="Category Name"
              className="input input-bordered"
              required
            />
            <input
              name="categoryImage"
              defaultValue={editData?.categoryImage}
              type="url"
              placeholder="Image URL"
              className="input input-bordered"
              required
            />
            <div className="modal-action">
              <label htmlFor="editCategoryModal" className="btn">Cancel</label>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
