import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // destructure isLoggedIn from the value provided by the CurrentUserContext
  const { isLoggedIn } = useContext(CurrentUserContext);

  // if user not logged in, redirect to the home page
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // or render the protected route's child component
  return children;
}
