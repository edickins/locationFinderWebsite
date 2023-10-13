import React from 'react';
import ReactDOM from 'react-dom/client';
import ToiletsProvider from './context/toiletContext/toiletsContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToiletsProvider>
      <App />
    </ToiletsProvider>
  </React.StrictMode>
);
