import React from "react";
import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { PrivateRoutes } from "../routes/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "admin",
        element: <Login />,
      },
      {
        path: "seller",
        element: <Register />,
      },
    ],
  },
]);
