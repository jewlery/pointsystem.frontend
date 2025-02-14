import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    TextField,
    MenuItem,
    CircularProgress,
    Grid,
    Autocomplete,
    FormControl
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createEmployee } from 'src/store/apps/employee/employeeSlice';
import { IconPlus } from '@tabler/icons';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { selectCompanies } from 'src/store/apps/company/companySlice';

const CreateEmployeeDialog = () => {
    const [open, setOpen] = useState(false);
    const [COMPANY_LIST, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCompany, setLoadingCompany] = useState(false);
    const [formData, setFormData] = useState({
        RegistrationNumber: '',
        Qualification: '',
        CompanyID: '',
        StartHour: '',
        EndHour: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if(open){
            setLoadingCompany(true);
            selectCompanies().then((data) => {
                setCompanyList(data);
            }).finally(() => {
                setLoadingCompany(false);
            });
        }
    }, [open])

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            RegistrationNumber: '',
            Qualification: '',
            CompanyID: '',
            StartHour: '',
            EndHour: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
        });
        setErrors({});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.RegistrationNumber) newErrors.RegistrationNumber = 'Registration Number is required';
        if (!formData.Qualification) newErrors.Qualification = 'Qualification is required';
        if (!formData.CompanyID) newErrors.CompanyID = 'Company ID is required';
        if (!formData.StartHour) newErrors.StartHour = 'Start Hour is required';
        if (!formData.EndHour) newErrors.EndHour = 'End Hour is required';
        // Validate that End Hour is after Start Hour
        if (formData.StartHour && formData.EndHour && new Date(`1970-01-01T${formData.EndHour}`) <= new Date(`1970-01-01T${formData.StartHour}`)) {
            newErrors.EndHour = 'End Hour must be after Start Hour';
        }

        // Validate First Name
        if (!formData.firstName) newErrors.firstName = 'First Name is required';

        // Validate Last Name
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';

        // Validate Username
        if (!formData.username) newErrors.username = 'Username is required';

        // Validate Password
        if (!formData.password) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                await dispatch(createEmployee(formData)).unwrap();
                handleClose();
            } catch (error) {
                console.error('Failed to create employee:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
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
                    Create Employee
                </Box>
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to create a new employee.
                    </DialogContentText>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {/* First Column */}
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    fullWidth
                                    label="Registration Number"
                                    name="RegistrationNumber"
                                    value={formData.RegistrationNumber}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.RegistrationNumber}
                                    helperText={errors.RegistrationNumber}
                                />
                                <CustomTextField
                                    fullWidth
                                    label="Qualification"
                                    name="Qualification"
                                    value={formData.Qualification}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.Qualification}
                                    helperText={errors.Qualification}
                                />
                                <FormControl fullWidth margin="dense">
                                    <Autocomplete
                                        freeSolo
                                        fullWidth
                                        loading={loadingCompany}
                                        id="companies-autocomplete"
                                        disableClearable
                                        getOptionLabel={(option) => option.companyName}
                                        getOptionKey={(option) => option.id}
                                        options={COMPANY_LIST}
                                        onChange={(event, newValue) => setFormData({ ...formData, CompanyID: newValue.id })}
                                        renderInput={(params) => (
                                            <CustomTextField
                                                {...params}
                                                placeholder="Sélectionner un Societe"
                                                aria-label="Sélectionner un Societe"
                                                inputprops={{
                                                    ...params.inputprops,
                                                    type: 'search',
                                                }}
                                                error={!!errors.CompanyID}
                                                helperText={errors.CompanyID}
                                            />
                                        )}
                                    />
                                </FormControl>
                                <CustomTextField
                                    fullWidth
                                    label="Start Hour"
                                    name="StartHour"
                                    type="time"
                                    value={formData.StartHour}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.StartHour}
                                    helperText={errors.StartHour}
                                />
                                <CustomTextField
                                    fullWidth
                                    label="End Hour"
                                    name="EndHour"
                                    type="time"
                                    value={formData.EndHour}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.EndHour}
                                    helperText={errors.EndHour}
                                />
                            </Grid>

                            {/* Second Column */}
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                />
                                <CustomTextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                />
                                <CustomTextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                                <CustomTextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateEmployeeDialog;