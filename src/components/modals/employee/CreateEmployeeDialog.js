import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    TextField,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createEmployee } from 'src/store/apps/employee/employeeSlice';
import { IconPlus } from '@tabler/icons';

const CreateEmployeeDialog = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        UserID: '',
        RegistrationNumber: '',
        Qualification: '',
        CompanyID: '',
        StartHour: '',
        EndHour: '',
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            UserID: '',
            RegistrationNumber: '',
            Qualification: '',
            CompanyID: '',
            StartHour: '',
            EndHour: '',
        });
        setErrors({});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.UserID) newErrors.UserID = 'User ID is required';
        if (!formData.RegistrationNumber) newErrors.RegistrationNumber = 'Registration Number is required';
        if (!formData.Qualification) newErrors.Qualification = 'Qualification is required';
        if (!formData.CompanyID) newErrors.CompanyID = 'Company ID is required';
        if (!formData.StartHour) newErrors.StartHour = 'Start Hour is required';
        if (!formData.EndHour) newErrors.EndHour = 'End Hour is required';
        if (formData.StartHour && formData.EndHour && new Date(formData.EndHour) <= new Date(formData.StartHour)) {
            newErrors.EndHour = 'End Hour must be after Start Hour';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                await dispatch(createEmployee(formData)).unwrap();
                handleClose();
            } catch (error) {
                console.error('Failed to create employee:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
                startIcon={<IconPlus />}
                sx={{
                    width: { xs: 'auto', md: '175px' },
                    '& .MuiButton-startIcon': {
                        marginRight: { xs: 0, sm: 0, md: '8px' },
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: { xs: 'none', md: 'inline' },
                        whiteSpace: 'nowrap',
                    }}
                >
                    Create Employee
                </Box>
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to create a new employee.
                    </DialogContentText>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            label="User ID"
                            name="UserID"
                            value={formData.UserID}
                            onChange={handleChange}
                            margin="normal"
                            error={!!errors.UserID}
                            helperText={errors.UserID}
                        />
                        <TextField
                            fullWidth
                            label="Registration Number"
                            name="RegistrationNumber"
                            value={formData.RegistrationNumber}
                            onChange={handleChange}
                            margin="normal"
                            error={!!errors.RegistrationNumber}
                            helperText={errors.RegistrationNumber}
                        />
                        <TextField
                            fullWidth
                            label="Qualification"
                            name="Qualification"
                            value={formData.Qualification}
                            onChange={handleChange}
                            margin="normal"
                            error={!!errors.Qualification}
                            helperText={errors.Qualification}
                        />
                        <TextField
                            fullWidth
                            label="Company ID"
                            name="CompanyID"
                            value={formData.CompanyID}
                            onChange={handleChange}
                            margin="normal"
                            error={!!errors.CompanyID}
                            helperText={errors.CompanyID}
                        />
                        <TextField
                            fullWidth
                            label="Start Hour"
                            name="StartHour"
                            type="time"
                            value={formData.StartHour}
                            onChange={handleChange}
                            margin="normal"
                            error={!!errors.StartHour}
                            helperText={errors.StartHour}
                        />
                        <TextField
                            fullWidth
                            label="End Hour"
                            name="EndHour"
                            type="time"
                            value={formData.EndHour}
                            onChange={handleChange}
                            margin="normal"
                            error={!!errors.EndHour}
                            helperText={errors.EndHour}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateEmployeeDialog;