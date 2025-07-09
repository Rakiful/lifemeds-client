import React from "react";
import { Navigate, useLocation } from "react-router";
import { Processing } from "../components/Processing/Processing";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Processing />;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to={"/auth"}></Navigate>;
  }

  return children;
};
