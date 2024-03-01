import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../../../store/AppContext";

const AuthRoute = ({ children }) => {
  const { loggedIn, user, verifyingToken } = useContext(AppContext);
  // const location = useLocation();
  // const previousUrl = location.state?.from;
  if (verifyingToken) {
    return <></>;
  }

  if (!loggedIn) {
    return children;
  }
  if (loggedIn && !verifyingToken) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  return children;
};

export default AuthRoute;
