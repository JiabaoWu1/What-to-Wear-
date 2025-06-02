import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}
