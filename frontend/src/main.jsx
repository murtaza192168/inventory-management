import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';  // Import ThemeProvider
import theme from './theme';  // Import your custom theme
// Import bootstrap globally
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>  {/* Apply the custom theme */}
      <App />
    </ThemeProvider>
  </StrictMode>,
);
