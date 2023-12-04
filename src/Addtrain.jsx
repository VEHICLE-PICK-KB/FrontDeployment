import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AddTraining({ fetchTrainings, fetchCustomers }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: null,
  });

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomersList();
  }, []);

  const fetchCustomersList = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((error) => console.error(error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleCustomerChange = (event, newValue) => {
    setSelectedCustomer(newValue);
  };

  const localToUTC = (localDate) => {
    const utcDate = new Date(localDate);
    return new Date(utcDate.toUTCString());
  };

  const utcToLocal = (utcDate) => {
    const localDate = new Date(utcDate);
    return new Date(localDate.toLocaleString());
  };

  const saveTraining = () => {
    if (selectedCustomer) {
      const utcDate = localToUTC(training.date);
      fetch("https://traineeapp.azurewebsites.net/api/trainings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: utcDate.toISOString(),
          duration: training.duration,
          activity: training.activity,
          customer: selectedCustomer.links[0].href,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const localDate = utcToLocal(data.date);
          fetchTrainings();
          handleClose();

          setTraining({
            date: "",
            duration: "",
            activity: "",
            customer: null,
          });
          setSelectedCustomer(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button variant="outlined" color="error" onClick={handleClickOpen} style={{ marginTop: "20px" }}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" height="100%">
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            color="error"
            type="datetime-local"
            onChange={inputChanged}
            label="Date"
            name="date"
            value={training.date}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: '16px', marginTop: '16px' }}
          />
          <TextField
            color="error"
            type="number"
            onChange={inputChanged}
            label="Duration (minutes)"
            name="duration"
            value={training.duration}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            color="error"
            type="text"
            onChange={inputChanged}
            label="Activity"
            name="activity"
            value={training.activity}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
            onChange={handleCustomerChange}
            renderInput={(params) => (
              <TextField {...params} label="Customer" fullWidth color="error"/>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={saveTraining} color="error">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;