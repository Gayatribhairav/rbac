import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for storing user permissions
const PermissionsContext = createContext();

export const usePermissions = () => {
  return useContext(PermissionsContext);
};

export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    // Load permissions from localStorage (or from wherever you store them)
    const storedPermissions = JSON.parse(localStorage.getItem("permissions"));
    if (storedPermissions) {
      setPermissions(storedPermissions);
    }
  }, []);

  const updatePermissions = (newPermissions) => {
    setPermissions(newPermissions);
    localStorage.setItem("permissions", JSON.stringify(newPermissions));
  };

  return (
    <PermissionsContext.Provider value={{ permissions, updatePermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};
