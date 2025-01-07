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
import { createUser } from 'src/store/apps/users/userSlice'; // Assuming you have a userSlice for user management
import { IconPlus } from '@tabler/icons'; // Import the IconPlus for consistency

const CreateUserDialog = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        role: 'employee', // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch(createUser(formData))
            .unwrap()
            .then(() => {
                handleClose(); // Close the dialog on successful creation
            })
            .catch((error) => {
                console.error('Failed to create user:', error);
            });
    };

    return (
        <>

            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
                startIcon={<IconPlus />}
                sx={{
                    width: { xs: 'auto', md: '175px' }, // Add responsive styling for icon margin
                    '& .MuiButton-startIcon': {
                        marginRight: { xs: 0, sm: 0, md: '8px' }, // Remove margin on small screens
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: { xs: 'none', md: 'inline' }, // Hide text on extra-small screens
                        whiteSpace: 'nowrap',
                    }}
                >
                    Créer un User
                </Box>
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h6">Create New User</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            margin="normal"
                            select
                            SelectProps={{ native: true }}
                        >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
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
                            Create User
                        </Box>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateUserDialog;