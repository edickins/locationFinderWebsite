import { RouteObject } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import Root from '../pages/Root';
import Home from '../pages/Home';
import Toilets from '../pages/Toilets';

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
        element: <Toilets />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
];

export default routesConfig;
