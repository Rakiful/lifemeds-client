import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { Processing } from "../../../components/Processing/Processing";
import Swal from "sweetalert2";
import { FaUser, FaUserTie, FaUserShield } from "react-icons/fa";
import { Loading } from "../../../components/Loading/Loading";
import { useAuth } from "../../../hooks/useAuth";

export const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = user.email;

  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Make ${user.name} a ${newRole}?`,
      imageUrl: user.photo, // 👈 User's profile photo
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: user.name,
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
          refetch();
          Swal.fire("Updated!", `${user.name} is now a ${newRole}.`, "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to update role.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading message="Fetching data..." />;
  if (isError) return <p>Failed to load users.</p>;

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Manage Users
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-teal-200">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th className="text-center">Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id} className="hover:bg-teal-100">
                <td>{i + 1}</td>
                <td className="flex items-center gap-3">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td className="capitalize text-center">{user.role}</td>
                <td className="space-x-2 flex justify-center">
                  {email !== user.email && (
                    <>
                      {user.role !== "seller" && (
                        <button
                          className="btn btn-sm bg-teal-500 text-white"
                          onClick={() => handleRoleChange(user, "seller")}
                        >
                          <FaUserTie className="mr-1" /> Make Seller
                        </button>
                      )}
                      {user.role !== "admin" && (
                        <button
                          className="btn btn-sm bg-emerald-600 text-white"
                          onClick={() => handleRoleChange(user, "admin")}
                        >
                          <FaUserShield className="mr-1" /> Make Admin
                        </button>
                      )}
                      {(user.role === "seller" || user.role === "admin") && (
                        <button
                          className="btn btn-sm bg-gray-600 text-white"
                          onClick={() => handleRoleChange(user, "user")}
                        >
                          <FaUser className="mr-1" /> Make User
                        </button>
                      )}{" "}
                    </>
                  )}
                  {email === user.email && (
                    <p className="text-center">You Not Change Your Own Role</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
