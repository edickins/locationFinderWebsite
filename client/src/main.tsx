import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

import LocationsProvider from './context/locationContext/locationsContext';
import makeServer from './mock-api/server';
import routesConfig from './config/routerConfig';

if (
  process.env.NODE_ENV === 'development' &&
  typeof makeServer === 'function'
) {
  makeServer(); // For people following the tutorial
}

const router = createBrowserRouter(routesConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocationsProvider>
      <RouterProvider router={router} />
    </LocationsProvider>
  </React.StrictMode>
);
