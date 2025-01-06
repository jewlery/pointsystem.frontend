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
    InputLabel
} from '@mui/material';
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import {IconPlus} from "@tabler/icons";

const CLIENT_LIST = [
    'Client A',
    'Client B',
    'Client C'
    // Add more clients as needed
];

const CreateAchatDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        date: '',
        designation: '',
        poids: '',
        prixAg: '',
        prixTotal: '',
        modeReglement: '',
        client: '',
        type: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Handle form submission
        handleClose();
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
                startIcon={<IconPlus/>}
                sx={{
                    width: {xs: 'auto', md: '175px'}, // Add responsive styling for icon margin
                    '& .MuiButton-startIcon': {
                        marginRight: {xs: 0, sm: 0, md: '8px'}, // Remove margin on small screens
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: {xs: 'none', md: 'inline'}, // Hide text on extra-small screens
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
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            id="prixAg"
                            label="Prix A/g"
                            type="number"
                            fullWidth
                            name="prixAg"
                            value={formData.prixAg}
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
                            <InputLabel>Client</InputLabel>
                            <CustomSelect
                                name="client"
                                label="Client"
                                value={formData.client}
                                onChange={handleChange}
                            >
                                {CLIENT_LIST.map(client => (
                                    <MenuItem key={client} value={client}>{client}</MenuItem>
                                ))}
                            </CustomSelect>
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
                    <Button color="error" onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSubmit}>Soumettre</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateAchatDialog;
