import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Box,
    TablePagination,
    Toolbar,
    Grid,
    Paper,
    Chip,
    Stack,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceLogs } from 'src/store/apps/attendance/attendanceSlice';
import { DateRangePicker } from 'react-date-range';
import { fr } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DeviceDetailsDialog.css';
import Skeleton from '@mui/material/Skeleton';
import { Search, Devices, SearchOff, FileDownload, Login, Logout, FilterList, Coffee } from '@mui/icons-material';
import { Socket } from 'src/utils/socket';

const DeviceDetailsDialog = ({ open, onClose, deviceData }) => {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.attendanceReducer.logs);
    const total = useSelector((state) => state.attendanceReducer.total);
    const loading = useSelector((state) => state.attendanceReducer.loading);
    const [page, setPage] = useState(0);

    const loadData = () => {
        dispatch(fetchAttendanceLogs({ serial_number: deviceData.SerialNumber, search, filters, page: page + 1, limit: rowsPerPage }));
    };
    const latestLoadData = useRef(loadData);

    useEffect(() => {
        latestLoadData.current = loadData;
    }, [loadData]);

    useEffect(() => {
        const socket = new Socket()
        socket.connect('wss://dev-api.thegamechangercompany.io/hadir-back/ws')

        socket.on('open', (event) => {
            console.log('You say hello...')
        })

        socket.on('message', (event) => {
            if (event.data == "CREATE_ATTENDANCELOG") {
                latestLoadData.current();
            }
        })

        socket.on('close', (event) => {
            console.log('...and I say goodbye!')
        })


        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        if (open) {
            dispatch(fetchAttendanceLogs({ serial_number: deviceData.SerialNumber, search, filters, page: page + 1, limit: rowsPerPage }));
        }
    }, [dispatch, deviceData, open, search, filters, page, rowsPerPage]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleDateRangeChange = (ranges) => {
        const { selection } = ranges;
        setDateRange(selection);
        setFilters({
            ...filters,
            startDate: selection.startDate,
            endDate: selection.endDate
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Devices color="primary" />
                    <Typography variant="h6">Device Details</Typography>
                    {deviceData && <Chip label={deviceData.Name} size="small" />}
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={5} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={12}>
                        <DateRangePicker
                            ranges={[dateRange]}
                            onChange={handleDateRangeChange}
                            locale={fr}
                            rangeColors={['#3f51b5']}
                            inputRanges={[]}
                        />
                    </Grid>
                    {/* Search and Date Filter */}
                    <Grid item xs={12} md={12}>
                        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                            <TextField
                                label="Search logs"
                                placeholder="Search by name, qualification..."
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search size="1.1rem" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ flex: 1 }}
                                size="small"
                            />
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Punch Type</InputLabel>
                                <Select
                                    value={filters.punch || ''}
                                    onChange={(e) => setFilters({ ...filters, punch: e.target.value })}
                                    label="Punch Type"
                                >
                                    <MenuItem value="">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <FilterList fontSize="small" />
                                            <Typography>All Punches</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value="0">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Login fontSize="small" color="success" />
                                            <Typography>Check In</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value="1">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Logout fontSize="small" color="error" />
                                            <Typography>Check Out</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value="5">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Coffee fontSize="small" color="info" />
                                            <Typography>Break In</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value="6">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Coffee fontSize="small" color="warning" />
                                            <Typography>Break Out</Typography>
                                        </Stack>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Table Section */}
                <Paper variant="outlined">
                    <TableContainer>
                        {loading ? (
                            <Box p={2}>
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} height={53} />
                                ))}
                            </Box>
                        ) : logs.length === 0 ? (
                            <Box p={4} textAlign="center">
                                <SearchOff sx={{ fontSize: 48, color: 'text.secondary' }} />
                                <Typography color="text.secondary" mt={2}>
                                    No logs found for the selected criteria
                                </Typography>
                            </Box>
                        ) : (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>FirstName</TableCell>
                                        <TableCell>LastName</TableCell>
                                        <TableCell>Qualification</TableCell>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell align="center">Punch</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {logs.map((log) => (
                                        <TableRow key={log.ID}>
                                            <TableCell>{log.employee_first_name}</TableCell>
                                            <TableCell>{log.employee_last_name}</TableCell>
                                            <TableCell>{log.employee_qualification}</TableCell>
                                            <TableCell>{log.timestamp}</TableCell>
                                            <TableCell>{log.punch === 0 ? "Check IN" : log.punch === 1 ? "Check OUT" : log.punch === 5 ? "Break IN" : "Break OUT"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button
                    variant="contained"
                    startIcon={<FileDownload />}
                    onClick={() => { }}
                >
                    Export Logs
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeviceDetailsDialog;