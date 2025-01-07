import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUser } from 'src/store/apps/users/userSlice';

const EditUserDialog = ({ open, onClose, userData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: userData?.ID || '',
    firstName: userData?.FirstName || '',
    lastName: userData?.LastName || '',
    username: userData?.Username || '',
    password: '',
    role: userData?.Role || 'employee',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.ID,
        firstName: userData.FirstName,
        lastName: userData.LastName,
        username: userData.Username,
        password: '',
        role: userData.Role,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateUser({id: formData.id, userData: formData}));
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
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
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