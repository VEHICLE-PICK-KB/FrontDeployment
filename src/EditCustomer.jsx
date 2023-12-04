import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerDialog from './CustomerDialog';

function EditCustomer({ fetchCustomers, data }) {
  const [link, setLink] = React.useState();
  const [customer, setCustomer] = useState({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    city: data.city,
    streetaddress: data.streetaddress,
    postcode: data.postcode,
    link: data.links[0].href
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
    fetch(customer.link, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phone: customer.phone,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        
      }),
      
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error when editing customer: ' + response.statusText);
        fetchCustomers();
      })
      .catch((err) => console.error(err));
  
    handleClose();
  };

  return (
    <div>
      <Button size="small" color="error" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={saveCustomer} color="error">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCustomer;