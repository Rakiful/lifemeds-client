import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaHome } from "react-icons/fa";
import { LifeMeds } from "../components/LifeMeds/LifeMeds";
import { useUserRole } from "../hooks/useUserRole";
import { Processing } from "../components/Processing/Processing";

export const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open">
      {roleLoading && <Processing />}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        <div className="min-h-[95vh] md:border border-teal-500 m-2 md:m-5 shadow-teal-200 md:shadow-2xl rounded-xl">
          {/* Page content here */}
          <Outlet></Outlet>
          {/* Page content here */}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-teal-500 text-white min-h-full w-[70%] lg:w-80 p-4">
          {/* Sidebar content here */}
          <div className="w-50 p-5">
            <LifeMeds />
          </div>
          <li className="font-bold text-md">
            <NavLink to="/dashboard">
              <FaHome className="inline-block mr-2" />
              Home
            </NavLink>
          </li>

          {/* Admin Links */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin/all-users">
                  <FaHome className="inline-block mr-2" />
                  All users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/all-category">
                  <FaHome className="inline-block mr-2" />
                  All Category
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};