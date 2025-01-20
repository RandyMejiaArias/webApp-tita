import { Box, Button, Container, Link, SvgIcon, Typography } from "@mui/material"
import { ArrowLeftIcon } from "@mui/x-date-pickers"
import { Link as RouterLink, useParams } from "react-router-dom"

import boxImage from '../../assets/noun-open-box-230203.svg';
import { useEffect } from "react";
import { CheckingAuth } from "../../ui/components/CheckingAuth";
import { useUsersStore } from "../../store/user/user.store";

export const ConfirmUserPage = () => {

  const { token } = useParams();

  const loading = useUsersStore(state => state.loading);
  const error = useUsersStore(state => state.errorMessage);

  const confirmUser = useUsersStore(state => state.confirmUser);

  const handleConfirmUser = async () => {
    await confirmUser(token);
  }

  useEffect(() => {
    handleConfirmUser();
  }, [token])
  
  if(loading)
    return <CheckingAuth />;
  return (
    <Box component="main"
      sx={{
        mt: 5,
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {
            !error ?
              <>
                <Box
                  sx={{
                    mb: 3,
                    textAlign: 'center'
                  }}
                >
                  <img
                    alt="Box Icon"
                    src={boxImage}
                    style={{
                      display: 'inline-block',
                      maxWidth: '100%',
                      width: 400
                    }}
                  />
                </Box>
                <Typography
                  align="center"
                  sx={{ mb: 3 }}
                  variant="h3"
                >
                  Confirm your account
                </Typography>
                <Typography
                  align="center"
                  color="text.secondary"
                  variant="body1"
                >
                  Your account has been verified successfully.
                </Typography>
                <Link
                  component={RouterLink}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowLeftIcon />
                    </SvgIcon>
                  )}
                  sx={{ mt: 3 }}
                  variant="contained"
                  to="/auth/login"
                >
                  Go back to login
                </Link>
              </>
              : <>
                <Box
                  sx={{
                    mb: 3,
                    textAlign: 'center'
                  }}
                >
                  <img
                    alt="Box Icon"
                    src={boxImage}
                    style={{
                      display: 'inline-block',
                      maxWidth: '100%',
                      width: 400
                    }}
                  />
                </Box>
                <Typography
                  align="center"
                  sx={{ mb: 3 }}
                  variant="h3"
                >
                  Error confirming your account
                </Typography>
                <Typography
                  align="center"
                  color="text.secondary"
                  variant="body1"
                >
                  { error }
                </Typography>
                <Button
                  component={Link}
                  href="/"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowLeftIcon />
                    </SvgIcon>
                  )}
                  sx={{ mt: 3 }}
                  variant="contained"
                >
                  Go back to login
                </Button>
              </>
          }
        </Box>
      </Container>
    </Box>
  )
}