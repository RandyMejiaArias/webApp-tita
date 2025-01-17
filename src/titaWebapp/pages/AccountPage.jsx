import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Unstable_Grid2 as Grid, Stack, SvgIcon, TextField, Typography } from "@mui/material"
import { AppLayout } from "../layout/AppLayout"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Delete } from "@mui/icons-material";

export const AccountPage = () => {

  const { email, username, role } = useSelector((state) => state.auth );

  return (
    <AppLayout >
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Grid 
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Avatar
                          sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                          }}
                        >UP</Avatar>
                        <Typography 
                          gutterBottom
                          variant="h5"
                        >
                          { username }
                        </Typography>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          { role }
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        fullWidth
                        variant="text"
                      >
                        Upload picture
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <Card>
                    <CardHeader 
                      title="Profile"
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid
                          container
                          spacing={3}
                        >
                          <Grid
                            xs={12}
                            md={6}
                          >
                            <TextField
                              fullWidth
                              label="Username"
                              name="username"
                            />
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                          >
                            <TextField
                              fullWidth
                              label="Email"
                              name="email"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions
                      sx={{ justifyContent: 'flex-end' }}
                    >
                      <Button variant="contained">
                        Save details
                      </Button>
                    </CardActions>
                  </Card>
                  
                  <Divider />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </AppLayout>
  )
}