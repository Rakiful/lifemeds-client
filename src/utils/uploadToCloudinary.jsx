import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio_preset");
  formData.append("folder", "life-meds/UserImages");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dlpwuq4a6/image/upload",
    formData
  );
  return res.data.secure_url;
};
