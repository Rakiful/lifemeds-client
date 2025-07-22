import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export const useAxiosSecure = () => {
  const { signOutUser, setLoading } = useAuth();
  const navigate = useNavigate();

  axiosInstance.interceptors.request.use((config) => {
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log(error);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: `Session expired. Please log in again.`,
              icon: "error",
              showConfirmButton: true,
            }).then(() => {
              navigate("/");
              setTimeout(() => {
                window.location.reload();
              }, 10000);
            });
          })
          .catch((err) => console.error("Sign out error:", err));
        setLoading(false);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
