import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    MenuItem,
    FormControl,
    InputLabel, Autocomplete
} from '@mui/material';
import { IconEdit } from "@tabler/icons";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import { updateTpe } from '../../../../store/apps/tpe/tpeSlice';
import moment from "moment";
import {fetchClients, selectClients} from "../../../../store/apps/client/clientSlice";

const CLIENTS_LIST = [
    'Client A',
    'Client B',
    'Client C'
    // Add more clients as needed
];

const TYPE_LIST = [
    'Achat',
    'Avance'
    // Add more types as needed
];

const EditTpeDialog = ({ open, handleClose, tpe }) => {
    const CLIENTS_LIST = useSelector(selectClients);
    const loading = useSelector((state) => state.clientReducer.loading);
    const [formData, setFormData] = React.useState(tpe);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch clients when the component is mounted
        dispatch(fetchClients());
    }, [open]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await dispatch(updateTpe({id: tpe.id, updatedTpe: formData})).unwrap(); // unwrap() is used to handle the promise
            handleClose(); // Close the dialog
        } catch (error) {
            console.error('Failed to submit form data:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modifier une TPE</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Veuillez entrer les détails pour modifier une TPE.
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <CustomTextField
                        margin="dense"
                        id="codeSL"
                        label="Code de SL"
                        fullWidth
                        name="codeSL"
                        value={formData.codeSL}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <Autocomplete
                            freeSolo
                            fullWidth
                            loading={loading}
                            id="clients-autocomplete"
                            disableClearable
                            options={CLIENTS_LIST.map((option) => `${option.name} N(${option.id})`)}
                            value={formData.clients}
                            onChange={(event, newValue) => setFormData({ ...formData, clients: newValue })}
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

                    <CustomTextField
                        margin="dense"
                        id="nomProduit"
                        label="Nom de Produit"
                        fullWidth
                        name="nomProduit"
                        value={formData.nomProduit}
                        onChange={handleChange}
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
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type</InputLabel>
                        <CustomSelect
                            name="type"
                            label="Type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            {TYPE_LIST.map(type => (
                                <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                            ))}
                        </CustomSelect>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>Annuler</Button>
                <Button onClick={handleSubmit}>Soumettre</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTpeDialog;
