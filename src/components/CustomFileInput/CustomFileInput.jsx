import React, { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";

export const CustomFileInput = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <label className="block font-bold mb-1">Add Your Profile Photo</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center gap-2 bg-teal-500 text-white px-4 py-3 rounded-full hover:bg-teal-600 transition"
        >
          <FaImage className="text-white" />
          Choose File
        </button>
        <span className="text-sm text-gray-600">{fileName}</span>
      </div>
      {/* Hidden actual input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
