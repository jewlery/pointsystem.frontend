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
    TableSortLabel,
    Toolbar,
    IconButton,
    Tooltip,
    Typography,
    TextField,
    InputAdornment,
    Paper,
    CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanies, deleteCompany } from 'src/store/apps/company/companySlice'; // Assuming you have a companySlice
import { IconSearch, IconTrash, IconEdit } from '@tabler/icons';

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'action', label: 'Action' },
];

const CompaniesTableList = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companyReducer.companies);
    const loading = useSelector((state) => state.companyReducer.loading);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchCompanies({ page, rowsPerPage, search }));
    }, [dispatch, page, rowsPerPage, search]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(0);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            dispatch(deleteCompany(id));
        }
    };

    return (
        <Box>
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
                                    {headCells.map((headCell) => (
                                        <TableCell key={headCell.id}>
                                            <TableSortLabel>{headCell.label}</TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companies.map((company) => (
                                    <TableRow key={company.id}>
                                        <TableCell>{company.id}</TableCell>
                                        <TableCell>{company.companyName}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton color="primary">
                                                    <IconEdit width="18" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton color="error" onClick={() => handleDelete(company.id)}>
                                                    <IconTrash width="18" />
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
                    count={companies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default CompaniesTableList;