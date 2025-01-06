import React from 'react';
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
    CircularProgress
} from '@mui/material';
import {IconPlus} from "@tabler/icons";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {useDispatch} from "react-redux";
import {createLuise} from 'src/store/apps/luise/luiseSlice';
import {toFixedWithoutRounding} from "../../../../utils/helper";

const TYPES_LIST = [
    'Type 10',
    'Type 20',
    // Add more types as needed
];

const CreateLuiseDialog = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        piece: '',
        type: '',
        nombre: '',
        prix_achat_total: '',  // Updated field name
        prix_achat: '',
        prix_vente_unitaire: '',
        date_vente: '',
        prix_vente: '',
        benefice: ''
    });
    const [errors, setErrors] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        const data = {
            ...formData,
            [name]: value
        };

        if (name === 'prix_achat_total') {
            data.prix_achat = toFixedWithoutRounding(data.prix_achat_total / data.nombre, 3);
        }

        if (name === 'prix_achat') {
            data.prix_achat_total = toFixedWithoutRounding(data.prix_achat * data.nombre, 3);
        }


        if (name === 'prix_vente') {
            data.prix_vente_unitaire = toFixedWithoutRounding(data.prix_vente / data.nombre, 3);
        }

        if (name === 'prix_vente_unitaire') {
            data.prix_vente = toFixedWithoutRounding(data.prix_vente_unitaire * data.nombre, 3);
        }

        if (name === 'nombre') {
            data.prix_vente = toFixedWithoutRounding(data.prix_vente_unitaire * data.nombre, 3);
            data.prix_achat_total = toFixedWithoutRounding(data.prix_achat * data.nombre, 3);
        }

        data.benefice = toFixedWithoutRounding(data.prix_vente - data.prix_achat_total, 3);

        setFormData(data);
        // Clear any errors for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await dispatch(createLuise(formData)); // Assume createLuise handles the API submission
            handleClose();
            setFormData({
                piece: '',
                type: '',
                nombre: '',
                prix_achat_total: '',
                prix_achat: '',
                prix_vente_unitaire: '',
                date_vente: '',
                prix_vente: '',
                benefice: ''
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                // Handle backend validation errors
                setErrors(error.response.data.errors);
            }
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
                    Créer une Luise
                </Box>
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Créer une Luise</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer les détails pour créer une entrée de Luise.
                    </DialogContentText>
                    <Box mt={2}>
                        <CustomTextField
                            autoFocus
                            margin="dense"
                            id="piece"
                            label="Pièce"
                            fullWidth
                            name="piece"
                            value={formData.piece}
                            onChange={handleChange}
                            error={!!errors.piece}
                            helperText={errors.piece}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Type</InputLabel>
                            <CustomSelect
                                name="type"
                                label="Type"
                                value={formData.type}
                                onChange={handleChange}
                                error={!!errors.type}
                                helperText={errors.type}
                            >
                                {TYPES_LIST.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </CustomSelect>
                        </FormControl>
                        <CustomTextField
                            margin="dense"
                            id="nombre"
                            label="Nombre"
                            type="number"
                            fullWidth
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            error={!!errors.nombre}
                            helperText={errors.nombre}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prix_achat_total"
                            label="Prix d'achat total"
                            type="number"
                            fullWidth
                            name="prix_achat_total"
                            value={formData.prix_achat_total}
                            onChange={handleChange}
                            error={!!errors.prix_achat_total}
                            helperText={errors.prix_achat_total}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prix_achat"
                            label="Prix d'achat"
                            type="number"
                            fullWidth
                            name="prix_achat"
                            value={formData.prix_achat}
                            onChange={handleChange}
                            error={!!errors.prix_achat}
                            helperText={errors.prix_achat}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prix_vente_unitaire"
                            label="Prix de vente unitaire"
                            type="number"
                            fullWidth
                            name="prix_vente_unitaire"
                            value={formData.prix_vente_unitaire}
                            onChange={handleChange}
                            error={!!errors.prix_vente_unitaire}
                            helperText={errors.prix_vente_unitaire}
                        />
                        <CustomTextField
                            margin="dense"
                            id="date_vente"
                            label="Date vente"
                            type="date"
                            fullWidth
                            name="date_vente"
                            value={formData.date_vente}
                            onChange={handleChange}
                            InputLabelProps={{shrink: true}}
                            error={!!errors.date_vente}
                            helperText={errors.date_vente}
                        />
                        <CustomTextField
                            margin="dense"
                            id="prix_vente"
                            label="Prix de vente"
                            type="number"
                            fullWidth
                            name="prix_vente"
                            value={formData.prix_vente}
                            onChange={handleChange}
                            error={!!errors.prix_vente}
                            helperText={errors.prix_vente}
                        />
                        <CustomTextField
                            margin="dense"
                            id="benefice"
                            label="Bénéfice"
                            type="number"
                            fullWidth
                            name="benefice"
                            value={formData.benefice}
                            onChange={handleChange}
                            error={!!errors.benefice}
                            helperText={errors.benefice}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={24}/> : 'Soumettre'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateLuiseDialog;
