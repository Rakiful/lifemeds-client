import React from "react";
import { motion } from "framer-motion";

// Example logos (replace with your actual logos)
const logos = [
  "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Logo_of_Robi_Axiata.svg/1200px-Logo_of_Robi_Axiata.svg.png",
  "https://cdn.prod.website-files.com/628a20f8bd44e7d42b9fa39b/633432fed1074494e21c7409_Bkash-logo.png",
  "https://d2u0ktu8omkpf6.cloudfront.net/50c6b1d160cc92a3906bf3ddd49e7133c887f205363e5075.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpPVpbZLU2NDdFf12bGhPlzuBrbkThiHNLgw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeoxgRSwAZhlsrtTk0tIewQXnJtsfTjIGadQ&s",
  "https://images.seeklogo.com/logo-png/45/2/pran-logo-png_seeklogo-453765.png",
];

// Duplicate logos for seamless loop
const logosLoop = [...logos, ...logos,...logos,...logos,...logos,...logos,...logos];

export const PartnersSection = () => {
  return (
    <div className="my-12 py-8">
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold ">
          Our Trusted Partners
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8 w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {logosLoop.map((logo, idx) => (
            <div
              key={idx}
              className="flex-none w-32 h-20 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Partner ${idx + 1}`}
                className="max-h-16 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
