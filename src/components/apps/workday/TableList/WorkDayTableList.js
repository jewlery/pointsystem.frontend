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
import { fetchWorkDays, deleteWorkDay } from 'src/store/apps/workday/workdaySlice';
import { IconSearch, IconTrash, IconEdit } from '@tabler/icons';
import CreateWorkDayDialog from '../../../modals/workday/CreateWorkDayDialog';
import EditWorkDayDialog from '../../../modals/workday/EditWorkDayDialog';

const WorkDayTableList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedWorkDay, setSelectedWorkDay] = useState(null);

    const dispatch = useDispatch();
    const workdays = useSelector((state) => state.workdayReducer.workdays);
    const totalWorkDays = useSelector((state) => state.workdayReducer.total);
    const loading = useSelector((state) => state.workdayReducer.loading);

    useEffect(() => {
        dispatch(fetchWorkDays({ page: page + 1, rowsPerPage, search }));
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

    const handleEditClick = (workday) => {
        setSelectedWorkDay(workday);
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (workdayId) => {
        if (window.confirm('Are you sure you want to delete this workday?')) {
            dispatch(deleteWorkDay(workdayId));
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
                    placeholder="Search workdays"
                    size="small"
                    onChange={handleSearch}
                    value={search}
                />
                <CreateWorkDayDialog />
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
                                    <TableCell>Date</TableCell>
                                    <TableCell>Day Type</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workdays
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((workday) => (
                                        <TableRow key={workday.ID} hover>
                                            <TableCell>{workday.ID}</TableCell>
                                            <TableCell>{workday.date}</TableCell>
                                            <TableCell>{workday.dayType}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleEditClick(workday)}
                                                    >
                                                        <IconEdit width="18" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDeleteClick(workday.ID)}
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
                    count={totalWorkDays}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {selectedWorkDay && (
                <EditWorkDayDialog
                    open={openEditDialog}
                    onClose={() => setOpenEditDialog(false)}
                    workdayData={selectedWorkDay}
                />
            )}
        </Box>
    );
};

export default WorkDayTableList;