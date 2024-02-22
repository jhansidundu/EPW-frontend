import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { ALLOWED_ROUTES } from "../../../util/constants";

const ProtectedRoute = ({ children }) => {
  const { loggedIn, user, verifyingToken } = useContext(AppContext);
  const location = useLocation();
  const isAuthorized = () => {
    const allowedRoutes = ALLOWED_ROUTES.get(user.role);
    if (allowedRoutes) {
      for (const route of allowedRoutes) {
        if (typeof route === "string") {
          if (route === location.pathname && loggedIn) return true;
        } else {
          if (location.pathname.match(route) && loggedIn) return true;
        }
      }
    }
    return false;
  };

  return verifyingToken ? (
    <></>
  ) : isAuthorized() ? (
    children
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default ProtectedRoute;
