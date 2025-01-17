import React from 'react'
import { styled } from '@mui/material/styles';
import { AppLayout } from './AppLayout'
import { Grid, Typography } from '@mui/material'

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const ReportLayout = ({children}) => {
  return (
    <AppLayout >
      <Grid container spacing={0} sx={{ mb:2, ml:5 }}>
        <Typography variant="h4" color="primary.main" component="div">
          Reporte
        </Typography>
      </Grid>
      <Grid 
        container 
        spacing={0} 
        direction='column' 
        alignItems='center' justifyContent='center'
        sx={{ minHeight: 'calc(100vh - 110px)', borderRadius: 4 }}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <LayoutContainer>
          { children }
        </LayoutContainer>
      </Grid>
    </AppLayout>
  )
}
