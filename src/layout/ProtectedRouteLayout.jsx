import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRouteLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRouteLayout;
