import React, {useEffect} from 'react';
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
    FormControl,
    InputLabel,
    Select, CircularProgress, Autocomplete
} from '@mui/material';
import {IconPlus} from "@tabler/icons";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {createCredit} from 'src/store/apps/client-credit/clientCreditSlice';
import {fetchClients, selectClients} from "../../../../store/apps/client/clientSlice";

const CreateClientCreditDialog = () => {
    const dispatch = useDispatch();
    const CLIENTS_LIST = useSelector(selectClients);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        date: '',
        designation: '',
        montant: '',
        type_reglement: '',
        type: 'unpaid',
        client_name: ''
    });
    const [errors, setErrors] = React.useState({});

    useEffect(() => {
        // Fetch clients when the component is mounted
        dispatch(fetchClients());
    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(errors);
        setOpen(false);
        setLoading(false);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
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
        console.log(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                await dispatch(createCredit(formData)); // Assume onSubmit is a prop that handles API submission
                handleClose();
                setFormData({
                    date: '',
                    designation: '',
                    montant: '',
                    type_reglement: '',
                    type: '',
                    client_name: ''
                });
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
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
                startIcon={<IconPlus/>}
                sx={{
                    width: {xs: 'auto', md: '175px'},
                    '& .MuiButton-startIcon': {
                        marginRight: {xs: 0, sm: 0, md: '8px'},
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: {xs: 'none', md: 'inline'},
                        whiteSpace: 'nowrap',
                    }}
                >
                    Créer un Crédit
                </Box>
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Créer un Crédit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer les détails pour créer un crédit.
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
                            value={formData.date}
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
                                onChange={(event, newValue) => {
                                    setErrors({
                                        ...errors,
                                        ['client_name']: ''
                                    });
                                    setFormData({
                                        ...formData, client_name: newValue.label,
                                        client_id: newValue.id
                                    });
                                }}
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        placeholder="Sélectionner un client"
                                        aria-label="Sélectionner un client"
                                        inputprops={{
                                            ...params.inputprops,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />

                            {errors.client_name && <Box color="error.main" mt={1}>{errors.client_name}</Box>}
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSubmit} disabled={loading || Object.values(errors).filter((v) => v !== '').length > 0}>
                        {loading ? <CircularProgress size={24}/> : 'Soumettre'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateClientCreditDialog;
