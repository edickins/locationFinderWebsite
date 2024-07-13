import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

import LocationsProvider from './context/locationContext/locationsContext';
import makeServer from './mock-api/server';
import routesConfig from './config/routerConfig';
import FacilitiesProvider from './context/facilitiesContext/facilitiesContext';
import SearchResultsProvider from './context/searchContext/searchContext';

if (
  import.meta.env.MODE === 'development' &&
  typeof makeServer === 'function' &&
  import.meta.env.VITE_APP_ENV !== 'LOCAL_MONGODB'
) {
  makeServer(); // For people following the tutorial
}

const router = createBrowserRouter(routesConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocationsProvider>
      <FacilitiesProvider>
        <SearchResultsProvider>
          <RouterProvider router={router} />
        </SearchResultsProvider>
      </FacilitiesProvider>
    </LocationsProvider>
  </React.StrictMode>
);
