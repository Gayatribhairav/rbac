import React, { useState, useEffect } from "react";
import { Box, Button,Snackbar, Alert, Slide } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Home = () => {
  // Initial data for the DataGrid
  const [rows, setRows] = useState([
    { id: 1, name: "Jui", email: "jui@abc.com" },
    { id: 2, name: "Gayatri", email: "gayatri@abc.com" },
  ]);

  const [newRowId, setNewRowId] = useState(rows.length + 1);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("error");

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true, // Enables inline editing
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true, // Enables inline editing
    },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 1,
    //   editable: true, // Enables inline editing
    // },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Button 
        size="small"
          color="error"
          variant="contained"
          onClick={() => handleDelete(params.id)}
        >
          Delete
        </Button>
      ),
    
      sortable: false,
      filterable: false,
    },
  ];

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const permissions = JSON.parse(localStorage.getItem("permissions")) || []

  const showSnackbar = (message, severity = "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Handle row updates
  const handleProcessRowUpdate = (newRow) => {
    if(!permissions.handleProcessRowUpdate){
      // setSnackbarOpen(true);
      // setSnackbarSeverity("error");
      showSnackbar("This role has no access, only read access");
      // toast.error("This role has no access, only read access");
    return;
  }
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
  };

  // 1. Load data from localStorage when the component mounts
  useEffect(() => {
    const savedRows = JSON.parse(localStorage.getItem("rows"));
    if (savedRows) {
      setRows(savedRows);
      setNewRowId(savedRows.length > 0 ? savedRows[savedRows.length - 1].id + 1 : 1);
    }
  }, []);

  // 2. Save rows to localStorage whenever they change
  const saveDataToLocalStorage = () => {
    localStorage.setItem("rows", JSON.stringify(rows));
    alert("Data saved!");
  };

  // Handle adding a new row
  const handleAddRow = () => {
    if(!permissions.handleAddRow){
      // setSnackbarOpen(true);
      // setSnackbarSeverity("error");
      showSnackbar("This role has no access, only read access");
      // toast.error("This role has no access, only read access");
      return;
    }
    const newRow = {
      id: newRowId,
      name: "",
      email: "",
      role: "",
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setNewRowId((prevId) => prevId + 1);
  };

  // Handle deleting a row
  const handleDelete = (id) => {
    if(!permissions.handleDelete){
      // setSnackbarOpen(true);
      // setSnackbarSeverity("error");
      showSnackbar("This role has no access, only read access");
      // toast.error("This role has no access, only read access");
      return;
    }
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

//  const handleSave = ()=> {
// setRows((prevRows)=> )
//  };

  return (
    <Box
      sx={{
        height: 400,
        width: "80%",
        margin: "auto",
        marginTop: 5,
      }}
    >
      <Button size="small"
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={handleAddRow}
      >
        Add New Row
      </Button>
      <Button
      sx={{ marginBottom: 2, marginLeft:2 }} size="small"
       variant="contained" color="success" onClick={saveDataToLocalStorage}>
          Save Data
        </Button>

      <DataGrid 
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        editMode="row"
        processRowUpdate={handleProcessRowUpdate}
        // density="compact"
       />

        {/* <Slide direction="top" in={snackbarOpen} mountOnEnter unmountOnExit> */}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{
              position: "fixed",
              top: "90%",
            }}
          >
            <Alert
              elevation={15}
              variant="filled"
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        {/* </Slide> */}
    </Box>
  );
};

export default Home;
