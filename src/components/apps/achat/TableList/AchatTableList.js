import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
import {useSelector, useDispatch} from 'react-redux';
import {deleteAchat, exportAchats, fetchAchats} from 'src/store/apps/achat/achatSlice';
import {IconSearch, IconTrash, IconFilter, IconEdit, IconPlus, IconTableExport} from '@tabler/icons';
import CreateAchatDialog from '../../../modals/achat/CreateAchatDialog/CreateAchatDialog';
import EditAchatDialog from '../../../modals/achat/EditAchatDialog/EditAchatDialog'; // Import the EditAchatDialog
import CustomCheckbox from '../../../forms/theme-elements/CustomCheckbox';
import moment from "moment";
import ActionButtons from "./ActionButtons";
import {format} from "date-fns";
import {alpha} from "@mui/material/styles";
import FilterAchatDialog from "../../../modals/achat/FilterAchatDialog/FilterAchatDialog";

const headCells = [
    {id: 'date', label: 'Date'},
    {id: 'designation', label: 'Designation'},
    {id: 'poids', label: 'Poids'},
    {id: 'prixAg', label: 'Prix A/g'},
    {id: 'prixTotal', label: 'Prix Total'},
    {id: 'modeReglement', label: 'Mode Règlement'},
    {id: 'client', label: 'Client'},
    {id: 'type', label: 'Type'},
    {id: 'action', label: 'Action'},
];

function EnhancedTableHead({order, orderBy, onRequestSort, numSelected, rowCount, onSelectAllClick}) {
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
                        inputProps={{'aria-label': 'select all achats'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

const EnhancedTableToolbar = ({numSelected, handleSearch, search, onSubmitFilter, handleExport}) => {
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
                        placeholder="Rechercher un achat"
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
                        Export Achats
                    </Box>
                </Button>

                <CreateAchatDialog/>
                <FilterAchatDialog
                    open={openFilterDialog}
                    onClose={handleCloseFilterDialog}
                    onSubmitFilter={onSubmitFilter}/>
                <Tooltip title="Filter list">
                    <IconButton color="primary" onClick={openFilterDialogHandler}>
                        <IconFilter size="1.2rem" icon="filter"/>
                    </IconButton>
                </Tooltip>
                {numSelected > 0 && (
                    <Tooltip title="Delete">
                        <IconButton color="error">
                            <IconTrash width="18"/>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

        </Toolbar>
    );
};
EnhancedTableToolbar.propTypes = {
    search: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

const AchatTableList = () => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedAchat, setSelectedAchat] = useState(null);
    const [selected, setSelected] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [filters, setFilters] = useState({});

    const dispatch = useDispatch();
    const achats = useSelector((state) => state.achatReducer.achats);
    const total_achats = useSelector((state) => state.achatReducer.total);


    const handleExport = () => {
        dispatch(exportAchats(filters));
    };

    useEffect(() => {
        setLoading(true);
        dispatch(fetchAchats({page, filters: {rowsPerPage, search, ...filters}, order, orderBy}))
            .finally(() => setLoading(false));
    }, [dispatch, page, rowsPerPage, search, filters, order, orderBy]);

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


    const handleEditClick = (achat) => {
        setSelectedAchat(achat);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedAchat(null);
    };

    const handleDeleteClick = (achatId) => {
        if (window.confirm('Are you sure you want to delete this achat?')) {
            dispatch(deleteAchat(achatId));
        }
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = achats.map((n) => n.id);
            const total = achats.map((n) => parseFloat(n.prixTotal)).reduce((o, n) => o + n);
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
        if (id === selectedAchat?.id)
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
        if (newSelected.length > 0) {
            const total = achats.filter((achat) => newSelected.includes(achat.id))
                .map((n) => parseFloat(n.prixTotal)).reduce((o, n) => o + n);
            setTotalPrice(total);
        }
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const submitFilterDialog = (formData) => {
        setFilters(formData);

    };

    return (
        <Box>
            <EnhancedTableToolbar search={search} handleSearch={handleSearch}
                                  numSelected={selected.length} handleExport={handleExport}
                                  onSubmitFilter={submitFilterDialog}/>
            <Paper variant="outlined" sx={{mx: 2, mt: 1}}>
                <TableContainer>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                            <CircularProgress/>
                        </Box>
                    ) : (
                        <Table aria-labelledby="tableTitle">
                            {selected.length > 0 && <caption>The total selected rows: <b>{totalPrice} DH</b></caption>}
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                                numSelected={selected.length}
                                rowCount={achats.length}
                            />
                            <TableBody>
                                {achats.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    return (
                                        <TableRow
                                            key={row.id}
                                            hover
                                            onClick={(event) => handleClick(row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <CustomCheckbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': row.id}}
                                                />
                                            </TableCell>
                                            <TableCell
                                                type="date">{format(new Date(row.date), 'yyyy-MM-dd')}</TableCell>
                                            <TableCell>{row.designation}</TableCell>
                                            <TableCell>{row.poids}</TableCell>
                                            <TableCell>{row.prixAg}</TableCell>
                                            <TableCell>{row.prixTotal}</TableCell>
                                            <TableCell>{row.modeReglement}</TableCell>
                                            <TableCell>{row.client}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>
                                                <ActionButtons
                                                    row={row}
                                                    onEdit={handleEditClick}
                                                    onDelete={handleDeleteClick}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                                {achats.length <= 0 && (
                                    <TableRow style={{height: 53 * 5}}>
                                        <TableCell colSpan={headCells.length} align="center">
                                            <Typography variant="body2">Aucune donnée disponible</Typography>
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
                    count={total_achats}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* EditAchatDialog */}
            {selectedAchat && (
                <EditAchatDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    achatData={selectedAchat}
                />
            )}

        </Box>
    );
};

export default AchatTableList;
