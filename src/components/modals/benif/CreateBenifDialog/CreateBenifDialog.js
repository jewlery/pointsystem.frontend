import React from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
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
} from '@mui/material';
import { IconPlus } from "@tabler/icons";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import { createBenif } from '../../../../store/apps/benif/benifSlice'; // Import your action creator

const CreateBenifDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        date: '',
        article: '',
        montant: '',
        type_reglement: ''
    });

    const dispatch = useDispatch(); // Initialize useDispatch

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.date || !formData.article || !formData.montant || !formData.type_reglement) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        try {
            // Dispatch the createBenefit action
            await dispatch(createBenif(formData)).unwrap(); // unwrap() is used to handle the promise
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
                startIcon={<IconPlus />}
                sx={{
                    width: { xs: 'auto', md: '175px' }, // Add responsive styling for icon margin
                    '& .MuiButton-startIcon': {
                        marginRight: { xs: 0, sm: 0, md: '8px' }, // Remove margin on small screens
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: { xs: 'none', md: 'inline' }, // Hide text on extra-small screens
                        whiteSpace: 'nowrap',
                    }}
                >
                    Créer un benif
                </Box>
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Créer un Bénéfice</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer les détails pour créer un bénéfice.
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
                            id="article"
                            label="Article"
                            type="text"
                            fullWidth
                            name="article"
                            value={formData.article}
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
                            <InputLabel>Type de Règlement</InputLabel>
                            <CustomSelect
                                name="type_reglement"
                                label="Type de Règlement"
                                value={formData.type_reglement}
                                onChange={handleChange}
                            >
                                <MenuItem value="carte">Carte</MenuItem>
                                <MenuItem value="espece">Espèce</MenuItem>
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

export default CreateBenifDialog;
