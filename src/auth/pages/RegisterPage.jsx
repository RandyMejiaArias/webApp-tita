import { Form, Formik } from "formik";
import { AuthLayout } from "../layout/AuthLayout"
import { Alert, Box, Button, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import * as Yup from 'yup';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

export const RegisterPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth);

  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const handleSignUp = (event) => {
    const { username, email, password } = event;
    dispatch(startCreatingUserWithEmailPassword({username, email, password}));
  }
  return (
    <AuthLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box 
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account?&nbsp;
                <Link
                  component={RouterLink}
                  underline="hover"
                  variant="subtitle2"
                  to="/auth/login"
                >
                  Login
                </Link>
              </Typography>
            </Stack>
            <Formik
              initialValues={ {
                email: '',
                password: '',
                username: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email.'),
                password: Yup.string(),
                username: Yup.string()
              })}
              onSubmit={ (values, {resetForm}) => {
                handleSignUp(values)
                resetForm();
              }}
            >
              { ({ handleChange, handleBlur, values, submitForm, errors, touched, isValid, dirty }) => (
                <Form>
                  <Stack spacing={3}>
                    <TextField 
                      fullWidth
                      name="username"
                      value={values.username}
                      label='Username*'
                      onChange={handleChange}
                      type="text"
                      placeholder="Your name"
                      onBlur={handleBlur}
                      error={!!(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <TextField 
                      fullWidth
                      name="email"
                      value={values.email}
                      label='Email*'
                      onChange={handleChange}
                      type="email"
                      placeholder="yourname@mail.com"
                      onBlur={handleBlur}
                      error={!!(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      fullWidth
                      name="password"
                      value={values.password}
                      label='password*'
                      onChange={handleChange}
                      type="password"
                      placeholder="Your Password"
                      onBlur={handleBlur}
                      error={!!(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Stack>
                  <Typography color="error" variant="body2"
                    sx={{ mt: 3 }}
                  >
                    { errorMessage }
                  </Typography>
                  <Button fullWidth
                    size="large"
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={ submitForm }
                    disabled={ isAuthenticating }
                  >Sign Up</Button>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  )
}