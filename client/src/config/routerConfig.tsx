import { RouteObject } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import Root from '../pages/Root';
import Home from '../pages/Home';
import Locations from '../pages/Locations';
import About from '../pages/About';
import Help from '../pages/Help';

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
      },
      {
        path: '/help',
        element: <Help />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
];

export default routesConfig;
