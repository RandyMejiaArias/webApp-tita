import { Box, Button, Container, SvgIcon, Typography } from "@mui/material"
import { ArrowLeftIcon } from "@mui/x-date-pickers"
import { Link, useNavigate, useParams } from "react-router-dom"

import boxImage from '../../assets/noun-open-box-230203.svg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CheckingAuth } from "../../ui/components/CheckingAuth";
import { startConfirmingUser } from "../../store/user";

export const ConfirmUserPage = () => {

  const { token } = useParams();

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(startConfirmingUser(token));
  }, [dispatch])

  const navigate = useNavigate();
  
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
                <Button
                  onClick={ navigate('auth/login') }
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