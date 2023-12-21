import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';

function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <div className='flex w-full flex-col  dark:text-white' id='root-container'>
      <Header onMenuButtonClick={onMenuButtonClick} />
      <Outlet />
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}

export default Root;
