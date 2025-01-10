import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createCompany } from 'src/store/apps/company/companySlice'; // Assuming you have a companySlice
import { IconPlus } from '@tabler/icons';

const CreateCompanyDialog = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState('');

    const handleSubmit = () => {
        dispatch(createCompany({ companyName }))
            .unwrap()
            .then(() => {
                onClose(); // Close the dialog on successful creation
            })
            .catch((error) => {
                console.error('Failed to create company:', error);
            });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">Create New Company</Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        margin="normal"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    startIcon={<IconPlus />}
                    sx={{
                        width: { xs: 'auto', md: '175px' },
                        '& .MuiButton-startIcon': {
                            marginRight: { xs: 0, sm: 0, md: '8px' },
                        },
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            display: { xs: 'none', md: 'inline' },
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Create Company
                    </Box>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCompanyDialog;