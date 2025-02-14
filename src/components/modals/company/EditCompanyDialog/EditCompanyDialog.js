import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCompany } from '../../../../store/apps/company/companySlice';

const EditCompanyDialog = ({ open, onClose, companyData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ CompanyName: '' });

  useEffect(() => {
    if (companyData) {
      setFormData({ CompanyName: companyData.CompanyName });
    }
  }, [companyData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.CompanyName.trim() === '') {
      alert('Company name cannot be empty');
      return;
    }
    dispatch(updateCompany({ id: companyData.ID, companyData: formData }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Company</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="CompanyName"
          label="Company Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.CompanyName}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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
  companyData: PropTypes.object,
};

export default EditCompanyDialog;