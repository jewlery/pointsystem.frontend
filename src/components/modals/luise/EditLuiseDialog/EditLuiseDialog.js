import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    CircularProgress,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { IconEdit } from "@tabler/icons";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import { useDispatch } from "react-redux";
import { updateLuise } from 'src/store/apps/luise/luiseSlice';
import moment from "moment";
import {toFixedWithoutRounding} from "../../../../utils/helper";

const TYPES_LIST = [
    'Type 10',
    'Type 20',
    // Add more types as needed
];

const EditLuiseDialog = ({ open, onClose, luiseData }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && luiseData) {
            setFormData({
                piece: luiseData.piece || '',
                type: luiseData.type || '',
                nombre: luiseData.nombre || '',
                prix_achat_total: luiseData.prix_achat_total || '',
                prix_achat: luiseData.prix_achat || '',
                prix_vente_unitaire: luiseData.prix_vente_unitaire || '',
                date_vente: luiseData.date_vente ? moment(luiseData.date_vente).utc().format('yyyy-MM-DD') : '',
                prix_vente: luiseData.prix_vente || '',
                benefice: luiseData.benefice || ''
            });
        }
    }, [open, luiseData]);

    const handleChange = (event) => {
        const { name, value } = event.target;


        const data = {
            ...formData,
            [name]: value
        };

        if(name === 'prix_achat_total'){
            data.prix_achat = toFixedWithoutRounding(data.prix_achat_total / data.nombre, 3);
        }

        if(name === 'prix_achat'){
            data.prix_achat_total = toFixedWithoutRounding(data.prix_achat * data.nombre,3);
        }


        if(name === 'prix_vente'){
            data.prix_vente_unitaire = toFixedWithoutRounding(data.prix_vente / data.nombre,3);
        }

        if(name === 'prix_vente_unitaire'){
            data.prix_vente = toFixedWithoutRounding(data.prix_vente_unitaire * data.nombre,3);
        }


        if(name === 'nombre'){
            data.prix_vente = toFixedWithoutRounding(data.prix_vente_unitaire * data.nombre, 3);
            data.prix_achat_total = toFixedWithoutRounding(data.prix_achat * data.nombre,3);
        }

        data.benefice = toFixedWithoutRounding(data.prix_vente - data.prix_achat_total, 3);
        setFormData(data);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleClose = () => {
        onClose();
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
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.piece) newErrors.piece = 'Pièce est requise';
        if (!formData.type) newErrors.type = 'Type est requis';
        if (!formData.nombre) newErrors.nombre = 'Nombre est requis';
        if (!formData.prix_achat_total) newErrors.prix_achat_total = 'Prix d\'achat total est requis';
        if (!formData.prix_achat) newErrors.prix_achat = 'Prix d\'achat est requis';
        if (!formData.prix_vente_unitaire) newErrors.prix_vente_unitaire = 'Prix de vente unitaire est requis';
        if (!formData.date_vente) newErrors.date_vente = 'Date de vente est requise';
        if (!formData.prix_vente) newErrors.prix_vente = 'Prix de vente est requis';
        if (!formData.benefice) newErrors.benefice = 'Bénéfice est requis';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                await dispatch(updateLuise({ id: luiseData.id, luiseData: formData }));
                handleClose();
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier la Luise</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez modifier les détails de la Luise.
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
                            InputLabelProps={{ shrink: true }}
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
};

export default EditLuiseDialog;
