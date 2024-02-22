import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../services/api/endpoints/auth.api";
import { findExamStatusList } from "../services/api/endpoints/exam.api";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
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
    validateToken();
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
    navigate("/");
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

      // handleShowToast("Session has timed out!", true);
    } else if (err?.response?.status === 403) {
      // handleShowToast("Access denied!", true);
    } else if (err?.response?.status === 400) {
      // handleShowToast(err.response?.data?.message, true);
    } else {
      // handleShowToast("Unknown Error", true);
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
