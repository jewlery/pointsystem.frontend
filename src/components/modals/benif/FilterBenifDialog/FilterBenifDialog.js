import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    FormControl,
    InputLabel, MenuItem,
} from '@mui/material';
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";

const FilterBenifDialog = ({ open, onClose, onSubmitFilter }) => {
    const [filterData, setFilterData] = useState({
        date_from: '',
        date_to: '',
        article: '',
        montant_min: '',  // Changed to montant_min
        montant_max: '',  // Changed to montant_max
        type_reglement: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilterData({
            ...filterData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        onSubmitFilter(filterData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filtrer les Bénéfices</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Veuillez entrer les critères pour filtrer les bénéfices.
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
                        id="article"
                        label="Article"
                        type="text"
                        fullWidth
                        name="article"
                        value={filterData.article}
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
                            label="Type de Règlement"
                            value={filterData.type_reglement}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            <MenuItem value="carte">Carte</MenuItem>
                            <MenuItem value="espece">Espèce</MenuItem>
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

export default FilterBenifDialog;
