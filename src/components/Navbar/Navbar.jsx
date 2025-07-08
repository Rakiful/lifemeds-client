import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";
import { LifeMeds } from "../LifeMeds/LifeMeds";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar z-50 bg-base-100 sticky top-0 transition-all duration-300 ${
        isScrolled ? "shadow-sm py-2" : "py-4"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <LifeMeds />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <Link to="/cart" className="btn btn-ghost btn-circle">
          <FaShoppingCart className="text-xl" />
        </Link>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-outline flex items-center gap-1"
          >
            <IoGlobeOutline />{" "}
            <span className="hidden md:inline">Language</span>
            <MdKeyboardArrowDown />
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
            <li>
              <button>English</button>
            </li>
            <li>
              <button>বাংলা</button>
            </li>
          </ul>
        </div>

        <Link to="/auth" className="btn text-white bg-[#1EAA96]">
          Join Us
        </Link>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-9 rounded-full">
              <img src="https://i.pravatar.cc/300" alt="User" />
            </div>
          </div>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link to="/update-profile">Update Profile</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
