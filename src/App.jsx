import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./components/home";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home2 from "./components/Error";
import { PermissionsProvider } from "./utils/PermissionsContext";

const App = () => {
  return (
    <PermissionsProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/rbac" element={<Login />} />
          {/* Protected Route - Home */}
          <Route
            path="/rbac/home"
          //   element={
          // <ProtectedRoute
            element={<Home />}
            permissionsRequired={[
              "handleAddRow",
              "handleDelete",
              "handleProcessRowUpdate",
            ]} // Example of required permissions
          />
            {/* }
            /> */}
          {/* <Route path="/rbac/Home2" element={<Home2 />} /> */}
        </Routes>
      </Router>
    </PermissionsProvider>
  );
};

export default App;
