import React from 'react';
import ReactDOM from 'react-dom/client';

import ToiletsProvider from './context/toiletContext/toiletsContext';
import App from './App';
import './index.css';
import makeServer from './mock-api/server';

if (
  process.env.NODE_ENV === 'development' &&
  typeof makeServer === 'function'
) {
  makeServer(); // For people following the tutorial
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToiletsProvider>
      <App />
    </ToiletsProvider>
  </React.StrictMode>
);
