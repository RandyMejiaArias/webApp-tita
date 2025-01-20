import { Avatar, Box, Card, IconButton, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Scrollbar } from "../Scrollbar";
import { Delete, Edit } from "@mui/icons-material";
import { format } from "date-fns";
import { getInitials } from '../../../utils/getInitials'
import { useUsersStore } from "../../../store/user/user.store";

export const UserTable = ({
  count = 0,
  items = [],
  onPageChange = () => {},
  onRowsPerPageChange,
  page = 0,
  rowsPerPage = 0,
  selected = []
}) => {

  const removeUser = useUsersStore(state => state.removeUser);
  const getUsers = useUsersStore(state => state.getUsers);

  const handleEdit = () => {
    console.log(items)
  };

  const handleDelete = async (id) => {
    await removeUser(id);
    await getUsers();
  };


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Is Verified
                </TableCell>
                <TableCell>
                  Signed Up
                </TableCell>
                <TableCell align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { items.map((user) => {
                const isSelected = selected.includes(user._id);

                return (
                  <TableRow 
                    hover
                    key={user._id}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={getInitials(user.name)}>
                          {getInitials(user.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {user.username}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.role[0].name}
                    </TableCell>
                    <TableCell>
                      {user.emailVerified ? 'Verified' : 'Non Verified' }
                    </TableCell>
                    <TableCell>
                      { format(new Date(user.createdAt), 'dd/MM/yyyy') }
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={handleEdit}>
                        <SvgIcon fontSize="small">
                          <Edit />
                        </SvgIcon>
                      </IconButton>
                      <IconButton onClick={ () => handleDelete(user._id)}>
                        <SvgIcon fontSize="small">
                          <Delete color="error" />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  )
}