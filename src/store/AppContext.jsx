import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isTokenValid } from "../services/api/endpoints/auth.api";
import { findExamStatusList } from "../services/api/endpoints/exam.api";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(true);
  const [user, setUser] = useState({ role: "", username: "" });
  const [_, setLoaderCount] = useState(0);
  const [examStatusList, setExamStatusList] = useState([]);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      showLoader();
      await isTokenValid();

      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");
      if (!!username && !!role) {
        setLoggedIn(true);
        setUser({ username, role });
      } else {
        handleLogout();
      }
    } catch (err) {
      handleAPIError(err);
    } finally {
      hideLoader();
      setVerifyingToken(false);
    }
  };
  const getExamStatusList = async () => {
    try {
      showLoader();
      const response = await findExamStatusList();
      setExamStatusList(response.data);
    } catch (e) {
      handleAPIError(e);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    if (
      !(
        location.pathname.match(/^\/student\/enroll\/(.+)$/) ||
        location.pathname.match(/^\/student\/verify\/(.+)$/) ||
        location.pathname.match(/^\/teacher\/verify\/(.+)$/)
      )
    ) {
      validateToken();
    }
    getExamStatusList();
  }, []);

  const setLoginState = (data) => {
    if (data) {
      setLoggedIn(true);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      setUser({ role: data.role, username: data.username });
    }
  };

  const handleLogout = () => {
    // remove accessToken
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("selectedSidebar");
    setLoggedIn(false);
    setUser({ role: "", username: "" });
    const PATH_NAMES = [
      "/",
      "/teacher/login",
      "/teacher/signup",
      "/student/signup",
      "/student/login",
      "/admin/login",
    ];
    if (PATH_NAMES.includes(location.pathname)) {
      navigate(location.pathname);
    } else {
      navigate("/");
    }
  };

  const showLoader = () => {
    if (!isLoading) setLoading(true);
    setLoaderCount((prev) => prev + 1);
  };

  const hideLoader = () => {
    setLoaderCount((prev) => {
      if (prev === 0) return prev;
      if (prev === 1) {
        setLoading(false);
      }
      return prev - 1;
    });
  };

  const handleAPIError = (err) => {
    if (err.response?.status === 401) {
      handleLogout();
      hideLoader();
    } else if (err?.response?.status === 403) {
      alert(err.response.data.message);
    } else if (err?.response?.status === 400) {
      alert(err.response.data.message);
    } else {
      alert("Unknown Error");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loggedIn,
        verifyingToken,
        setLoggedIn,
        showLoader,
        hideLoader,
        isLoading,
        handleAPIError,
        setLoginState,
        handleLogout,
        examStatusList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
