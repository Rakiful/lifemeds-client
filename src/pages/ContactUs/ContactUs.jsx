import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We'll get back to you soon.",
      timer: 2000,
      showConfirmButton: false,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-16 px-4 rounded-2xl mb-10">
      <Helmet>
        <title>Contact Us | LifeMeds</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl text-center lg:text-4xl text-teal-700 font-bold">
            Contact Us
          </h1>
          <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-teal-700 border-2 rounded-2xl mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-teal-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full pl-12 pr-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-teal-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="5"
                  className="w-full px-4 py-3 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaPaperPlane /> Send Message
              </button>
            </div>

            {/* Contact Info Cards */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                <FaPhone className="text-2xl text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <p className="text-sm text-gray-600">+880 1858167083</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                <FaEnvelope className="text-2xl text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">support@lifemeds.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                <FaMapMarkerAlt className="text-2xl text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-700">Address</p>
                  <p className="text-sm text-gray-600">
                    Chittagong, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-md"
              >
                {/* Background Circle */}
                <circle cx="200" cy="200" r="150" fill="#E0F2F1" opacity="0.5" />
                
                {/* Envelope */}
                <rect x="120" y="160" width="160" height="120" rx="8" fill="white" stroke="#14B8A6" strokeWidth="3" />
                <path d="M120 160 L200 220 L280 160" stroke="#14B8A6" strokeWidth="3" fill="none" />
                <line x1="120" y1="160" x2="200" y2="220" stroke="#14B8A6" strokeWidth="3" />
                <line x1="280" y1="160" x2="200" y2="220" stroke="#14B8A6" strokeWidth="3" />
                
                {/* Person */}
                <circle cx="200" cy="120" r="25" fill="#FFAB00" />
                <rect x="180" y="145" width="40" height="60" rx="5" fill="#FFAB00" />
                <rect x="175" y="175" width="15" height="50" fill="#FFAB00" />
                <rect x="210" y="175" width="15" height="50" fill="#FFAB00" />
                
                {/* Decorative elements */}
                <circle cx="80" cy="100" r="8" fill="#14B8A6" opacity="0.3" />
                <circle cx="320" cy="130" r="12" fill="#FFAB00" opacity="0.3" />
                <circle cx="90" cy="300" r="10" fill="#14B8A6" opacity="0.3" />
                <circle cx="310" cy="280" r="8" fill="#FFAB00" opacity="0.3" />
                
                {/* Phone icon */}
                <g transform="translate(300, 80)">
                  <path d="M0 0 L10 10" stroke="#14B8A6" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="8" r="8" stroke="#14B8A6" strokeWidth="2" fill="none" />
                </g>
                
                {/* Email icon */}
                <g transform="translate(60, 180)">
                  <rect width="30" height="20" rx="3" stroke="#FFAB00" strokeWidth="2" fill="none" />
                  <path d="M0 0 L15 10 L30 0" stroke="#FFAB00" strokeWidth="2" fill="none" />
                </g>
                
                {/* Wavy lines */}
                <path d="M350 200 Q355 195 360 200 Q365 205 370 200" stroke="#14B8A6" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M30 250 Q35 245 40 250 Q45 255 50 250" stroke="#FFAB00" strokeWidth="2" fill="none" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};