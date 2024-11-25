import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0056b3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#007d99',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      contrastText: '#ffffff',
    },
    success: {
      main: '#388e3c',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffa000',
      contrastText: '#000000',
    },
    info: {
      main: '#0288d1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
    divider: '#e0e0e0',
  },
});

export default theme;
