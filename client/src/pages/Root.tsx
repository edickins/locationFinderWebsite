import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Root() {
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-black dark:text-white'>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
