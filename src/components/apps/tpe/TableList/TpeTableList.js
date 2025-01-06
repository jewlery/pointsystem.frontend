import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { format } from 'date-fns';
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
    Avatar,
    TextField,
    InputAdornment,
    Paper,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux';
import {fetchTpes, deleteTpe, exportTpes} from 'src/store/apps/tpe/tpeSlice'; // Updated to tpeSlice
import CustomCheckbox from '../../../forms/theme-elements/CustomCheckbox';
import CustomSwitch from '../../../forms/theme-elements/CustomSwitch';
import {IconEdit, IconDotsVertical, IconFilter, IconPlus, IconSearch, IconTrash, IconTableExport} from '@tabler/icons';
import CreateTpeDialog from '../../../modals/tpe/CreateTpeDialog/CreateTpeDialog';
import EditTpeDialog from '../../../modals/tpe/EditTpeDialog/EditTpeDialog';
import FilterTpeDialog from "../../../modals/tpe/FilterTpeDialog/FilterTpeDialog";
import {exportAchats} from "../../../../store/apps/achat/achatSlice";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'codeSL', numeric: false, disablePadding: false, label: 'Code de SL' },
    { id: 'clients', numeric: false, disablePadding: false, label: 'Clients' },
    { id: 'nomProduit', numeric: false, disablePadding: false, label: 'Nom de Produit' },
    { id: 'montant', numeric: false, disablePadding: false, label: 'Montant' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
                        inputProps={{
                            'aria-label': 'select all items',
                        }}
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
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({ numSelected, handleSearch, search, applyFilters, handleDelete, handleExport }) => {
    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    const openFilterDialogHandler = () => {
        setOpenFilterDialog(true);
    };

    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
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
                        placeholder="Rechercher une TPE"
                        size="small"
                        onChange={handleSearch}
                        value={search}
                    />
                </Box>
            )}
            <Box display="flex" alignItems="center" gap="16px">

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
                        Export Tpes
                    </Box>
                </Button>

                <CreateTpeDialog />
                <FilterTpeDialog open={openFilterDialog} handleClose={handleCloseFilterDialog} applyFilters={applyFilters}/>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton color="error" onClick={handleDelete}>
                            <IconTrash width="18" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton color="primary" onClick={openFilterDialogHandler}>
                            <IconFilter size="1.2rem" />
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
    handleDelete: PropTypes.func.isRequired, // Added for delete action
};

const TpeTableList = () => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedTpe, setSelectedTpe] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const dispatch = useDispatch();
    const tpes = useSelector((state) => state.tpeReducer.tpes); // Updated to tpeReducer
    const total_tpes = useSelector((state) => state.tpeReducer.total); // Updated to tpeReducer
    const [filters, setFilters] = useState({});

    useEffect(() => {
        setLoading(true);
        dispatch(fetchTpes({page, filters: {search, rowsPerPage, ...filters}, order, orderBy}))
            .finally(() => setLoading(false));
    }, [dispatch, search, rowsPerPage, page, filters, order, orderBy]);

    const [rows, setRows] = useState(tpes);

    useEffect(() => {
        setRows(tpes);
    }, [tpes]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            const total = tpes.map((n) => parseFloat(n.montant)).reduce((o , n) => o + n);
            setTotalPrice(total);
            setSelected(newSelecteds);
            return;
        }
        setTotalPrice(null);
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
        if (newSelected.length > 0) {
            const total = tpes.filter((tpe) => newSelected.includes(tpe.id))
                .map((n) => parseFloat(n.montant)).reduce((o, n) => o + n);
            setTotalPrice(total);
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleEditOpen = (tpe) => {
        setSelectedTpe(tpe);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setSelectedTpe(null);
        setEditDialogOpen(false);
    };

    const handleDelete = () => {
        selected.forEach((id) => dispatch(deleteTpe(id)));
        setSelected([]);
    };

    const submitFilterDialog = (formData) => {
       setFilters(formData);
    };

    const handleExport = () => {
        dispatch(exportTpes(filters));
    };

    return (
        <Box>
            <Paper>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    handleSearch={handleSearch}
                    search={search}
                    handleDelete={handleDelete}
                    applyFilters={submitFilterDialog}
                    handleExport={handleExport}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        {selected.length > 0 && <caption>The total selected rows: <b>{totalPrice} DH</b></caption> }
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row) => {
                                    const isItemSelected = isSelected(row.id);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <CustomCheckbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onChange={(event) => handleClick(event, row.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{format(new Date(row.date), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{row.codeSL}</TableCell>
                                            <TableCell>{row.clients}</TableCell>
                                            <TableCell>{row.nomProduit}</TableCell>
                                            <TableCell>{row.montant}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap="8px">
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => handleEditOpen(row)}
                                                        >
                                                            <IconEdit width="18" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => dispatch(deleteTpe(row.id))}
                                                        >
                                                            <IconTrash width="18" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            {rows.length <= 0 && (
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
                    count={total_tpes}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {selectedTpe && (
                <EditTpeDialog
                    open={editDialogOpen}
                    handleClose={handleEditClose}
                    tpe={selectedTpe}
                />
            )}
        </Box>
    );
};

export default TpeTableList;
