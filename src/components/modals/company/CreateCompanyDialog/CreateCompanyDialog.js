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
import { createCompany } from 'src/store/slices/companySlice'; // Import the createCompany action
import { IconPlus } from '@tabler/icons'; // Import the IconPlus for consistency

const CreateCompanyDialog = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState(''); // State for the company name

    // Handle form submission
    const handleSubmit = () => {
        if (!companyName.trim()) {
            alert('Company name cannot be empty'); // Basic validation
            return;
        }

        dispatch(createCompany({ companyName })) // Dispatch the createCompany action
            .unwrap()
            .then(() => {
                onClose(); // Close the dialog on successful creation
                setCompanyName(''); // Reset the form
            })
            .catch((error) => {
                console.error('Failed to create company:', error);
                alert('Failed to create company. Please try again.'); // Show error message
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
                        required // Mark the field as required
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                {/* Cancel Button */}
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>

                {/* Create Button */}
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    startIcon={<IconPlus />} // Add the IconPlus for consistency
                    sx={{
                        width: { xs: 'auto', md: '175px' }, // Match the width of other buttons
                        '& .MuiButton-startIcon': {
                            marginRight: { xs: 0, sm: 0, md: '8px' }, // Adjust icon spacing
                        },
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            display: { xs: 'none', md: 'inline' }, // Hide text on small screens
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