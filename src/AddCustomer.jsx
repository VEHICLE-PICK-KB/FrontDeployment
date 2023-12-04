import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerDialog from './CustomerDialog';

const AddCustomer = ({ fetchCustomers }) => {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const saveCustomer = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error when adding customer: ' + response.statusText);
        fetchCustomers();
        setCustomer({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          streetaddress: '',
          postcode: '',
          city: ''
        }); 
      })
      .catch((err) => console.error(err));

    handleClose();
  };

  return (
    <div style={{ position: 'absolute', top: '177px', right: '160px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Button variant="outlined" color="error" onClick={handleClickOpen} style={{ marginBottom: '10px' }}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={saveCustomer} color="error">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCustomer;