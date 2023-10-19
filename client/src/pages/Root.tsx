import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Root() {
  return (
    <div>
      <h1>root</h1>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
