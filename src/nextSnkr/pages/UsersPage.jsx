import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material"
import { SnkrAppLayout } from "../layout/SnkrAppLayout"
import { Add } from "@mui/icons-material"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSelection } from "../../hooks";
import { UserTable } from "../../ui/components/user/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingUsers } from "../../store/user/thunks";
import { applyPagination } from '../../utils/applyPagination'

const useUsers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
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

  const dispatch = useDispatch();

  const { users, total } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(startLoadingUsers());
  }, [])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const usersToUse = useUsers(users, page, rowsPerPage);
  const usersIds = useUserIds(usersToUse);
  const userSelection = useSelection(usersIds);

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

  return (
    <SnkrAppLayout>
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
                  Customers
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
                >
                  Add
                </Button>
              </div>
            </Stack>

            <UserTable
              count={total}
              items={usersToUse}
              onDeselectAll={userSelection.handleDeselectAll}
              onDeselectOne={userSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={userSelection.handleSelectAll}
              onSelectOne={userSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={userSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </SnkrAppLayout>
  )
}