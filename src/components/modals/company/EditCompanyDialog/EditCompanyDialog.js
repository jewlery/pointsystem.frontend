import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCompany } from '../../../store/apps/company/companySlice';

const EditCompanyDialog = ({ open, onClose, companyData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ companyName: '' });

  useEffect(() => {
    if (companyData) {
      setFormData({ companyName: companyData.companyName });
    }
  }, [companyData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.companyName.trim() === '') {
      alert('Company name cannot be empty');
      return;
    }
    dispatch(updateCompany({ id: companyData.id, ...formData }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Company</DialogTitle>
      <DialogContent>
        <TextField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditCompanyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  companyData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
  }),
};

export default EditCompanyDialog;
