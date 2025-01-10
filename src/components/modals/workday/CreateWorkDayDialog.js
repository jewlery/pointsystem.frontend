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
    CircularProgress,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createWorkDay } from 'src/store/apps/workday/workdaySlice';
import CustomSelect from '../../forms/theme-elements/CustomSelect';

const CreateWorkDayDialog = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        dayType: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            date: '',
            dayType: ''
        });
        setErrors({});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.dayType) newErrors.dayType = 'Day type is required';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            await dispatch(createWorkDay(formData));
            handleClose();
        } catch (error) {
            console.error('Failed to create workday:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create Work Day
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Work Day</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new work day, please enter the date and select the day type.
                    </DialogContentText>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="date"
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            error={!!errors.date}
                            helperText={errors.date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl fullWidth margin="normal" error={!!errors.dayType}>
                            <InputLabel id="dayType-label">Day Type</InputLabel>
                            <CustomSelect
                                labelId="dayType-label"
                                id="dayType"
                                name="dayType"
                                value={formData.dayType}
                                onChange={handleChange}
                            >
                                <MenuItem value="workday">Workday</MenuItem>
                                <MenuItem value="holiday">Holiday</MenuItem>
                                <MenuItem value="weekend">Weekend</MenuItem>
                            </CustomSelect>
                            {errors.dayType && <p style={{ color: 'red' }}>{errors.dayType}</p>}
                        </FormControl>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Create'}
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateWorkDayDialog;