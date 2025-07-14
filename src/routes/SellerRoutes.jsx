import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { useUserRole } from "../hooks/useUserRole";
import { Processing } from "../components/Processing/Processing";

export const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Processing />;
  }
  console.log("🧪 Checking role:", user?.email, "Role is:", role);

  if (!user || role !== "seller") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};
