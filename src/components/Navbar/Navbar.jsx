import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import { Link } from "react-router";
import { LifeMeds } from "../LifeMeds/LifeMeds";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useUserRole } from "../../hooks/useUserRole";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
  const { user, signOutUser } = useAuth();
  const { role } = useUserRole();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: cartCount = 0, refetch } = useQuery({
    queryKey: ["cartCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/cart/count/${user.email}`);
      const data = await res.json();
      return data.count;
    },
  });

  const handleLogOut = () => {
    signOutUser().then((resp) => {
      window.location.reload();
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">{t("nav.home")}</NavLink>
      </li>
      <li>
        <NavLink to="/shop">{t("nav.shop")}</NavLink>
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
        <Link to={"/"} className="w-32">
          <LifeMeds />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-4">
        {user && (
          <Link to="/cart" className="relative">
            <p className="absolute right-0 -mt-3 -mr-1 text-[11px] w-5 text-white bg-red-500 p-1 rounded-full flex justify-center">
              {cartCount}
            </p>
            <FaShoppingCart className="text-3xl " />
          </Link>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm cursor-none btn-outline flex items-center gap-1"
          >
            <IoGlobeOutline />{" "}
            <span className="hidden md:inline">
              <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="pe-5"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </span>
          </div>
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 border border-teal-500 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/xJ0gL3k/default-avatar.png"
                  }
                  alt="User"
                />
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link to="/dashboard/profile">Update Profile</Link>
              </li>
              <li>
                <Link to={`/dashboard/${role}`}>Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/auth" className="btn text-white bg-teal-500">
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};
