import React, {useState, useEffect} from 'react';
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
    CircularProgress,
    Autocomplete,
} from '@mui/material';
import CustomTextField from '../../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../../forms/theme-elements/CustomSelect';
import {updateAchat} from 'src/store/apps/achat/achatSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fetchClients, selectClients} from '../../../../store/apps/client/clientSlice';
import moment from "moment";
import {toFixedWithoutRounding} from "../../../../utils/helper";

const EditAchatDialog = ({open, onClose, achatData}) => {
    const CLIENTS_LIST = useSelector(selectClients);
    const loadingClient = useSelector((state) => state.clientReducer.loading);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: achatData.date || '',
        designation: achatData.designation || '',
        poids: achatData.poids || '',
        prixAg: achatData.prixAg || '',
        prixTotal: achatData.prixTotal || '',
        modeReglement: achatData.modeReglement || '',
        client: achatData.client || '',
        type: achatData.type || '',
        carteId: null,
        recu: null,
        article: null,
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
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
        if (name === 'poids') {
            setFormData((prevData) => ({
                ...prevData,
                ['prixAg']: toFixedWithoutRounding(formData.prixTotal / value, 2)
            }));
        }
        if (name === 'prixTotal') {
            setFormData((prevData) => ({...prevData, ['prixAg']: toFixedWithoutRounding(value / formData.poids, 2)}));
        }
    };

    const handleFileChange = (event) => {
        const {name, files} = event.target;
        setFormData((prevData) => ({...prevData, [name]: files[0]}));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await dispatch(updateAchat({id: achatData.id, achatData: formData})); // Call the updateAchat action
            handleClose();
        } catch (error) {
            console.error('Error updating achat:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier un Achat</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez modifier les détails de l'achat.
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
                            InputLabelProps={{shrink: true}}
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
                        />
                        <CustomTextField
                            margin="dense"
                            id="poids"
                            label="Poids"
                            type="number"
                            fullWidth
                            name="poids"
                            value={formData.poids}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prixTotal"
                            label="Prix Total"
                            type="number"
                            fullWidth
                            name="prixTotal"
                            value={formData.prixTotal}
                            onChange={handleChange}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prixAg"
                            label="Prix A/g"
                            type="number"
                            fullWidth
                            name="prixAg"
                            value={formData.prixAg}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Mode Règlement</InputLabel>
                            <CustomSelect
                                name="modeReglement"
                                label="Mode Règlement"
                                value={formData.modeReglement}
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
                                    setFormData({...formData, client: newValue})
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

                        {/* File upload fields */}
                        <CustomTextField
                            margin="dense"
                            id="carte-id-file"
                            label="Carte ID"
                            type="file"
                            fullWidth
                            name="carteId"
                            onChange={handleFileChange}
                            InputLabelProps={{shrink: true}}
                        />
                        <CustomTextField
                            margin="dense"
                            id="recu-file"
                            label="Reçu"
                            type="file"
                            fullWidth
                            name="recu"
                            onChange={handleFileChange}
                            InputLabelProps={{shrink: true}}
                        />
                        <CustomTextField
                            margin="dense"
                            id="article-file"
                            label="Article"
                            type="file"
                            fullWidth
                            name="article"
                            onChange={handleFileChange}
                            InputLabelProps={{shrink: true}}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose} disabled={loading}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={24}/> : 'Soumettre'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditAchatDialog;
