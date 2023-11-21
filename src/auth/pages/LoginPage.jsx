import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../layout/AuthLayout";
import { Alert, Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { Link as RouterLink } from "react-router-dom";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const handleLogin = (event) => {
    const { email, password } = event;
    dispatch(startLoginWithEmailPassword({ email, password }));
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
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account?&nbsp;
                <Link
                  component={RouterLink}
                  underline="hover"
                  variant="subtitle2"
                  to="/auth/register"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Formik 
              initialValues={ {
                email: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email.'),
                password: Yup.string()
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
                  <Alert 
                    color="primary"
                    severity="info"
                    sx={{ mt: 3 }}
                  >
                    <div>
                      As user you can use <b>demo@devias.io</b> and password <b>Password123!</b>
                    </div>
                  </Alert>
                  <Alert 
                    color="primary"
                    severity="info"
                  >
                    <div>
                      As admin you can use <b>demo@devias.io</b> and password <b>Password123!</b>
                    </div>
                  </Alert>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};