import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { nextSnkrTheme } from './nextSnkrTheme';

export const AppTheme = ({ children }) => (
  <ThemeProvider theme={nextSnkrTheme}>
    <CssBaseline />
    { children }
  </ThemeProvider>
)