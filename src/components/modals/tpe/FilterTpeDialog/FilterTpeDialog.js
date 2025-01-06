import React, { useState, useEffect} from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Autocomplete
} from '@mui/material';
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {fetchClients, selectClients} from "../../../../store/apps/client/clientSlice";

const TYPE_LIST = [
    'Achat',
    'Avance'
];

const FilterTpeDialog = ({ open, handleClose, applyFilters }) => {
    const CLIENTS_LIST = useSelector(selectClients);
    const loading = useSelector((state) => state.clientReducer.loading);
    const dispatch = useDispatch();
    const [filterData, setFilterData] = useState({
        date_from: '',
        date_to: '',
        code_sl: '',
        clients: '',
        nom_produit: '',
        montant_min: '',
        montant_max: '',
        type: ''
    });


    useEffect(() => {
        // Fetch clients when the component is mounted
        dispatch(fetchClients());
    }, [open]);

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
            date_from: '',
            date_to: '',
            code_sl: '',
            clients: '',
            nom_produit: '',
            montant_min: '',
            montant_max: '',
            type: ''
        });
        applyFilters({}); // Clear filters in parent component
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Filtrer les TPE</DialogTitle>
            <DialogContent>
                <Box mt={2}>
                    <CustomTextField
                        margin="dense"
                        id="date_from"
                        label="Date From"
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
                        label="Date To"
                        type="date"
                        fullWidth
                        name="date_to"
                        value={filterData.date_to}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <CustomTextField
                        margin="dense"
                        id="code_sl"
                        label="Code SL"
                        fullWidth
                        name="code_sl"
                        value={filterData.code_sl}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <Autocomplete
                            freeSolo
                            fullWidth
                            loading={loading}
                            id="clients-autocomplete"
                            disableClearable
                            options={CLIENTS_LIST.map((option) => option.name + " N(" + option.id + ")")}
                            onChange={(event, newValue) => setFilterData({ ...filterData, clients: newValue })}
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
                        id="nom_produit"
                        label="Nom de Produit"
                        fullWidth
                        name="nom_produit"
                        value={filterData.nom_produit}
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
                        <InputLabel>Type</InputLabel>
                        <CustomSelect
                            name="type"
                            label="Type"
                            value={filterData.type}
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
                <Button color="error" onClick={handleClear}>Effacer</Button>
                <Button onClick={handleSubmit}>Filtrer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterTpeDialog;
