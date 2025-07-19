import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaCreditCard,
  FaCapsules,
  FaBullhorn,
  FaUsersCog,
  FaMoneyCheckAlt,
  FaListAlt,
  FaAd,
  FaChartBar,
} from "react-icons/fa";
import { LifeMeds } from "../components/LifeMeds/LifeMeds";
import { useUserRole } from "../hooks/useUserRole";

export const DashboardLayout = () => {
  const { role } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        <div className="min-h-[95vh] md:border border-teal-500 m-2 md:m-5 shadow-teal-200 md:shadow-2xl rounded-xl">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-teal-500 text-white min-h-full w-[70%] lg:w-80 p-4">
          <Link to={"/"} className="w-50 p-5">
            <LifeMeds />
          </Link>

          <li className="font-bold text-md">
            <NavLink to={`/dashboard/${role}`}>
              <FaHome className="inline-block mr-2" />
              Home
            </NavLink>
          </li>

          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/user/payment-history">
                  <FaCreditCard className="inline-block mr-2" />
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          {role === "seller" && (
            <>
              <li>
                <NavLink to="/dashboard/seller/manage-medicines">
                  <FaCapsules className="inline-block mr-2" />
                  Manage Medicines
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/seller/payment-history">
                  <FaCreditCard className="inline-block mr-2" />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/seller/ask-advertisement">
                  <FaBullhorn className="inline-block mr-2" />
                  Ask For Advertisement
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin/manage-users">
                  <FaUsersCog className="inline-block mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/payment-management">
                  <FaMoneyCheckAlt className="inline-block mr-2" />
                  Payment Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-category">
                  <FaListAlt className="inline-block mr-2" />
                  Manage Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-advertisement">
                  <FaAd className="inline-block mr-2" />
                  Manage Advertisement
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/sales-report">
                  <FaChartBar className="inline-block mr-2" />
                  Sales Report
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};