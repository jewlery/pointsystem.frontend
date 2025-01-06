import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    CircularProgress,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {IconPlus} from "@tabler/icons";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {useDispatch} from "react-redux";
import {updateCredit} from 'src/store/apps/credit/creditSlice';
import moment from "moment";

const EditCreditDialog = ({open, onClose, creditData}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        date: '',
        designation: '',
        montant: '',
        type_reglement: '',
        type: '',
        nom: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && creditData) {
            setFormData({
                date: creditData.date || '',
                designation: creditData.designation || '',
                montant: creditData.montant || '',
                type_reglement: creditData.type_reglement || '',
                type: creditData.type || '',
                nom: creditData.nom || ''
            });
        }
    }, [open, creditData]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleClose = () => {
        onClose();
        setFormData({
            date: '',
            designation: '',
            montant: '',
            type_reglement: '',
            type: '',
            nom: ''
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.designation) newErrors.designation = 'Designation is required';
        if (!formData.montant) newErrors.montant = 'Montant is required';
        if (!formData.type_reglement) newErrors.type_reglement = 'Type Règlement is required';
        if (!formData.type) newErrors.type = 'Type is required';
        if (!formData.nom) newErrors.nom = 'Nom is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                await dispatch(updateCredit({id: creditData.id, creditData: formData}));
                handleClose();
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier le Crédit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez modifier les détails du crédit.
                    </DialogContentText>
                    <Box mt={2}>
                        <CustomTextField
                            autoFocus
                            margin="dense"
                            id="date"
                            label="Date"
                            type="date"
                            fullWidth
                            name="date"
                            value={moment(formData.date).utc().format('yyyy-MM-DD')}
                            onChange={handleChange}
                            InputLabelProps={{shrink: true}}
                            error={!!errors.date}
                            helperText={errors.date}
                        />
                        <CustomTextField
                            margin="dense"
                            id="designation"
                            label="Designation"
                            type="text"
                            fullWidth
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            error={!!errors.designation}
                            helperText={errors.designation}
                        />
                        <CustomTextField
                            margin="dense"
                            id="montant"
                            label="Montant"
                            type="number"
                            fullWidth
                            name="montant"
                            value={formData.montant}
                            onChange={handleChange}
                            error={!!errors.montant}
                            helperText={errors.montant}
                        />

                        <FormControl fullWidth margin="dense" error={!!errors.type_reglement}>
                            <InputLabel htmlFor="typeReglement">Type Règlement</InputLabel>
                            <CustomSelect
                                name="type_reglement"
                                label="Type Règlement"
                                value={formData.type_reglement}
                                onChange={handleChange}
                                inputProps={{name: 'type_reglement', id: 'typeReglement'}}
                            >
                                <MenuItem value="carte">Carte</MenuItem>
                                <MenuItem value="espece">Espèce</MenuItem>
                                <MenuItem value="cheque">Chèque</MenuItem>
                            </CustomSelect>
                            {errors.type_reglement && <Box color="error.main" mt={1}>{errors.type_reglement}</Box>}
                        </FormControl>
                        <FormControl fullWidth margin="dense" error={!!errors.type}>
                            <InputLabel>Type</InputLabel>
                            <CustomSelect
                                name="type"
                                label="Type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <MenuItem value="Apport">Apport</MenuItem>
                                <MenuItem value="Credit">Crédit</MenuItem>
                            </CustomSelect>
                            {errors.type && <Box color="error.main" mt={1}>{errors.type}</Box>}
                        </FormControl>
                        <FormControl fullWidth margin="dense" error={!!errors.nom}>
                            <InputLabel>Nom</InputLabel>
                            <CustomSelect
                                name="nom"
                                label="Nom"
                                value={formData.nom}
                                onChange={handleChange}
                            >
                                <MenuItem value="alpha">Alpha</MenuItem>
                                <MenuItem value="haj">Haj</MenuItem>
                            </CustomSelect>
                            {errors.nom && <Box color="error.main" mt={1}>{errors.nom}</Box>}
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={24}/> : 'Soumettre'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditCreditDialog;
