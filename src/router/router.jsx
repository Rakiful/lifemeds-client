import React from "react";
import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { PrivateRoutes } from "../routes/PrivateRoutes";
import { ManageUsers } from "../pages/Dashboard/Admin/ManageUsers";
import { AdminRoute } from "../routes/AdminRoutes";
import { Forbidden } from "../components/Forbidden/Forbidden";
import { SellerRoute } from "../routes/SellerRoutes";
import { ManageMedicines } from "../pages/Dashboard/Seller/ManageMedicines/ManageMedicines";
import { Shop } from "../pages/Shop/Shop";
import { Cart } from "../pages/Cart/Cart";
import { Checkout } from "../pages/Checkout/Checkout";
import { Invoice } from "../pages/Invoice/Invoice";
import { PaymentManagement } from "../pages/Dashboard/Admin/PaymentManagement";
import { PaymentHistory } from "../pages/Dashboard/Seller/PaymentHistory";
import { UserRoutes } from "../routes/UserRoutes";
import { UserPaymentHistory } from "../pages/Dashboard/User/UserPaymentHistory";
import { ManageCategory } from "../pages/Dashboard/Admin/ManageCategory";
import { AskAdvertisement } from "../pages/Dashboard/Seller/AskAdvertisement";
import { ManageAdvertisement } from "../pages/Dashboard/Admin/ManageAdvertisement";
import { Category } from "../pages/Category/Category";
import { SalesReport } from "../pages/Dashboard/Admin/SalesReport";
import { AdminHome } from "../pages/Dashboard/Admin/AdminHome";
import { SellerHome } from "../pages/Dashboard/Seller/SellerHome";
import { UserHome } from "../pages/Dashboard/User/UserHome";
import { Errorpage } from "../components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "/invoice",
        element: (
          <PrivateRoutes>
            <Invoice />
          </PrivateRoutes>
        ),
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
        element: <AdminHome />,
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/payment-management",
        element: (
          <AdminRoute>
            <PaymentManagement />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-category",
        element: (
          <AdminRoute>
            <ManageCategory />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-advertisement",
        element: (
          <AdminRoute>
            <ManageAdvertisement />
          </AdminRoute>
        ),
      },
      {
        path: "admin/sales-report",
        element: (
          <AdminRoute>
            <SalesReport />
          </AdminRoute>
        ),
      },
      {
        path: "seller",
        element: <SellerHome />,
      },
      {
        path: "seller/manage-medicines",
        element: (
          <SellerRoute>
            <ManageMedicines />
          </SellerRoute>
        ),
      },
      {
        path: "seller/payment-history",
        element: (
          <SellerRoute>
            <PaymentHistory />
          </SellerRoute>
        ),
      },
      {
        path: "seller/ask-advertisement",
        element: (
          <SellerRoute>
            <AskAdvertisement />
          </SellerRoute>
        ),
      },
      {
        path: "user",
        element: <UserHome />,
      },
      {
        path: "user/payment-history",
        element: (
          <UserRoutes>
            <UserPaymentHistory />
          </UserRoutes>
        ),
      },
    ],
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
]);
