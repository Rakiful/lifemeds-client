import axios from "axios";
import React from "react";

export const postUserToDB = () => {
  const uploadUserToDB = async (user) => {
    try {
      const response = await axios.post(
        "https://life-meds-server.vercel.app/users",
        user
      );
      return response.data;
    } catch (err) {
      // console.log("uploadUserToDB failed:", err.response?.data || err.message);
      throw err;
    }
  };

  return uploadUserToDB;
};
