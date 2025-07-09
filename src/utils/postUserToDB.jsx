import axios from "axios";
import React from "react";

export const postUserToDB = () => {
  const uploadUserToDB = async (user) => {
    try {
      const response = await axios.post("http://localhost:3000/users", user);
      return response.data;
    } catch (err) {
      console.log(
        "uploadUserToDB failed:",
        err.response?.data || err.message
      );
      throw err; // Rethrow so SocialLogin.jsx can catch it
    }
  };

  return uploadUserToDB;
};
