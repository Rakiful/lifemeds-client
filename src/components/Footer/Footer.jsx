import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiGooglepay } from "react-icons/si";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="bg-teal-300 text-black pt-12 pb-6 rounded-2xl mb-3">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* My Account */}
        <div>
          <h3 className="text-xl font-bold mb-4">My Account</h3>
          <p className="text-sm mb-3">Subscribe to get health tips & offers</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded text-black bg-white"
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">Email: mdrakifulislamjoy@gmail.com</p>
          <p className="text-sm mb-2">Phone: +880 185 816 7083</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="mailto:mdrakifulislamjoy@gmail.com" className="hover:text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={"/"} className="hover:text-white">Home</Link></li>
            <li><Link to={"/"} className="hover:text-white">All Medicines</Link></li>
            <li><Link to={"/dashboard"} className="hover:text-white">Dashboard</Link></li>
            <li><Link to={"/"} className="hover:text-white">Blog</Link></li>
            <li><Link to={"/"} className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Payment Partners */}
        <div>
          <h3 className="text-xl font-bold mb-4">Payment Partners</h3>
          <div className="flex gap-4 text-3xl">
            <SiVisa />
            <SiMastercard />
            <SiPaypal />
            <SiGooglepay />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-800 text-sm border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} LifeMeds. All rights reserved.
      </div>
    </footer>
  );
};
