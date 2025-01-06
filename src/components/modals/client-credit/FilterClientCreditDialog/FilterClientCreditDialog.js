import React, { useState, useEffect } from 'react';
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
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {fetchClients, selectClients} from "../../../../store/apps/client/clientSlice";

const FilterClientCreditDialog = ({ open, onClose, onSubmitFilter }) => {
    const CLIENTS_LIST = useSelector(selectClients);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.clientReducer.loading);
    const [filterData, setFilterData] = useState({
        date_from: '',
        date_to: '',
        designation: '',
        montant_min: '',
        montant_max: '',
        type_reglement: '',
        type: '',
        client_name: '',
        client_id: ''
    });

    useEffect(() => {
        // Fetch clients when the component is mounted
        dispatch(fetchClients());
    }, [open]);

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
                            onChange={(event, newValue) => setFilterData({
                                ...filterData, client_name: newValue.label,
                                client_id: newValue.id
                            })}
                            value={filterData.client_name}
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
                <Button color="error" onClick={onClose}>Annuler</Button>
                <Button onClick={handleSubmit}>Appliquer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterClientCreditDialog;
