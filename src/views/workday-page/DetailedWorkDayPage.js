import React, { useState, useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { selectCompanies } from 'src/store/apps/company/companySlice';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom';
import {
  Autocomplete,
  TextField,
  Avatar,
  ListItem,
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  Alert,
  InputAdornment,
  OutlinedInput,
  Fade
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
// Added missing imports:
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { fetchRawAttendances, updateRawAttendance, deleteRawAttendance } from 'src/store/apps/raw-attendance/rawAttendanceSlice';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Workday Details' }
];


const DetailedWorkDayPage = () => {

  // Get workDayID from params
  const { workDayID } = useParams();
  const dispatch = useDispatch();
  const { attendances, loading } = useSelector(state => state.rawAttendance);


  const [companies, setCompanies] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  // State for Edit Modal
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [editForm, setEditForm] = useState({
    status: '',
    notes: '',
    start_at: '',
    end_at: ''
  });

  // State for Delete Confirmation Modal
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [attendanceToDelete, setAttendanceToDelete] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompany(true);
        const data = await selectCompanies();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Changed setLoading to setLoadingCompany
        setLoadingCompany(false);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch raw attendances when workDayID or company changes
  useEffect(() => {
    // Changed companyId to selectedCompany
    if (workDayID && selectedCompany) {
      dispatch(fetchRawAttendances({ companyId: selectedCompany, workDayId: workDayID }));
    }
  }, [dispatch, workDayID, selectedCompany]);


  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const filteredEmployees = attendances.filter(employee =>
    employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  const handleEditClick = (attendance) => {
    setCurrentAttendance(attendance);
    setEditForm({
      status: attendance.status || '',
      notes: attendance.notes || '',
      start_at: attendance.start_at || '',
      end_at: attendance.end_at || ''
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (attendance) => {
    setAttendanceToDelete(attendance);
    setDeleteDialogOpen(true);
  };

  const handleEditSave = async () => {
    await dispatch(updateRawAttendance({ id: currentAttendance.id, data: editForm }));
    setEditDialogOpen(false);
    // Refresh the list with selectedCompany instead of companyId
    dispatch(fetchRawAttendances({ companyId: selectedCompany, workDayId: workDayID }));
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteRawAttendance(attendanceToDelete.id));
    setDeleteDialogOpen(false);
    // Refresh the list with selectedCompany instead of companyId
    dispatch(fetchRawAttendances({ companyId: selectedCompany, workDayId: workDayID }));
  };

  return (
    <PageContainer title="Workday Details">
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Workday Details
          </Typography>
          <Breadcrumb items={BCrumb} />
        </Box>

        <Card sx={{
          mb: 4,
          boxShadow: 3,
          background: 'linear-gradient(145deg, #f0f4ff 30%, #ffffff 90%)',
          position: 'relative',
          overflow: 'visible',
          ':before': {
            content: '""',
            position: 'absolute',
            top: -10,
            left: -10,
            right: -10,
            bottom: -10,
            bgcolor: 'rgba(144, 202, 249, 0.1)',
            borderRadius: 4,
            zIndex: -1
          }
        }}>
          <CardContent>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              transform: 'translateY(-5px)'
            }}>
              <Typography variant="h6" component="h2" sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'primary.dark',
                letterSpacing: '-0.5px'
              }}>
                Select Organization
              </Typography>
              <Box sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.light',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 2
              }}>
                <BusinessIcon fontSize="small" sx={{ color: 'primary.main' }} />
              </Box>
            </Box>

            {loading || loadingCompany ? (
              <Skeleton
                variant="rounded"
                height={56}
                sx={{
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  boxShadow: 1
                }}
              />
            ) : error ? (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: 1,
                  borderLeft: '4px solid',
                  borderColor: 'error.main'
                }}
              >
                <strong>Connection Error:</strong> {error}
              </Alert>
            ) : (
              <FormControl fullWidth>
                <Autocomplete
                  options={companies}
                  getOptionLabel={(option) => option.companyName}
                  value={companies.find(c => c.id === selectedCompany) || null}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      handleCompanyChange({ target: { value: newValue.id } });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search organizations..."
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          borderRadius: 3,
                          bgcolor: 'background.paper',
                          boxShadow: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: 2
                          }
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'primary.main' }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <ListItem
                      {...props}
                      sx={{
                        py: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: stringToColor(option.companyName),
                            width: 40,
                            height: 40,
                            boxShadow: 2,
                            fontSize: '1.2rem',
                            fontWeight: 500
                          }}
                        >
                          {option.companyName[0]}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {option.companyName}
                        </Typography>
                      </Box>
                    </ListItem>
                  )}
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        mt: 1,
                        overflow: 'hidden',
                        '&::-webkit-scrollbar': {
                          width: '8px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                          bgcolor: 'primary.light',
                          borderRadius: 4
                        }
                      }}
                    />
                  )}
                  popupIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: 'primary.main',
                        fontSize: '2rem',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  }
                  sx={{
                    '& .MuiAutocomplete-clearIndicator': {
                      color: 'primary.main'
                    }
                  }}
                />
              </FormControl>
            )}
          </CardContent>
        </Card>

        {selectedCompany && (
          <Fade in={selectedCompany !== ''} timeout={500}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" gutterBottom component="h3">
                    Employee Attendance
                  </Typography>
                  <OutlinedInput
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    sx={{ width: 300 }}
                  />
                </Box>

                {loading ? (
                  <Box sx={{ p: 2 }}>
                    {[...Array(5)].map((_, index) => (
                      <Skeleton key={index} variant="rectangular" height={48} sx={{ mb: 1 }} />
                    ))}
                  </Box>
                ) : (
                  <TableContainer component={Paper} elevation={0}>
                    <Table aria-label="Employee attendance table">
                      <TableHead>
                        <TableRow sx={{
                          backgroundColor: 'primary.main',
                          '& th': {
                            color: 'common.white',
                            fontWeight: 'bold',
                            fontSize: '0.875rem'
                          }
                        }}>
                          <TableCell>Employee Name</TableCell>
                          <TableCell>Position</TableCell>
                          <TableCell>Arrived At</TableCell>
                          <TableCell>Departed At</TableCell>
                          <TableCell align="right">Total Hours</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Notes</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredEmployees.map((employee) => (
                          <TableRow
                            key={employee.id}
                            hover
                            sx={{
                              '&:nth-of-type(even)': { backgroundColor: 'action.hover' },
                              '&:last-child td': { borderBottom: 0 }
                            }}
                          >
                            <TableCell>{employee.employee_name}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.start_at}</TableCell>
                            <TableCell>{employee.end_at}</TableCell>
                            <TableCell align="right">{employee.total_hours}</TableCell>
                            <TableCell>{employee.status}</TableCell>
                            <TableCell>{employee.notes}</TableCell>
                            <TableCell>
                              <Tooltip title="Edit">
                                <IconButton onClick={() => handleEditClick(employee)}>
                                  <EditOutlined />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton onClick={() => handleDeleteClick(employee)}>
                                  <DeleteOutline />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredEmployees.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <SearchIcon />
                                <Typography variant="body1">
                                  No employees found matching your search criteria
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Fade>
        )}
      </Box>
      {/* Edit Attendance Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Attendance Record</DialogTitle>
        <DialogContent>
          <TextField
            label="Start Time"
            type="time"
            value={editForm.start_at}
            onChange={(e) => setEditForm({ ...editForm, start_at: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Time"
            type="time"
            value={editForm.end_at}
            onChange={(e) => setEditForm({ ...editForm, end_at: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Select
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            fullWidth
            margin="dense"
          >
            <MenuItem value="present">Présent</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
            <MenuItem value="malade">Malade</MenuItem>
            <MenuItem value="conge">En congé</MenuItem>
            <MenuItem value="late">En retard</MenuItem>
            <MenuItem value="early_leave">Départ anticipé</MenuItem>
          </Select>
          <TextField
            label="Notes"
            multiline
            rows={4}
            value={editForm.notes}
            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this attendance record?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default DetailedWorkDayPage;