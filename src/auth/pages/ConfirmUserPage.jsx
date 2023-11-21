import { Box, Button, Container, SvgIcon, Typography } from "@mui/material"
import { ArrowLeftIcon } from "@mui/x-date-pickers"
import { Link, useParams } from "react-router-dom"

import boxImage from '../../assets/noun-open-box-230203.svg';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const ConfirmUserPage = () => {

  const { token } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startConfimingUser(token));
  }, [token])
  
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
        </Box>
      </Container>
    </Box>
  )
}