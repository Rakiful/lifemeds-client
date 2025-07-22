import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { useUserRole } from "../hooks/useUserRole";
import { Processing } from "../components/Processing/Processing";

export const UserRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Processing />;
  }

  if (!user || role !== "user") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};
