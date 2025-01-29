import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return (
      <div className="w-1/12 mx-auto flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else if (user && user?.role === "admin") {
    return <>{children}</>;
  }
};

export default AdminRoute;
