import React, { useEffect, useState } from 'react';
import {alpha} from '@mui/material/styles';
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
    Button,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanies, deleteCompany } from 'src/store/apps/company/companySlice';
import { IconSearch, IconTrash, IconEdit, IconTableExport, IconFilter, IconPlus } from '@tabler/icons';
import CreateCompanyDialog from '../../../modals/company/CreateCompanyDialog/CreateCompanyDialog';
import EditCompanyDialog from '../../../modals/company/EditCompanyDialog/EditCompanyDialog';
import FilterCompanyDialog from '../../../modals/company/FilterCompanyDialog/FilterCompanyDialog';
import CustomCheckbox from '../../../forms/theme-elements/CustomCheckbox';

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'action', label: 'Action' },
];

const EnhancedTableHead = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <CustomCheckbox
                        color="primary"
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all companies' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const EnhancedTableToolbar = ({ numSelected, handleSearch, search, handleExport, handleOpenFilterDialog, handleOpenCreateDialog }) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2">
                    {numSelected} selected
                </Typography>
            ) : (
                <Box sx={{ flex: '1 1 100%' }}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconSearch size="1.1rem" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Search companies"
                        size="small"
                        onChange={handleSearch}
                        value={search}
                    />
                </Box>
            )}
            <Box display="flex" alignItems="center" gap="16px">
                <Tooltip title="Create Company">
                    <Button
                onClick={handleOpenCreateDialog}
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
                    Create Company
                </Box>
            </Button>

                </Tooltip>
            </Box>
        </Toolbar>
    );
};

const CompaniesTableList = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companyReducer.companies);
    const totalCompanies = useSelector((state) => state.companyReducer.total);
    const loading = useSelector((state) => state.companyReducer.loading);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        dispatch(fetchCompanies({ page: page + 1, rowsPerPage, search, ...filters }));
    }, [dispatch, page, rowsPerPage, search, filters]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = companies.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

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
            dispatch(fetchCompanies({ page, rowsPerPage, search }));
        }
    };

    const handleEditClick = (company) => {
        setSelectedCompany(company);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedCompany(null);
    };

    const handleOpenFilterDialog = () => {
        setOpenFilterDialog(true);
    };

    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
    };

    const handleExport = () => {

    };

    return (
        <Box>
            <EnhancedTableToolbar
                numSelected={selected.length}
                handleSearch={handleSearch}
                search={search}
                handleExport={handleExport}
                handleOpenFilterDialog={handleOpenFilterDialog}
                handleOpenCreateDialog={handleOpenCreateDialog}
            />
            <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
                <TableContainer>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Table aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={companies.length}
                            />
                            <TableBody>
                                {companies.map((company) => {
                                    const isItemSelected = selected.indexOf(company.ID) !== -1;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, company.ID)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={company.ID}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <CustomCheckbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': company.ID }}
                                                />
                                            </TableCell>
                                            <TableCell>{company.ID}</TableCell>
                                            <TableCell>{company.CompanyName}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleEditClick(company)}
                                                    >
                                                        <IconEdit width="18" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete(company.ID)}
                                                    >
                                                        <IconTrash width="18" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {companies.length <= 0 && (
                                    <TableRow style={{ height: 53 * 5 }}>
                                        <TableCell colSpan={headCells.length} align="center">
                                            <Typography variant="body2">No data available</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalCompanies}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {selectedCompany && (
                <EditCompanyDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    companyData={selectedCompany}
                />
            )}
            <CreateCompanyDialog
                open={openCreateDialog}
                onClose={handleCloseCreateDialog}
            />
        </Box>
    );
};

export default CompaniesTableList;