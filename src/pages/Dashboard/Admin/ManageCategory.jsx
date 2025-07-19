import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import { Loading } from "../../../components/Loading/Loading";
import { useForm } from "react-hook-form";

export const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);

  const [editData, setEditData] = useState(null);

  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  // React Hook Form for Add
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm();

  // React Hook Form for Edit
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm({
    defaultValues: {
      categoryName: "",
      categoryImage: "",
    },
  });

  // Whenever editData changes, reset edit form values
  useEffect(() => {
    if (editData) {
      resetEdit({
        categoryName: editData.categoryName || "",
        categoryImage: editData.categoryImage || "",
      });
    }
  }, [editData, resetEdit]);

  const onAddCategory = async (data) => {
    try {
      const res = await axiosSecure.post("/categories", data);
      if (res.data?.insertedId) {
        Swal.fire("Success", "Category added successfully.", "success");
        resetAdd();
        addModalRef.current.checked = false;
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add category.", "error");
    }
  };

  const onEditCategory = async (data) => {
    if (!editData) return;
    try {
      const res = await axiosSecure.put(`/categories/${editData._id}`, data);
      if (res.data?.modifiedCount > 0) {
        Swal.fire("Updated!", "Category updated successfully.", "success");
        editModalRef.current.checked = false;
        setEditData(null);
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update category.", "error");
    }
  };

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

  if (isLoading) return <Loading message="Fetching categories..." />;

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
      <input
        type="checkbox"
        id="addCategoryModal"
        className="modal-toggle"
        ref={addModalRef}
      />
      <div className="modal px-3">
        <div className="modal-box max-w-xl w-full">
          <h3 className="font-bold text-xl mb-4 text-center">
            Add New Category
          </h3>
          <form
            onSubmit={handleSubmitAdd(onAddCategory)}
            className="grid grid-cols-1 gap-4"
            noValidate
          >
            <div>
              <label
                htmlFor="addCategoryName"
                className="block mb-1 font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                id="addCategoryName"
                {...registerAdd("categoryName", {
                  required: "Category name is required",
                })}
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full"
              />
              {errorsAdd.categoryName && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsAdd.categoryName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="addCategoryImage"
                className="block mb-1 font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                id="addCategoryImage"
                {...registerAdd("categoryImage", {
                  required: "Image URL is required",
                  pattern: {
                    value:
                      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|bmp|tiff))$/i,
                    message: "Enter a valid image URL",
                  },
                })}
                type="url"
                placeholder="Image URL"
                className="input input-bordered w-full"
              />
              {errorsAdd.categoryImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsAdd.categoryImage.message}
                </p>
              )}
            </div>

            <div className="modal-action">
              <label
                htmlFor="addCategoryModal"
                className="btn bg-red-500 text-white"
                onClick={() => resetAdd()}
              >
                Cancel
              </label>
              <button type="submit" className="btn bg-teal-500 text-white">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Modal */}
      <input
        type="checkbox"
        id="editCategoryModal"
        className="modal-toggle"
        ref={editModalRef}
      />
      <div className="modal px-3">
        <div className="modal-box max-w-xl w-full">
          <h3 className="font-bold text-xl mb-4 text-center">Edit Category</h3>
          <form
            onSubmit={handleSubmitEdit(onEditCategory)}
            className="grid grid-cols-1 gap-4"
            noValidate
          >
            <div>
              <label
                htmlFor="editCategoryName"
                className="block mb-1 font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                id="editCategoryName"
                {...registerEdit("categoryName", {
                  required: "Category name is required",
                })}
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full"
              />
              {errorsEdit.categoryName && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsEdit.categoryName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="editCategoryImage"
                className="block mb-1 font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                id="editCategoryImage"
                {...registerEdit("categoryImage", {
                  required: "Image URL is required",
                  pattern: {
                    value:
                      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|bmp|tiff))$/i,
                    message: "Enter a valid image URL",
                  },
                })}
                type="url"
                placeholder="Image URL"
                className="input input-bordered w-full"
              />
              {errorsEdit.categoryImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsEdit.categoryImage.message}
                </p>
              )}
            </div>

            <div className="modal-action">
              <label
                htmlFor="editCategoryModal"
                className="btn bg-red-500 text-white"
                onClick={() => {
                  setEditData(null);
                  resetEdit();
                }}
              >
                Cancel
              </label>
              <button type="submit" className="btn bg-teal-500 text-white">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
