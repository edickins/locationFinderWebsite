import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onMenuButtonClick: () => void;
};

function Header({ onMenuButtonClick }: Props) {
  const { search } = useLocation();

  return (
    <header
      className='fixed top-0 z-10 w-full border-b-2 border-solid border-white border-opacity-30 bg-light-panel dark:bg-dark-panel'
      id='header-container'
    >
      <section className='mx-auto  max-w-6xl p-2 md:px-4'>
        <div className='flex items-center  justify-between'>
          <h1 className='xs:text-sm xs:font-normal text-sm  dark:text-dark-secondary-color md:text-xl md:font-semibold'>
            BRIGHTON & HOVE WC WAYFINDER
          </h1>
          <div
            className='button relative cursor-pointer  dark:text-dark-primary-color md:hidden '
            id='hamburger-button'
          >
            <button
              type='button'
              onClick={onMenuButtonClick}
              className='text-sm'
            >
              MENU <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        <nav
          className='hidden items-center justify-between md:flex md:justify-start md:gap-4'
          aria-label='main navigation'
        >
          <NavLink to={`/${search}`}>home</NavLink>
          <NavLink to={`toilets/${search}`}>toilets</NavLink>
          <NavLink to={`help/${search}`}>help</NavLink>
          <NavLink to={`about/${search}`}>about</NavLink>
        </nav>
      </section>
    </header>
  );
}

export default Header;
