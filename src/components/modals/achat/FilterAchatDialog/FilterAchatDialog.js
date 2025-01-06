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
    InputLabel,
    Autocomplete,
} from '@mui/material';
import CustomTextField from '../../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../../forms/theme-elements/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, selectClients } from '../../../../store/apps/client/clientSlice';

const FilterAchatDialog = ({ open, onClose, onSubmitFilter }) => {
    const CLIENTS_LIST = useSelector(selectClients);
    const loadingClient = useSelector((state) => state.clientReducer.loading);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        date_from: '',
        date_to: '',
        designation: '',
        poids_min: '',
        poids_max: '',
        prix_ag_min: '',
        prix_ag_max: '',
        prix_total_min: '',
        prix_total_max: '',
        mode_reglement: '',
        client: '',
        type: '',
    });

    useEffect(() => {
        if (open) {
            dispatch(fetchClients());
        }
    }, [open, dispatch]);

    const handleClose = () => {
        onClose();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmitFilter(formData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Filtrer les Achats</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Veuillez appliquer les filtres souhaités pour la liste des achats.
                </DialogContentText>
                <Box mt={2}>
                    <Box display="flex" gap={2}>
                        <CustomTextField
                            margin="dense"
                            id="date_from"
                            label="Date De"
                            type="date"
                            fullWidth
                            name="date_from"
                            value={formData.date_from}
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
                            value={formData.date_to}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <CustomTextField
                        margin="dense"
                        id="designation"
                        label="Désignation"
                        type="text"
                        fullWidth
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                    />
                    <Box display="flex" gap={2}>
                        <CustomTextField
                            margin="dense"
                            id="poids_min"
                            label="Poids Min"
                            type="number"
                            fullWidth
                            name="poids_min"
                            value={formData.poids_min}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            margin="dense"
                            id="poids_max"
                            label="Poids Max"
                            type="number"
                            fullWidth
                            name="poids_max"
                            value={formData.poids_max}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box display="flex" gap={2}>
                        <CustomTextField
                            margin="dense"
                            id="prix_ag_min"
                            label="Prix A/g Min"
                            type="number"
                            fullWidth
                            name="prix_ag_min"
                            value={formData.prix_ag_min}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prix_ag_max"
                            label="Prix A/g Max"
                            type="number"
                            fullWidth
                            name="prix_ag_max"
                            value={formData.prix_ag_max}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box display="flex" gap={2}>
                        <CustomTextField
                            margin="dense"
                            id="prix_total_min"
                            label="Prix Total Min"
                            type="number"
                            fullWidth
                            name="prix_total_min"
                            value={formData.prix_total_min}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prix_total_max"
                            label="Prix Total Max"
                            type="number"
                            fullWidth
                            name="prix_total_max"
                            value={formData.prix_total_max}
                            onChange={handleChange}
                        />
                    </Box>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Mode Règlement</InputLabel>
                        <CustomSelect
                            name="mode_reglement"
                            label="Mode Règlement"
                            value={formData.mode_reglement}
                            onChange={handleChange}
                        >
                            <MenuItem value="carte">Carte</MenuItem>
                            <MenuItem value="espece">Espèce</MenuItem>
                        </CustomSelect>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <Autocomplete
                            freeSolo
                            fullWidth
                            loading={loadingClient}
                            id="clients-autocomplete"
                            disableClearable
                            options={CLIENTS_LIST.map(
                                (option) => option.name + ' N(' + option.id + ')'
                            )}
                            value={formData.client}
                            onChange={(event, newValue) =>
                                setFormData({ ...formData, client: newValue })
                            }
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
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type</InputLabel>
                        <CustomSelect
                            name="type"
                            label="Type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="neuf">Neuf</MenuItem>
                            <MenuItem value="chdaya">Chdaya</MenuItem>
                        </CustomSelect>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>
                    Annuler
                </Button>
                <Button onClick={handleSubmit}>
                    Appliquer Filtres
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterAchatDialog;
