import { Navigate } from "react-router-dom";
import { routes } from "../config";
import { decodeJWT } from "../constants/utils";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to={routes.home} />;
  }
  return children;
};
