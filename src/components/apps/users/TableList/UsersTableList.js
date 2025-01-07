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
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from 'src/store/apps/users/userSlice';
import { IconSearch, IconTrash, IconEdit } from '@tabler/icons';
import CreateUserDialog from '../../../modals/users/CreateUserDialog/CreateUserDialog';
import EditUserDialog from '../../../modals/users/EditUserDialog/EditUserDialog';

const UsersTableList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const totalUsers = useSelector((state) => state.userReducer.total);
  const loading = useSelector((state) => state.userReducer.loading);

  // Fetch users on component mount or when page/rowsPerPage changes
  useEffect(() => {
    dispatch(fetchUsers({ page: page + 1, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  // Handle search/filter (frontend filtering)
  const filteredUsers = users.filter((user) =>
    user.Username.toLowerCase().includes(search.toLowerCase()) ||
    user.FirstName.toLowerCase().includes(search.toLowerCase()) ||
    user.LastName.toLowerCase().includes(search.toLowerCase())
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to the first page when searching
  };

  // Handle edit button click
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  // Handle delete button click
  const handleDeleteClick = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <Box>
      {/* Toolbar with search and create user button */}
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
          placeholder="Search users"
          size="small"
          onChange={handleSearch}
          value={search}
        />
        <CreateUserDialog />
      </Toolbar>

      {/* Table */}
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
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.ID} hover>
                      <TableCell>{user.ID}</TableCell>
                      <TableCell>{user.FirstName}</TableCell>
                      <TableCell>{user.LastName}</TableCell>
                      <TableCell>{user.Username}</TableCell>
                      <TableCell>{user.Role}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          startIcon={<IconEdit width="18" />}
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          startIcon={<IconTrash width="18" />}
                          onClick={() => handleDeleteClick(user.ID)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit User Dialog */}
      {selectedUser && (
        <EditUserDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          userData={selectedUser}
        />
      )}
    </Box>
  );
};

export default UsersTableList;