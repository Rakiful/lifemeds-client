import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { Processing } from "../../components/Processing/Processing";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { FaEnvelope } from "react-icons/fa";
import { Loading } from "../../components/Loading/Loading";

export const Profile = () => {
  const { user, userProfileUpdate, changeUserPassword } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [previewImage, setPreviewImage] = useState(null);
  const [activeForm, setActiveForm] = useState(null);

  const [processingProfile, setProcessingProfile] = useState(false);
  const [processingPassword, setProcessingPassword] = useState(false);

  // Fetch fresh user from DB
  const {
    data: userData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
  } = useForm({
    defaultValues: {
      name: "",
      nickName: "",
      gender: "",
      country: "",
      address: "",
      language: "",
      timezone: "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm();

  useEffect(() => {
    if (userData) {
      resetProfile({
        name: userData.name || "",
        nickName: userData.nickName || "",
        gender: userData.gender || "",
        country: userData.country || "",
        address: userData.address || "",
        language: userData.language || "",
        timezone: userData.timezone || "",
      });
    }
  }, [userData, resetProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const onUpdateProfile = async (data) => {
    try {
      setProcessingProfile(true);

      if (!data.name && !data.photo?.length) {
        Swal.fire("Info", "No changes to update", "info");
        return;
      }

      let imageUrl = userData?.photo;
      if (data.photo && data.photo[0]) {
        imageUrl = await uploadToCloudinary(data.photo[0]);
      }

      await userProfileUpdate({
        displayName: data.name || userData?.name,
        photoURL: imageUrl,
      });

      await axiosSecure.patch(`/users/${userData._id}`, {
        name: data.name || userData?.name,
        nickName: data.nickName || userData?.nickName,
        gender: data.gender || userData?.gender,
        country: data.country || userData?.country,
        address: data.address || userData?.address,
        language: data.language || userData?.language,
        timezone: data.timezone || userData?.timezone,
        photo: imageUrl,
      });

      Swal.fire("Success!", "Profile updated successfully!", "success");
      refetch();
      resetProfile();
      setPreviewImage(null);
      setActiveForm(null);
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setProcessingProfile(false);
    }
  };

  const onChangePassword = async (data) => {
    if (data.oldPassword === data.newPassword) {
      Swal.fire("Error", "Old and new password cannot be the same", "error");
      return;
    }

    try {
      setProcessingPassword(true);
      await changeUserPassword(data.oldPassword, data.newPassword);
      Swal.fire("Success!", "Password changed successfully!", "success");
      resetPassword();
      setActiveForm(null);
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setProcessingPassword(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="h-full mx-auto p-6 bg-gray-50 rounded-xl shadow flex flex-col justify-between">
      {processingProfile || (processingPassword && <Processing />)}
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
          My Profile
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 rounded-2xl mx-auto" />
      </div>
      {/* Top Section: Avatar + User Info + Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
        <div className="flex items-center gap-4">
          <img
            src={previewImage || userData?.photo || "/default-avatar.png"}
            alt="Profile"
            className="w-22 h-22 p-2 rounded-full object-cover shadow"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              {userData?.name}
            </h2>
            <p className="text-gray-600">{userData?.email}</p>
            <p className="text-gray-400 text-sm">
              Joined: {new Date(userData?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {activeForm !== "profile" && (
            <button
              className="btn bg-teal-500 text-white  btn-sm"
              onClick={() => setActiveForm("profile")}
            >
              Edit Profile
            </button>
          )}
          {activeForm !== "password" && (
            <button
              className="btn bg-teal-500 text-white  btn-sm"
              onClick={() => setActiveForm("password")}
            >
              Change Password
            </button>
          )}
          {activeForm && (
            <button
              className="btn btn-sm bg-red-600 text-white"
              onClick={() => {
                setActiveForm(null);
                setPreviewImage(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Middle Section: Profile Info */}
      <div className="bg-white shadow rounded-2xl p-6 space-y-4 h-full">
        {activeForm !== "profile" && activeForm !== "password" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900">
            <p className="bg-teal-50 p-3 rounded-xl">
              <strong>Full Name:</strong> {userData?.name || "-"}
            </p>
            <p className="bg-teal-50 p-3 rounded-xl">
              <strong>Nick Name:</strong> {userData?.nickName || "-"}
            </p>
            <p className="bg-teal-50 p-3 rounded-xl">
              <strong>Gender:</strong> {userData?.gender || "-"}
            </p>
            <p className="bg-teal-50 p-3 rounded-xl">
              <strong>Country:</strong> {userData?.country || "-"}
            </p>
            <p className="bg-teal-50 p-3 rounded-xl">
              <strong>Address:</strong> {userData?.address || "-"}
            </p>
            <p className="bg-teal-50 p-3 rounded-xl">
              <strong>Language:</strong> {userData?.language || "-"}
            </p>
            <p className="bg-teal-50 p-3 rounded-xl">
              <strong>Time Zone:</strong> {userData?.timezone || "-"}
            </p>
          </div>
        )}

        {/* Profile Edit Form */}
        {activeForm === "profile" && (
          <form
            onSubmit={handleProfileSubmit(onUpdateProfile)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              {...registerProfile("name")}
              placeholder="Full Name"
              className="input w-full bg-teal-50"
            />
            <input
              {...registerProfile("nickName")}
              placeholder="Nick Name"
              className="input input-bordered w-full"
            />
            <select
              {...registerProfile("gender")}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              {...registerProfile("country")}
              placeholder="Country"
              className="input input-bordered w-full"
            />
            <input
              {...registerProfile("address")}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <input
              {...registerProfile("language")}
              placeholder="Language"
              className="input input-bordered w-full"
            />
            <input
              {...registerProfile("timezone")}
              placeholder="Time Zone"
              className="input input-bordered w-full"
            />
            <input
              type="file"
              {...registerProfile("photo")}
              onChange={(e) => {
                registerProfile("photo").onChange(e);
                handleImageChange(e);
              }}
              className="file-input file-input-bordered w-full col-span-2"
            />
            <button
              type="submit"
              className="btn bg-teal-500 text-white w-full col-span-2"
              disabled={processingProfile}
            >
              {processingProfile ? "Updating..." : "Update Profile"}
            </button>
          </form>
        )}

        {/* Password Form */}
        {activeForm === "password" && (
          <form
            onSubmit={handlePasswordSubmit(onChangePassword)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <input
                type="password"
                {...registerPassword("oldPassword", {
                  required: "Old password is required",
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                    message:
                      "Password must be at least 6 characters, include uppercase, lowercase, and a number",
                  },
                })}
                placeholder="Old Password"
                className="input input-bordered w-full"
              />
              {passwordErrors.oldPassword && (
                <p className="text-red-500 text-sm mt-2 col-span-2">
                  {passwordErrors.oldPassword.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...registerPassword("newPassword", {
                  required: "New password is required",
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                    message:
                      "Password must be at least 6 characters, include uppercase, lowercase, and a number",
                  },
                })}
                placeholder="New Password"
                className="input input-bordered w-full"
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-sm mt-2 col-span-2">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-teal-500 text-white w-full col-span-2"
              disabled={processingPassword}
            >
              {processingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        )}
      </div>

      {/* Bottom Section: Email */}
      <div className="mt-4 flex items-center gap-2 bg-white p-4 rounded-lg shadow">
        <FaEnvelope className="text-teal-500" />
        <p className="font-semibold">{userData?.email}</p>
      </div>
    </div>
  );
};
