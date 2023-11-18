import { Grid, Typography } from "@mui/material"
import { SnkrAppLayout } from "../layout/SnkrAppLayout"

export const Dashboard = () => {
  return (
    <SnkrAppLayout >
      <Grid container spacing={0} sx={{ mb:2 }}>
        <Typography variant="h4" color="primary.main" component="div">
            Dashboard
          </Typography>
      </Grid>
      <Grid 
        container 
        spacing={0} 
        direction='column' 
        alignItems='center' justifyContent='center'
        sx={{ minHeight: 'calc(100vh - 110px)', borderRadius: 4, padding: '32px 64px', border: 'solid 1px #F4F4F4' }}
        className='animate__animated animate__fadeIn animate__faster'
      >
      </Grid>
    </SnkrAppLayout>
  )
}