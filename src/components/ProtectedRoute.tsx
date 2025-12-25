import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAdminLoggedIn") === "true";

  if (!isAuthenticated) {
    // اگر لاگین نکرده، به صفحه ورود هدایت شود
    return <Navigate to="/login" replace />;
  }

  // اگر لاگین کرده، صفحه فرزند را نمایش بده
  return <>{children}</>;
};

export default ProtectedRoute;
