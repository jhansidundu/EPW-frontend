import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../../../store/AppContext";

const AuthRoute = ({ children }) => {
  const { loggedIn } = useContext(AppContext);
  const location = useLocation();
  const previousUrl = location.state?.from;
  console.log(previousUrl);

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthRoute;
