import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material'

import bgImage from '../../assets/Recordatorio.jpg';

export const AuthLayout = ({children}) => {
  return (
    <Box component="main" 
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid container sx={{ flex: '1 1 auto', minHeight: '100vh' }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          { children }
        </Grid>

        <Grid container
          lg={6}
          display={{ xs: "none", lg: "flex" }}
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}
        >
        </Grid>
      </Grid>
    </Box>
  )
}