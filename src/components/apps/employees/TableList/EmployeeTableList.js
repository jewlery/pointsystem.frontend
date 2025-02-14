import React, { useEffect, useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    Paper,
    CircularProgress,
    Button,
    Tooltip,
    IconButton,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, deleteEmployee } from 'src/store/apps/employee/employeeSlice';
import { IconSearch, IconTrash, IconEdit } from '@tabler/icons';
import CreateEmployeeDialog from '../../../modals/employee/CreateEmployeeDialog';
import EditEmployeeDialog from '../../../modals/employee/EditEmployeeDialog';

const EmployeeTableList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employeeReducer.employees);
    const totalEmployees = useSelector((state) => state.employeeReducer.total);
    const loading = useSelector((state) => state.employeeReducer.loading);

    useEffect(() => {
        dispatch(fetchEmployees({ page: page + 1, limit: rowsPerPage, search }));
    }, [dispatch, page, rowsPerPage, search]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (employeeId) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            dispatch(deleteEmployee(employeeId));
        }
    };

    return (
        <Box>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconSearch size="1.1rem" />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Search employees"
                    size="small"
                    onChange={handleSearch}
                    value={search}
                />
                <CreateEmployeeDialog />
            </Toolbar>

            <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
                <TableContainer>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Table aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Registration Number</TableCell>
                                    <TableCell>Qualification</TableCell>
                                    <TableCell>Company ID</TableCell>
                                    <TableCell>Start Hour</TableCell>
                                    <TableCell>End Hour</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees
                                    ?.map((employee) => (
                                        <TableRow key={employee.id} hover>
                                            <TableCell>{employee.id}</TableCell>
                                            <TableCell>{employee.first_name}</TableCell>
                                            <TableCell>{employee.last_name}</TableCell>
                                            <TableCell>{employee.registration_number}</TableCell>
                                            <TableCell>{employee.qualification}</TableCell>
                                            <TableCell>{employee.company_id}</TableCell>
                                            <TableCell>{employee.start_hour}</TableCell>
                                            <TableCell>{employee.end_hour}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleEditClick(employee)}
                                                    >
                                                        <IconEdit width="18" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDeleteClick(employee.id)}
                                                    >
                                                        <IconTrash width="16" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalEmployees}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {selectedEmployee && (
                <EditEmployeeDialog
                    open={openEditDialog}
                    onClose={() => setOpenEditDialog(false)}
                    employeeData={selectedEmployee}
                />
            )}
        </Box>
    );
};

export default EmployeeTableList;