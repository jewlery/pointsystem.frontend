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
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateWorkDay } from 'src/store/apps/workday/workdaySlice';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import moment from 'moment';

const EditWorkDayDialog = ({ open, onClose, workdayData }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        date: '',
        dayType: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (workdayData) {
            setFormData({
                date: workdayData.date ? moment(workdayData.Date).utc().format('YYYY-MM-DD') : '',
                dayType: workdayData.dayType || ''
            });
        }
    }, [workdayData]);

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
        if (!formData.dayType) newErrors.dayType = 'Day Type is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                await dispatch(updateWorkDay({ id: workdayData.ID, workdayData: formData })).unwrap();
                onClose();
            } catch (error) {
                console.error('Failed to update workday:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit WorkDay</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please update the form below to edit the workday details.
                </DialogContentText>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        margin="dense"
                        id="date"
                        label="Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.date}
                        helperText={errors.date}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Day Type</InputLabel>
                        <CustomSelect
                            name="dayType"
                            value={formData.dayType}
                            onChange={handleChange}
                            error={!!errors.dayType}
                            helperText={errors.dayType}
                        >
                            <MenuItem value="workday">Workday</MenuItem>
                            <MenuItem value="free">Free</MenuItem>
                            <MenuItem value="holiday">Holiday</MenuItem>
                        </CustomSelect>
                    </FormControl>
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

export default EditWorkDayDialog;