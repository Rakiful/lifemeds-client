import React from "react";
import { Helmet } from "react-helmet-async";
import { FaTwitter, FaFacebook, FaInstagram, FaCapsules } from "react-icons/fa";
import { CountUpSection } from "../Home/CountUpSection";

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Us | LifeMeds</title>
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 py-20 px-4 rounded-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <FaCapsules className="text-3xl text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                  ABOUT US
                </h1>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  LifeMeds started as a small online pharmacy with a mission to make quality healthcare accessible to everyone. We recognized the challenges people face in obtaining affordable medicines and decided to bridge that gap.
                </p>
                <p>
                  Currently, we offer a comprehensive range of medicines, health products, and wellness items to help our customers maintain their health seamlessly and conveniently. We value our customers above everything else, meaning that we won't settle for anything less than excellence in service.
                </p>
                <p>
                  Our platform combines cutting-edge technology with compassionate care, ensuring that every customer receives personalized attention and the best possible service. We believe in transparency, quality, and trust.
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 mt-8">
                <a href="https://x.com" target="blank" className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center transition-all">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="https://facebook.com" target="blank" className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center transition-all">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="https://instagram.com" target="blank" className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center transition-all">
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>

            {/* Right - Image with Frame */}
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Decorative Frame */}
                <div className="absolute inset-0 border-4 border-teal-500 rounded-lg transform translate-x-4 translate-y-4"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=800&fit=crop"
                    alt="Healthcare Professional"
                    className="w-full h-[500px] object-cover"
                  />
                  
                  {/* Overlay with pills decoration */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900/80 to-transparent p-6">
                    <div className="flex items-center gap-2">
                      <FaCapsules className="text-white text-2xl" />
                      <p className="text-white font-semibold">Healthcare Excellence</p>
                    </div>
                  </div>
                </div>

                {/* Floating Pills Icon */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <FaCapsules className="text-3xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <CountUpSection />

      {/* Mission & Vision */}
      <div className="pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-teal-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-teal-700 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide accessible, affordable, and reliable healthcare solutions to every individual. We strive to eliminate barriers in accessing quality medicines and health products through innovative technology and exceptional service.
              </p>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-teal-700 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become the most trusted online pharmacy platform, transforming the way people access healthcare. We envision a future where quality healthcare is just a click away for everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl mb-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCapsules className="text-3xl" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Quality</h4>
              <p className="text-white/90">We ensure every product meets the highest quality standards</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCapsules className="text-3xl" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Trust</h4>
              <p className="text-white/90">Building lasting relationships through transparency and integrity</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCapsules className="text-3xl" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Care</h4>
              <p className="text-white/90">Putting customer health and wellbeing at the center of everything</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};