import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes';
import './styles/index.css'; // Add global styles if needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
