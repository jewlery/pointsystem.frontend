import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUser } from 'src/store/apps/users/userSlice';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';

const EditUserDialog = ({ open, onClose, userData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ID: userData?.ID || '',
    FirstName: userData?.FirstName || '',
    LastName: userData?.LastName || '',
    Username: userData?.Username || '',
    Password: '',
    role: userData?.Role || 'employee',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        ID: userData.ID,
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Username: userData.Username,
        Password: '',
        Role: userData.Role,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateUser({ id: formData.ID, userData: formData }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="Username"
          value={formData.Username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="Password"
          type="Password"
          value={formData.Password}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Role</InputLabel>
          <CustomSelect
            fullWidth
            name="Role"
            label="Role"
            value={formData.Role}
            onChange={handleChange}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </CustomSelect>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;