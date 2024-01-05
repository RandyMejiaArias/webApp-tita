import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Unstable_Grid2 as Grid, Stack, SvgIcon, TextField, Typography } from "@mui/material"
import { SnkrAppLayout } from "../layout/SnkrAppLayout"
import { useDispatch, useSelector } from "react-redux";
import { startLoadingCharacteristics } from "../../store/scoreCharacteristic";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { startLoadingPreferredScore, startSavingPreferredScore } from "../../store/preferredScore/thunks";
import { Delete } from "@mui/icons-material";

export const AccountPage = () => {

  const { email, username, role } = useSelector((state) => state.auth );

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.api);
  const { characteristics } = useSelector(state => state.characteristic );
  const { preferredScores } = useSelector(state => state.preferredScores );

  const [ characteristicsToShow, setCharacteristicsToShow ] = useState([]);

  useEffect(() => {
    dispatch(startLoadingPreferredScore());
    dispatch(startLoadingCharacteristics());
  }, []);

  useEffect(() => {
    const characteristicsFiltered = characteristics.filter(elementA => !preferredScores.some(elementB => elementA._id === elementB.scoreCharacteristic._id));

    setCharacteristicsToShow(characteristicsFiltered);
  }, [characteristics]);

  // TODO: Review method
  useEffect(() => {
    console.log(data?.message)
    if(data?.message) {
      dispatch(startLoadingCharacteristics());
      window.location.reload(false);
    }
  }, [loading]); 

  const handleSubmitScores = (values) => {
    dispatch(startSavingPreferredScore(values));
  }

  return (
    <SnkrAppLayout >
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
                  <Card sx={{ mt: 2 }}>
                    <CardHeader
                      title="Preferenced Score"
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        { preferredScores.map((element) => (
                          <Grid
                            key={element._id}
                            container
                            spacing={3}
                          >
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField 
                                fullWidth
                                size="small"
                                name="scoreCharacteristic"
                                label='scoreCharacteristic'
                                value={element.scoreCharacteristic.name}
                                type="text"
                              />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <Stack spacing={2} alignItems="center" direction="row">
                                <TextField 
                                  fullWidth
                                  size="small"
                                  name="scoreCharacteristic"
                                  label='scoreCharacteristic'
                                  value={element.score}
                                  type="number"
                                />
                                <SvgIcon aria-label="delete">
                                  <Delete />
                                </SvgIcon>
                              </Stack>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                  <Card sx={{ mt: 2 }}>
                    <CardHeader
                      title="Add score to preferences"
                    />
                    <Formik
                      initialValues={{
                        scoreCharacteristic: '',
                        score: 0
                      }}
                      validationSchema={ Yup.object().shape({
                        scoreCharacteristic: Yup.string(),
                        score: Yup.number()
                      })}
                      onSubmit={ (values, {resetForm}) => {
                        handleSubmitScores(values);
                        resetForm();
                      }}
                    >
                      { ({ handleChange, handleBlur, values, submitForm, errors, touched, isValid, dirty }) => (
                        <Form>
                          <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ m: -1.5 }}>
                              <Grid container
                                spacing={3}
                              >
                                <Grid
                                  xs={12}
                                  md={6}
                                >
                                  <TextField 
                                    fullWidth
                                    label="Select characteristic"
                                    name="scoreCharacteristic"
                                    onChange={handleChange}
                                    value={values.scoreCharacteristic}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    onBlur={handleBlur}
                                    helperText={touched.scoreCharacteristic && errors.scoreCharacteristic}
                                    error={!!(touched.scoreCharacteristic && errors.scoreCharacteristic)}
                                  >
                                    <option
                                      value='0'
                                    >
                                    </option>
                                    { characteristicsToShow.map((option) => (
                                      <option
                                        key={option._id}
                                        value={option._id}
                                      >
                                        {option.name}
                                      </option>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  xs={12}
                                  md={6}
                                >
                                  <TextField 
                                    fullWidth
                                    name="score"
                                    label='Score'
                                    value={values.score}
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.score && errors.score}
                                    error={!!(touched.score && errors.score)}
                                  />
                                </Grid>
                              </Grid>
                            </Box>  
                            <Typography 
                              color="error"
                              variant="body2"
                              sx={{ mt: 3 }}
                            >
                              errorMessage 
                            </Typography>
                          </CardContent>
                          <Divider />
                          <CardActions 
                            sx={{ justifyContent: 'flex-end' }}
                          >
                            <Button
                              variant="contained"
                              onClick={ submitForm }
                            >
                              Save Score
                            </Button>
                          </CardActions>
                        </Form>
                      )}
                    </Formik>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </SnkrAppLayout>
  )
}