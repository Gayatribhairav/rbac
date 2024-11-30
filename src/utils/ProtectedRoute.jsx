import React from "react";
import { Route, Navigate } from "react-router-dom";
import { usePermissions } from "./PermissionsContext";
import Error from "../components/Error";

const ProtectedRoute = ({ element, permissionsRequired, ...props }) => {
  const { permissions } = usePermissions();

  if (!permissions) {
    // User is not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  const hasPermission = permissionsRequired.every(permission =>
    permissions[permission]
  );

  if (!hasPermission) {
    // User doesn't have the required permissions, show an error or redirect
    return <Navigate to="/Home" />;
  }

 // If all checks pass, render the protected element
 return element;
};

export default ProtectedRoute;
