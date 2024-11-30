import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import { usePermissions } from "../utils/PermissionsContext";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const {updatePermissions} = usePermissions(); // Use permissions context

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jui",
      email: "jui@abc.com",
      password: "abc@123",
      role: 'user',
      permissions:{
        handleAddRow: false,
        handleDelete: false,
        handleProcessRowUpdate:false,
      }
    },
    {
      id: 2,
      name: "Gayatri",
      email: "gayatri@abc.com",
      password: "admin@123",
      role:'admin',
      permissions:{
        handleAddRow: true,
        handleDelete: true,
        handleProcessRowUpdate:true,
      }
    },
    {
      id: 3,
      name: "Gayu",
      email: "gayu@abc.com",
      password: "123",
      role:'user',
      permissions:{
        handleAddRow: true,
        handleDelete: true,
        handleProcessRowUpdate:true,
      }
    },
  ]);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {

// Store permissions globally using context
updatePermissions(user.permissions);
localStorage.setItem("permissions", JSON.stringify(user.permissions)); // Save permissions to localStorage
setError("");
      navigate("/Home"); // Change this to your home route
    } else {
      setError("Invalid username or password.");
    }
    if ( !email || !password) {
        setError("All fields are required for Login");
        return;
      }
  };
  const handleSignUp = (e) => {
    e.preventDefault();

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setError("Email already registered. please login");
      return;
    }

    if (!name || !email || !password) {
      setError("All fields are required for Sign Up");
      return;
    }

    // Add new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setError("");
    alert("Sign Up successful! Please login with your new credentials.");
    setIsSignUp(false); // Switch to login after successful signup
  };

  return (
    <div>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignUp ? "SignUp" : "Login"}
          </Typography>
          {error && (
            <Typography color="red" variant="body1">
              {error}
            </Typography>
          )}
          {isSignUp && (
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            {isSignUp ? "SignUp" : "Login"}
          </Button>
          <Button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(""); // Clear errors when switching mode
            }}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Change to {isSignUp ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
