import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Autocomplete
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateDevice } from 'src/store/apps/device/deviceSlice';
import { selectCompanies } from 'src/store/apps/company/companySlice';

const EditDeviceDialog = ({ open, onClose, deviceData }) => {
    const [formData, setFormData] = useState({ ...deviceData });
    const [companies, setCompanies] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
         selectCompanies().then((data) => {
            setCompanies(data);
        });
    }, [dispatch]);

    const handleSubmit = async () => {
        try {
            await dispatch(updateDevice({ id: deviceData.ID, deviceData: formData })).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to update device:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Device</DialogTitle>
            <DialogContent>
                <TextField
                    label="Serial Number"
                    value={formData.SerialNumber}
                    disabled
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Name"
                    value={formData.Name}
                    onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Autocomplete
                    options={companies}
                    getOptionLabel={(option) => option.companyName}
                    value={companies.find(c => c.id === formData.CompanyID) || null}
                    onChange={(_, newValue) => setFormData({ ...formData, CompanyID: newValue?.id })}
                    renderInput={(params) => <TextField {...params} label="Company" margin="normal" />}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDeviceDialog;