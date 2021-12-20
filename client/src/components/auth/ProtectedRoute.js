import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isLogin, checkLogin } = useAuth();
  const location = useLocation();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    checkLogin();
    setloading(true);
  }, [checkLogin]);

  return loading ? (
    isLogin ? (
      <Navigate to="/" state={{ from: location }} />
    ) : (
      <Outlet />
    )
  ) : (
    <h1>Loading...</h1>
  );
};
