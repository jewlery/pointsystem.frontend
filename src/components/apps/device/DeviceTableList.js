import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    TextField,
    InputAdornment,
    Paper,
    CircularProgress,
    Button,
    Tooltip,
    IconButton,
    TablePagination
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { IconSearch, IconTrash, IconEdit, IconEye } from '@tabler/icons';
import { fetchDevices, deleteDevice } from 'src/store/apps/device/deviceSlice';
import EditDeviceDialog from './EditDeviceDialog';
import DeviceDetailsDialog from './DeviceDetailsDialog';

const DeviceTableList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const dispatch = useDispatch();
    const devices = useSelector((state) => state.deviceReducer.devices);
    const total = useSelector((state) => state.deviceReducer.total);
    const loading = useSelector((state) => state.deviceReducer.loading);

    useEffect(() => {
        dispatch(fetchDevices({ page: page + 1, rowsPerPage, search }));
    }, [dispatch, page, rowsPerPage, search]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditClick = (device) => {
        setSelectedDevice(device);
        setOpenEditDialog(true);
    };

    const handleDetailsClick = (device) => {
        setSelectedDevice(device);
        setOpenDetailsDialog(true);
    };

    const handleDeleteClick = (deviceId) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            dispatch(deleteDevice(deviceId));
        }
    };

    return (
        <Box>
            <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
                <Toolbar>
                    <TextField
                        placeholder="Search devices..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconSearch size="1.1rem" />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </Toolbar>
                
                <TableContainer>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Serial Number</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {devices.map((device) => (
                                    <TableRow key={device.ID}>
                                        <TableCell>{device.ID}</TableCell>
                                        <TableCell>{device.SerialNumber}</TableCell>
                                        <TableCell>{device.Name}</TableCell>
                                        <TableCell>{device.CompanyID}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton color="primary" onClick={() => handleEditClick(device)}>
                                                    <IconEdit width="18" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Details">
                                                <IconButton color="secondary" onClick={() => handleDetailsClick(device)}>
                                                    <IconEye width="18" />
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
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {selectedDevice && (
                <EditDeviceDialog
                    open={openEditDialog}
                    onClose={() => setOpenEditDialog(false)}
                    deviceData={selectedDevice}
                />
            )}

            {selectedDevice && (
                <DeviceDetailsDialog
                    open={openDetailsDialog}
                    onClose={() => setOpenDetailsDialog(false)}
                    deviceData={selectedDevice}
                />
            )}
        </Box>
    );
};

export default DeviceTableList;