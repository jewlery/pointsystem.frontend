import React, { useState } from 'react';
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
    InputLabel
} from '@mui/material';
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";

const FilterCreditDialog = ({ open, onClose, onSubmitFilter }) => {
    const [filterData, setFilterData] = useState({
        date_from: '',
        date_to: '',
        designation: '',
        montant_min: '',
        montant_max: '',
        type_reglement: '',
        type: '',
        nom: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilterData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Pass the filter data to the parent component
        onSubmitFilter(filterData);
        onClose(); // Close the dialog after submission
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filtrer les Crédits</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Veuillez entrer les critères pour filtrer les crédits.
                </DialogContentText>
                <Box mt={2}>
                    <CustomTextField
                        margin="dense"
                        id="date_from"
                        label="Date De"
                        type="date"
                        fullWidth
                        name="date_from"
                        value={filterData.date_from}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <CustomTextField
                        margin="dense"
                        id="date_to"
                        label="Date À"
                        type="date"
                        fullWidth
                        name="date_to"
                        value={filterData.date_to}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <CustomTextField
                        margin="dense"
                        id="designation"
                        label="Désignation"
                        type="text"
                        fullWidth
                        name="designation"
                        value={filterData.designation}
                        onChange={handleChange}
                    />

                    <CustomTextField
                        margin="dense"
                        id="montant_min"
                        label="Montant Min"
                        type="number"
                        fullWidth
                        name="montant_min"
                        value={filterData.montant_min}
                        onChange={handleChange}
                    />

                    <CustomTextField
                        margin="dense"
                        id="montant_max"
                        label="Montant Max"
                        type="number"
                        fullWidth
                        name="montant_max"
                        value={filterData.montant_max}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type de Règlement</InputLabel>
                        <CustomSelect
                            name="type_reglement"
                            value={filterData.type_reglement}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            <MenuItem value="carte">Carte</MenuItem>
                            <MenuItem value="espece">Espèce</MenuItem>
                            <MenuItem value="cheque">Chèque</MenuItem>
                        </CustomSelect>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type</InputLabel>
                        <CustomSelect
                            name="type"
                            value={filterData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            <MenuItem value="Apport">Apport</MenuItem>
                            <MenuItem value="Credit">Crédit</MenuItem>
                        </CustomSelect>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Nom</InputLabel>
                        <CustomSelect
                            name="nom"
                            value={filterData.nom}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            <MenuItem value="alpha">Alpha</MenuItem>
                            <MenuItem value="haj">Haj</MenuItem>
                        </CustomSelect>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>Annuler</Button>
                <Button onClick={handleSubmit}>Appliquer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterCreditDialog;
