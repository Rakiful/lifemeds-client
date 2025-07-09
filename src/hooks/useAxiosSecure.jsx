import React from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";


const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const useAxiosSecure = () => {
  const { user, signOutUser, setLoading } = useAuth() ;
  const navigate = useNavigate();

  axiosInstance.interceptors.request.use((config) => {
    const token = user?.accessToken || null;
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  // response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("Error in interceptor", error);
      if (error.status === 401 || error.status === 403) {
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
              }, 5000);
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