import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch
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
    InputLabel, CircularProgress, Autocomplete
} from '@mui/material';
import {IconPlus} from "@tabler/icons";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {createTpe} from '../../../../store/apps/tpe/tpeSlice'; // Import the createTpe action
import {fetchClients, selectClients} from '../../../../store/apps/client/clientSlice';


const TYPE_LIST = [
    'Achat',
    'Avance'
    // Add more types as needed
];

const CreateTpeDialog = () => {
    const [open, setOpen] = React.useState(false);
    const CLIENTS_LIST = useSelector(selectClients);
    const loading = useSelector((state) => state.clientReducer.loading);
    const error = useSelector((state) => state.clientReducer.error);
    const [formData, setFormData] = React.useState({
        date: '',
        codeSL: '',
        clients: '',
        nomProduit: '',
        montant: '',
        type: ''
    });

    const dispatch = useDispatch(); // Initialize useDispatch

    useEffect(() => {
        // Fetch clients when the component is mounted
        dispatch(fetchClients());
    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.date || !formData.codeSL || !formData.clients || !formData.nomProduit || !formData.montant || !formData.type) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        try {
            // Dispatch the createTpe action
            await dispatch(createTpe(formData)).unwrap(); // unwrap() is used to handle the promise
            handleClose(); // Close the dialog
        } catch (error) {
            console.error('Failed to submit form data:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
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
                    width: {xs: 'auto', md: '175px'}, // Add responsive styling for icon margin
                    '& .MuiButton-startIcon': {
                        marginRight: {xs: 0, sm: 0, md: '8px'}, // Remove margin on small screens
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: {xs: 'none', md: 'inline'}, // Hide text on extra-small screens
                        whiteSpace: 'nowrap',
                    }}
                >
                    Créer un TPE
                </Box>
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Créer un TPE</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer les détails pour créer un TPE.
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
                                options={CLIENTS_LIST.map((option) => option.name + " N(" + option.id+ ")")}
                                onChange={(event, newValue) => setFormData({ ...formData, clients: newValue })}
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
        </>
    );
}

export default CreateTpeDialog;
