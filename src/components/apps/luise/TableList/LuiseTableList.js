import React, {useState, useEffect} from 'react';
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
    Button
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {useSelector, useDispatch} from 'react-redux';
import {fetchLuises, deleteLuise, exportLuises} from 'src/store/apps/luise/luiseSlice';
import CustomCheckbox from '../../../forms/theme-elements/CustomCheckbox';
import {IconEdit, IconFilter, IconSearch, IconTableExport, IconTrash} from '@tabler/icons';
import CreateLuiseDialog from "../../../modals/luise/CreateLuiseDialog/CreateLuiseDialog";
import EditLuiseDialog from "../../../modals/luise/EditLuiseDialog/EditLuiseDialog";
import {deleteTpe} from "../../../../store/apps/tpe/tpeSlice";
import FilterLuiseDialog from "../../../modals/luise/FilterLuiseDialog/FilterLuiseDialog";
import {exportAchats} from "../../../../store/apps/achat/achatSlice";

// Define the table headers
const headCells = [
    {id: 'piece', numeric: false, disablePadding: false, label: 'Pièce'},
    {id: 'type', numeric: false, disablePadding: false, label: 'Type'},
    {id: 'nombre', numeric: true, disablePadding: false, label: 'Quantité'},
    {id: 'prixAchatTotal', numeric: true, disablePadding: false, label: 'Prix Achat Total'},
    {id: 'prixAchat', numeric: true, disablePadding: false, label: 'Prix Achat'},
    {id: 'prixVenteUnitaire', numeric: true, disablePadding: false, label: 'Prix Vente Unitaire'},
    {id: 'dateVente', numeric: false, disablePadding: false, label: 'Date Vente'},
    {id: 'prixVente', numeric: true, disablePadding: false, label: 'Prix Vente'},
    {id: 'benefice', numeric: true, disablePadding: false, label: 'Bénéfice'},
    {id: 'action', numeric: false, disablePadding: false, label: 'Action'},
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
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
                            'aria-label': 'select all',
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

const EnhancedTableToolbar = ({numSelected, handleSearch, search, applyFilters, handleExport}) => {
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
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{flex: '1 1 100%'}} color="inherit" variant="subtitle2" component="div">
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
                        placeholder="Rechercher une luise"
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
                        Export Luises
                    </Box>
                </Button>

                <CreateLuiseDialog/>
                <FilterLuiseDialog open={openFilterDialog} handleClose={handleCloseFilterDialog} applyFilters={applyFilters}/>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton
                            color="error"
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete the selected Luises?')) {
                                    // Add logic to delete selected Luises
                                }
                            }}
                        >
                            <IconTrash width="18"/>
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
};

const LuiseTableList = () => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('dateVente');
    const [selected, setSelected] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentLuise, setCurrentLuise] = useState(null);
    const [filters, setFilters] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLuises({page, search, rowsPerPage, ...filters, order, orderBy}));
    }, [dispatch, search, page, rowsPerPage, filters, order, orderBy]);

    const handleExport = () => {
        dispatch(exportLuises(filters));
    };

    const getLuises = useSelector((state) => state.luiseReducer.luises);
    const totalLuises = useSelector((state) => state.luiseReducer.total);

    const [rows, setRows] = useState(getLuises);

    useEffect(() => {
        setRows(getLuises);
    }, [getLuises]);

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
            const total = getLuises.map((n) => parseFloat(n.benefice)).reduce((o, n) => o + n);
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
            const total = getLuises.filter((luise) => newSelected.includes(luise.id))
                .map((n) => parseFloat(n.benefice)).reduce((o, n) => o + n);
            setTotalPrice(total);
        } else {
            setTotalPrice(null);
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

    const handleEditDialogOpen = (luise) => {
        setCurrentLuise(luise);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setCurrentLuise(null);
        setEditDialogOpen(false);
    };

    const handleDelete = (id) => {
        dispatch(deleteLuise(id));
    };



    const submitFilterDialog = (formData) => {
        setFilters(formData);

    };

    return (
        <Paper sx={{width: '100%', mb: 2}}>
            <EnhancedTableToolbar handleExport={handleExport} numSelected={selected.length} handleSearch={handleSearch} search={search} applyFilters={submitFilterDialog}/>
            <TableContainer>
                <Table
                    sx={{minWidth: 750}}
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
                        {rows.map((row) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${row.id}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
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
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="left">{row.piece}</TableCell>
                                    <TableCell align="left">{row.type}</TableCell>
                                    <TableCell align="right">{row.nombre}</TableCell>
                                    <TableCell align="right">{row.prix_achat_total}</TableCell>
                                    <TableCell align="right">{row.prix_achat}</TableCell>
                                    <TableCell align="right">{row.prix_vente_unitaire}</TableCell>
                                    <TableCell align="left">{format(new Date(row.date_vente), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell align="right">{row.prix_vente}</TableCell>
                                    <TableCell align="right">{row.benefice}</TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" alignItems="center" gap="8px">
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEditDialogOpen(row)}
                                                >
                                                    <IconEdit width="18"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(row.id)}
                                                >
                                                    <IconTrash width="18"/>
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
                count={totalLuises}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {currentLuise && (
                <EditLuiseDialog open={editDialogOpen} onClose={handleEditDialogClose} luiseData={currentLuise}/>
            )}
        </Paper>
    );
};

export default LuiseTableList;
