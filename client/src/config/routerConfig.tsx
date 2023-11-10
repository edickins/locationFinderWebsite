import { RouteObject } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import Root from '../pages/Root';
import Home from '../pages/Home';
import Locations from '../pages/Locations';

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/toilets',
        element: <Locations />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
];

export default routesConfig;
