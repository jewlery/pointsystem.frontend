import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Grid,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";

const TYPES_LIST = [
    'Type 10',
    'Type 20',
    // Add more types as needed
];

const FilterLuiseDialog = ({ open, handleClose, applyFilters }) => {
    const [filterData, setFilterData] = useState({
        piece: '',
        type: '',
        nombreMin: '',
        nombreMax: '',
        prix_achat_totalMin: '',
        prix_achat_totalMax: '',
        prix_achatMin: '',
        prix_achatMax: '',
        prix_vente_unitaireMin: '',
        prix_vente_unitaireMax: '',
        date_venteFrom: '',
        date_venteTo: '',
        prix_venteMin: '',
        prix_venteMax: '',
        beneficeMin: '',
        beneficeMax: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilterData({
            ...filterData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        applyFilters(filterData); // Pass filter data to parent component
        handleClose();
    };

    const handleClear = () => {
        setFilterData({
            piece: '',
            type: '',
            nombreMin: '',
            nombreMax: '',
            prix_achat_totalMin: '',
            prix_achat_totalMax: '',
            prix_achatMin: '',
            prix_achatMax: '',
            prix_vente_unitaireMin: '',
            prix_vente_unitaireMax: '',
            date_venteFrom: '',
            date_venteTo: '',
            prix_venteMin: '',
            prix_venteMax: '',
            beneficeMin: '',
            beneficeMax: ''
        });
        applyFilters({}); // Clear filters in parent component
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Filtrer la Luise</DialogTitle>
            <DialogContent>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                margin="dense"
                                id="piece"
                                label="Pièce"
                                fullWidth
                                name="piece"
                                value={filterData.piece}
                                onChange={handleChange}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Type</InputLabel>
                                <CustomSelect
                                    name="type"
                                    label="Type"
                                    value={filterData.type}
                                    onChange={handleChange}
                                >
                                    {TYPES_LIST.map(type => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </CustomSelect>
                            </FormControl>
                            <CustomTextField
                                margin="dense"
                                id="nombreMin"
                                label="Nombre Min"
                                type="number"
                                fullWidth
                                name="nombreMin"
                                value={filterData.nombreMin}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="nombreMax"
                                label="Nombre Max"
                                type="number"
                                fullWidth
                                name="nombreMax"
                                value={filterData.nombreMax}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="prix_achat_totalMin"
                                label="Prix d'achat total Min"
                                type="number"
                                fullWidth
                                name="prix_achat_totalMin"
                                value={filterData.prix_achat_totalMin}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="prix_achat_totalMax"
                                label="Prix d'achat total Max"
                                type="number"
                                fullWidth
                                name="prix_achat_totalMax"
                                value={filterData.prix_achat_totalMax}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="prix_achatMin"
                                label="Prix d'achat Min"
                                type="number"
                                fullWidth
                                name="prix_achatMin"
                                value={filterData.prix_achatMin}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="prix_achatMax"
                                label="Prix d'achat Max"
                                type="number"
                                fullWidth
                                name="prix_achatMax"
                                value={filterData.prix_achatMax}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                margin="dense"
                                id="prix_vente_unitaireMin"
                                label="Prix de vente unitaire Min"
                                type="number"
                                fullWidth
                                name="prix_vente_unitaireMin"
                                value={filterData.prix_vente_unitaireMin}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="prix_vente_unitaireMax"
                                label="Prix de vente unitaire Max"
                                type="number"
                                fullWidth
                                name="prix_vente_unitaireMax"
                                value={filterData.prix_vente_unitaireMax}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="date_venteFrom"
                                label="Date vente From"
                                type="date"
                                fullWidth
                                name="date_venteFrom"
                                value={filterData.date_venteFrom}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            <CustomTextField
                                margin="dense"
                                id="date_venteTo"
                                label="Date vente To"
                                type="date"
                                fullWidth
                                name="date_venteTo"
                                value={filterData.date_venteTo}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            <CustomTextField
                                margin="dense"
                                id="prix_venteMin"
                                label="Prix de vente Min"
                                type="number"
                                fullWidth
                                name="prix_venteMin"
                                value={filterData.prix_venteMin}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="prix_venteMax"
                                label="Prix de vente Max"
                                type="number"
                                fullWidth
                                name="prix_venteMax"
                                value={filterData.prix_venteMax}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="beneficeMin"
                                label="Bénéfice Min"
                                type="number"
                                fullWidth
                                name="beneficeMin"
                                value={filterData.beneficeMin}
                                onChange={handleChange}
                            />
                            <CustomTextField
                                margin="dense"
                                id="beneficeMax"
                                label="Bénéfice Max"
                                type="number"
                                fullWidth
                                name="beneficeMax"
                                value={filterData.beneficeMax}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClear}>Effacer</Button>
                <Button onClick={handleSubmit}>Filtrer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterLuiseDialog;
