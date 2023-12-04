import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

function CustomerDialog({ customer, handleChange }) {
  return (
    <DialogContent>
      <TextField
        margin="dense"
        label="First Name"
        name="firstname"
        fullWidth
        variant="standard"
        value={customer.firstname}
        onChange={handleChange}
        color="error"
      />
      <TextField
        margin="dense"
        label="Last Name"
        name="lastname"
        fullWidth
        variant="standard"
        value={customer.lastname}
        onChange={handleChange}
        color="error"
      />
      <TextField
        margin="dense"
        label="Email"
        name="email"
        fullWidth
        variant="standard"
        value={customer.email}
        onChange={handleChange}
        color="error"
      />
      <TextField
        margin="dense"
        label="Phone"
        name="phone"
        fullWidth
        variant="standard"
        value={customer.phone}
        onChange={handleChange}
        color="error"
      />
  
      <TextField
        margin="dense"
        label="City"
        name="city"
        fullWidth
        variant="standard"
        value={customer.city}
        onChange={handleChange}
        color="error"
      />
      <TextField
        margin="dense"
        label="Street Address"
        name="streetaddress"
        fullWidth
        variant="standard"
        value={customer.streetaddress}
        onChange={handleChange}
        color="error"
      />
      <TextField
        margin="dense"
        label="Postcode"
        name="postcode"
        fullWidth
        variant="standard"
        value={customer.postcode}
        onChange={handleChange}
        color="error"
      />
    </DialogContent>
  );
}

export default CustomerDialog;