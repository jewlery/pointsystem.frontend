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
    InputLabel, Autocomplete
} from '@mui/material';
import {IconPlus} from "@tabler/icons";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {updateCredit} from 'src/store/apps/client-credit/clientCreditSlice';
import moment from "moment";
import {fetchClients, selectClients} from "../../../../store/apps/client/clientSlice";

const EditClientCreditDialog = ({open, onClose, creditData}) => {
    const dispatch = useDispatch();
    const CLIENTS_LIST = useSelector(selectClients);
    const [formData, setFormData] = useState({
        date: '',
        designation: '',
        montant: '',
        type_reglement: '',
        type: '',
        client_name: '',
        client_id: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch clients when the component is mounted
        dispatch(fetchClients());
    }, [open]);

    useEffect(() => {
        if (open && creditData) {
            setFormData({
                date: creditData.date || '',
                designation: creditData.designation || '',
                montant: creditData.montant || '',
                type_reglement: creditData.type_reglement || '',
                type: creditData.type || '',
                client_name: creditData.client_name || '',
                client_id: creditData.client_id || ''
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
        setLoading(false);
        onClose();
        setFormData({
            date: '',
            designation: '',
            montant: '',
            type_reglement: '',
            type: '',
            client_name: ''
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
        if (!formData.client_name) newErrors.client_name = 'Nom is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                await dispatch(updateCredit({id: creditData.id, creditData: formData}));
                handleClose();
                setLoading(false);
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
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
                            <InputLabel>Statut de paiement</InputLabel>
                            <CustomSelect
                                name="type"
                                label="Type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <MenuItem value="paid">Payé</MenuItem>
                                <MenuItem value="unpaid">Impayé</MenuItem>
                            </CustomSelect>
                            {errors.type && <Box color="error.main" mt={1}>{errors.type}</Box>}
                        </FormControl>

                        <FormControl fullWidth margin="dense">
                            <Autocomplete
                                freeSolo
                                fullWidth
                                loading={loading}
                                id="clients-autocomplete"
                                disableClearable

                                options={CLIENTS_LIST.map((option) => ({
                                    label: `${option.name} N(${option.id})`,
                                    id: option.id
                                }))}
                                onChange={(event, newValue) => setFormData({
                                    ...formData, client_name: newValue.label,
                                    client_id: newValue.id
                                })}
                                value={formData.client_name}
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        placeholder="Sélectionner un client"
                                        aria-label="Sélectionner un client"
                                        inputProps={{
                                            ...params.inputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
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

export default EditClientCreditDialog;
