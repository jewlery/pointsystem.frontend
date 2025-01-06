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
    CircularProgress, Autocomplete
} from '@mui/material';
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {IconPlus} from "@tabler/icons";
import {createAchat} from 'src/store/apps/achat/achatSlice';
import {useDispatch, useSelector} from "react-redux";
import {fetchClients, selectClients} from '../../../../store/apps/client/clientSlice';
import {toFixedWithoutRounding} from "../../../../utils/helper";

const CreateAchatDialog = ({onSubmit}) => {
    const CLIENTS_LIST = useSelector(selectClients);
    const loadingClient = useSelector((state) => state.clientReducer.loading);
    const error = useSelector((state) => state.clientReducer.error);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        designation: '',
        poids: '',
        prixAg: '',
        prixTotal: '',
        modeReglement: '',
        client: '',
        type: '',
        carteId: null,   // New field for carte ID
        recu: null,      // New field for reçu
        article: null,   // New field for article
    });

    useEffect(() => {
        // Fetch clients when the component is mounted
        dispatch(fetchClients());
    }, [open]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
        if (name === 'poids') {
            setFormData((prevData) => ({...prevData, ['prixAg']: toFixedWithoutRounding(formData.prixTotal / value, 2)}));
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
            await dispatch(createAchat(formData)); // Assume onSubmit is a prop that handles API submission
            handleClose();
            setFormData({
                date: '',
                designation: '',
                poids: '',
                prixAg: '',
                prixTotal: '',
                modeReglement: '',
                client: '',
                type: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
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
                    width: {xs: 'auto', md: '175px'},
                    '& .MuiButton-startIcon': {
                        marginRight: {xs: 0, sm: 0, md: '8px'},
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: {xs: 'none', md: 'inline'},
                        whiteSpace: 'nowrap',
                    }}
                >
                    Créer une achat
                </Box>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Créer un Achat</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer les détails pour créer un achat.
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
                                options={CLIENTS_LIST.map((option) => option.name + " N(" + option.id + ")")}
                                onChange={(event, newValue) => setFormData({...formData, client: newValue})}
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

                        {/* New file upload fields */}
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

export default CreateAchatDialog;
