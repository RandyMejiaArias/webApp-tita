import { Box, Button, Card, CardContent, Container, Divider, Grid, InputAdornment, OutlinedInput, Stack, SvgIcon, Typography } from "@mui/material"
import { SnkrAppLayout } from "../layout/SnkrAppLayout"
import { Add, Delete, Edit, Search } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { startLoadingCharacteristics } from "../../store/scoreCharacteristic"

export const ScoringCharacteristicPage = () => {

  const dispatch = useDispatch();

  const { characteristics } = useSelector(state => state.characteristic );

  useEffect(() => {
    dispatch(startLoadingCharacteristics());
  }, [])

  return (
    <SnkrAppLayout>
      <Box component='main'
        sx={{
          flexGrow: 1,
          py:8
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
                <Typography variant="h4">Scoring Characteristics</Typography>
              </Stack>
              <div>
                <Button 
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <Add />
                    </SvgIcon>
                  )}
                  variant="contained"
                >Add</Button>
              </div>
            </Stack>
            {/* <Card sx={{ p:2 }}>
              <OutlinedInput 
                defaultValue=""
                fullWidth
                placeholder="Search characteristic"
                sx={{ maxWidth: 500 }}
                startAdornment={(
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <Search />
                    </SvgIcon>
                  </InputAdornment>
                )}
              />
            </Card> */}
            <Grid container spacing={3}>
              { characteristics.map( (characterisctic) => (
                <Grid 
                  sx={{ mb: 2 }}
                  xs={12}
                  md={6}
                  lg={4}
                  key={characterisctic._id}
                >
                  <Card 
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    <CardContent>
                      <Typography
                        align="center"
                        gutterBottom
                        variant="h5"
                      >
                        {characterisctic.name}
                      </Typography>
                      {/* <Typography
                        align="center"
                        variant="body1"
                      >
                        description
                      </Typography> */}
                    </CardContent>
                    <Box sx={{ flexGrow: 1}} />
                    <Divider />
                    <Stack 
                      alignItems="center"
                      direction="row"
                      justifyContent="space-between"
                      spacing={2}
                      sx={{ p: 2 }}
                    >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                        onClick={()=> console.log('edit')}
                        >
                        <SvgIcon
                          color="action"
                          fontSize="small"
                          >
                          <Edit />
                        </SvgIcon>
                        <Typography
                          color="text.secondary"
                          display="inline"
                          variant="body2"
                          >
                          Edit
                        </Typography>
                      </Stack>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                        onClick={()=> console.log('delete')}
                      >
                        <SvgIcon
                          color="error"
                          fontSize="small"
                        >
                          <Delete />
                        </SvgIcon>
                        <Typography
                          color="error"
                          display="inline"
                          variant="body2"
                        >
                          Delete
                        </Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </SnkrAppLayout>
  )
}