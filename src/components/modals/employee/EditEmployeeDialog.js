import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    TextField,
    CircularProgress,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateEmployee } from 'src/store/apps/employee/employeeSlice';

const EditEmployeeDialog = ({ open, onClose, employeeData }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userID: '',
        registrationNumber: '',
        qualification: '',
        companyID: '',
        startHour: '',
        endHour: '',
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (employeeData) {
            setFormData({
                userID: employeeData.UserID,
                registrationNumber: employeeData.RegistrationNumber,
                qualification: employeeData.Qualification,
                companyID: employeeData.CompanyID,
                startHour: employeeData.StartHour,
                endHour: employeeData.EndHour,
            });
        }
    }, [employeeData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.userID) newErrors.userID = 'User ID is required';
        if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration Number is required';
        if (!formData.qualification) newErrors.qualification = 'Qualification is required';
        if (!formData.companyID) newErrors.companyID = 'Company ID is required';
        if (!formData.startHour) newErrors.startHour = 'Start Hour is required';
        if (!formData.endHour) newErrors.endHour = 'End Hour is required';
        if (formData.startHour && formData.endHour && new Date(formData.endHour) <= new Date(formData.startHour)) {
            newErrors.endHour = 'End Hour must be after Start Hour';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                await dispatch(updateEmployee({ ...formData, id: employeeData.ID })).unwrap();
                onClose();
            } catch (error) {
                console.error('Failed to update employee:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please update the form below to edit the employee details.
                </DialogContentText>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        label="User ID"
                        name="userID"
                        value={formData.userID}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.userID}
                        helperText={errors.userID}
                    />
                    <TextField
                        fullWidth
                        label="Registration Number"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.registrationNumber}
                        helperText={errors.registrationNumber}
                    />
                    <TextField
                        fullWidth
                        label="Qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.qualification}
                        helperText={errors.qualification}
                    />
                    <TextField
                        fullWidth
                        label="Company ID"
                        name="companyID"
                        value={formData.companyID}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.companyID}
                        helperText={errors.companyID}
                    />
                    <TextField
                        fullWidth
                        label="Start Hour"
                        name="startHour"
                        type="time"
                        value={formData.startHour}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.startHour}
                        helperText={errors.startHour}
                    />
                    <TextField
                        fullWidth
                        label="End Hour"
                        name="endHour"
                        type="time"
                        value={formData.endHour}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.endHour}
                        helperText={errors.endHour}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEmployeeDialog;