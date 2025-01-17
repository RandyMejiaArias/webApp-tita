import { useMemo } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { useAuthStore } from "../../store/auth/auth.store";

export const LoginPage = () => {

  const userStatus = useAuthStore(state => state.status);
  const errorMessage = useAuthStore(state => state.errorMessage);

  const loginUser = useAuthStore(state => state.loginUser);

  const isAuthenticating = useMemo(() => userStatus === "checking", [userStatus]);

  const handleLogin = async (event) => {
    const { email, password } = event;
    await loginUser(email, password);
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
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
              <Typography variant="h4">Login</Typography>
            </Stack>
            <Formik 
              initialValues={ {
                email: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email.')
                  .required('Email is required'),
                password: Yup.string()
                  .required('Password is required')
              })}
              onSubmit={ (values, {resetForm}) => {
                handleLogin(values);
                resetForm();
              }}
            >
              { ({ handleChange, handleBlur, values, submitForm, errors, touched, isValid, dirty }) => (
                <Form>
                  <Stack spacing={3}>
                    <TextField 
                      fullWidth
                      name="email"
                      label='Email*'
                      value={values.email}
                      type="email"
                      onChange={handleChange}
                      placeholder="yourname@mail.com"
                      onBlur={handleBlur}
                      helperText={touched.email && errors.email}
                      error={!!(touched.email && errors.email)}
                    />
                    <TextField 
                      fullWidth
                      name="password"
                      label='password*'
                      value={values.password}
                      type="password"
                      onChange={handleChange}
                      placeholder="Your Password"
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={!!(touched.password && errors.password)}
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
                  >Login</Button>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};