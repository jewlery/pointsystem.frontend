import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import {format} from 'date-fns';
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
    TextField,
    InputAdornment,
    Paper,
    Typography,
    Avatar, TableFooter, Button
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {useSelector, useDispatch} from 'react-redux';
import CustomCheckbox from '../../../forms/theme-elements/CustomCheckbox';
import {IconDotsVertical, IconEdit, IconFilter, IconSearch, IconTableExport, IconTrash} from '@tabler/icons';
import CreateCreditDialog from "../../../modals/credit/CreateCreditDialog/CreateCreditDialog";
import {deleteCredit, exportCredits, fetchCredits} from "../../../../store/apps/credit/creditSlice";
import EditCreditDialog from "../../../modals/credit/EditCreditDialog/EditCreditDialog";
import FilterCreditDialog from "../../../modals/credit/FilterCreditDialog/FilterCreditDialog";
import {exportAchats} from "../../../../store/apps/achat/achatSlice";

const headCells = [
    {id: 'date', numeric: false, disablePadding: false, label: 'Date'},
    {id: 'designation', numeric: false, disablePadding: false, label: 'Designation'},
    {id: 'montant', numeric: false, disablePadding: false, label: 'Montant'},
    {id: 'type_reglement', numeric: false, disablePadding: false, label: 'Type Reglement'},
    {id: 'type', numeric: false, disablePadding: false, label: 'Type'},
    {id: 'nom', numeric: false, disablePadding: false, label: 'Nom'},
    {id: 'action', numeric: false, disablePadding: false, label: 'Action'},
];

const EnhancedTableHead = ({onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort}) => {
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
                        inputProps={{'aria-label': 'select all credits'}}
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
                            {orderBy === headCell.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({numSelected, handleSearch, search, submitCreditFilter, handleExport}) => {
    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    const handleOpenFilterDialog = () => {
        setOpenFilterDialog(true);
    };

    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
    };

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{flex: '1 1 100%'}} color="inherit" variant="subtitle2">
                    {numSelected} selected
                </Typography>
            ) : (
                <Box sx={{flex: '1 1 100%'}}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconSearch size="1.1rem"/>
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Rechercher un crédit"
                        size="small"
                        onChange={handleSearch}
                        value={search}
                    />
                </Box>
            )}
            <Box display="flex" alignItems="center" gap="16px">
                <CreateCreditDialog/>
                <FilterCreditDialog
                    open={openFilterDialog}
                    onClose={handleCloseFilterDialog}
                    onSubmitFilter={submitCreditFilter}
                />

                <Button
                    onClick={handleExport}
                    variant="contained"
                    color="success"
                    startIcon={<IconTableExport/>}
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
                        Export Crédits
                    </Box>
                </Button>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton color="error">
                            <IconTrash width="18"/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton color="primary" onClick={handleOpenFilterDialog}>
                            <IconFilter size="1.2rem"/>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
};

const CreditTableList = () => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedCredit, setSelectedCredit] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [selected, setSelected] = useState([]);
    const [filters, setFilters] = useState({});

    const dispatch = useDispatch();
    const credits = useSelector((state) => state.creditReducer.credits);
    const totalCredits = useSelector((state) => state.creditReducer.total);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchCredits({page, filters: {rowsPerPage, search, ...filters}, order, orderBy}))
            .finally(() => setLoading(false));
    }, [dispatch, page, rowsPerPage, search, filters, order, orderBy]);


    const handleExport = () => {
        dispatch(exportCredits(filters));
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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

    const handleEditClick = (credit) => {
        console.log("edit click")
        setSelectedCredit(credit);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedCredit(null);
    };

    const handleDeleteClick = (creditId) => {
        if (window.confirm('Are you sure you want to delete this credit?')) {
            dispatch(deleteCredit(creditId));
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = credits.map((n) => n.id);
            const total = credits.map((n) => parseFloat(n.montant)).reduce((o , n) => o + n);
            setTotalPrice(total);
            setSelected(newSelecteds);
        } else {
            setTotalPrice(null);
            setSelected([]);
        }
    };

    const handleClick = async (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (id === selectedCredit?.id)
            return;
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        if(newSelected.length > 0){
            const total = credits.filter((credit) => newSelected.includes(credit.id))
                .map((n) => parseFloat(n.montant)).reduce((o , n) => o + n);
            setTotalPrice(total);
        }
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const submitCreditFilter = (filterData) => {
        setFilters(filterData);
    };

    return (
        <Box>
            <EnhancedTableToolbar
                numSelected={selected.length}
                search={search}
                handleSearch={handleSearch}
                submitCreditFilter={submitCreditFilter}
                handleExport={handleExport}
            />
            <Paper variant="outlined" sx={{mx: 2, mt: 1}}>
                <TableContainer>
                    <Table>
                        {selected.length > 0 && <caption>The total selected rows: <b>{totalPrice} DH</b></caption> }
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                            numSelected={selected.length}
                            rowCount={credits.length}
                        />
                        <TableBody>
                            {credits.map((credit) => {
                                const isItemSelected = isSelected(credit.id);
                                return (
                                    <TableRow
                                        key={credit.id}
                                        hover
                                        onClick={(event) => handleClick(credit.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <CustomCheckbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': credit.id}}
                                            />
                                        </TableCell>
                                        <TableCell>{format(new Date(credit.date), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell>{credit.designation}</TableCell>
                                        <TableCell>{credit.montant}</TableCell>
                                        <TableCell>{credit.type_reglement}</TableCell>
                                        <TableCell>{credit.type}</TableCell>
                                        <TableCell>{credit.nom}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEditClick(credit)}
                                                >
                                                    <IconEdit width="18"/>
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete">
                                                <IconButton
                                                    color="error" onClick={() => handleDeleteClick(credit.id)}>
                                                    <IconTrash width="16"/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {credits.length <= 0 && (
                                <TableRow style={{height: 53 * 5}}>
                                    <TableCell colSpan={headCells.length} align="center">
                                        <Typography variant="body2">Aucune donnée disponible</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalCredits}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {selectedCredit && (
                <EditCreditDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    creditData={selectedCredit}
                />
            )}
        </Box>
    );
};

export default CreditTableList;
