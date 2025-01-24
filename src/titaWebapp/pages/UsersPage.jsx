import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Stack, SvgIcon, TextField, Typography } from "@mui/material"
import { AppLayout } from "../layout/AppLayout"
import { Add } from "@mui/icons-material"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSelection } from "../../hooks";
import { UserTable } from "../../ui/components/user/UserTable";
import { applyPagination } from '../../utils/applyPagination'
import { useUsersStore } from "../../store/user/user.store";

const useUsers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useUserIds = (users) => {
  return useMemo(
    () => {
      return users.map((user) => user._id);
    },
    [users]
  );
};

export const UsersPage = () => {

  const users = useUsersStore(state => state.users);
  const total = useUsersStore(state => state.total);
  
  const getUsers = useUsersStore(state => state.getUsers);
  const createUser = useUsersStore(state => state.createUser);
  const updateUser = useUsersStore(state => state.updateUser);

  const loadingUsers = async () => {
    await getUsers();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await createUser(formJson);
    loadingUsers();
    handleModalCreateClose();
  }

  const handleSubmitEditUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await updateUser(selectedUser._id, formJson);
    loadingUsers();
    handleModalEditClose();
  }

  useEffect(() => {
    loadingUsers();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const usersToUse = useUsers(users, page, rowsPerPage);
  const usersIds = useUserIds(usersToUse);
  const userSelection = useSelection(usersIds);
  const [selectedUser, setSelectedUser] = useState(null);

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleModalCreateOpen = () => {
    setModalCreateOpen(true);
  };

  const handleModalCreateClose = () => {
    setModalCreateOpen(false);
  };

  const handleModalEditOpen = (user) => {
    setSelectedUser(user);
    setModalEditOpen(true);
  };

  const handleModalEditClose = () => {
    setModalEditOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({
      ...selectedUser,
      [name]: value
    });
  };

  return (
    <AppLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Users
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <Add />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={ handleModalCreateOpen }
                >
                  Add
                </Button>
              </div>
            </Stack>

            <UserTable
              count={total}
              items={usersToUse}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={userSelection.selected}
              handleEdit={handleModalEditOpen}
            />
          </Stack>

          <Dialog
            open={modalCreateOpen}
            onClose={handleModalCreateClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmit
            }}>
              <DialogTitle>Add User</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="fullname"
                  name="fullname"
                  label="Full Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalCreateClose}>Cancel</Button>
                <Button type="submit">Create User</Button>
              </DialogActions>
          </Dialog>
          
          <Dialog
            open={modalEditOpen}
            onClose={handleModalEditClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmitEditUser
            }}>
              <DialogTitle>Edit User</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedUser?.username}
                  onChange={handleChange}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="fullname"
                  name="fullname"
                  label="Full Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedUser?.fullname}
                  onChange={handleChange}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={selectedUser?.email}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalEditClose}>Cancel</Button>
                <Button type="submit">Edit User</Button>
              </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </AppLayout>
  )
}