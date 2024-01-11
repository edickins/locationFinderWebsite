import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};
function MobileMenu({ isMenuOpen, setIsMenuOpen }: Props) {
  const { search } = useLocation();
  return (
    <div
      className={`fixed inset-x-0 bottom-0 top-12 transition-all
      duration-200 ease-out ${
        isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
      } `}
      id='mobile-menu-container'
    >
      <nav
        className={`h-full w-full
         bg-light-panel-secondary transition-transform duration-500
        ease-in-out dark:bg-black ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-label='main navigation'
        id='mobile-menu-nav'
      >
        <ul className='p-4 px-4 text-center'>
          <li className='my-12 text-3xl'>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to={`/${search}`}
              className={({ isActive }) =>
                isActive
                  ? 'text-light-secondary-color dark:text-dark-secondary-color'
                  : 'text-light-primary-color dark:text-white'
              }
            >
              Toilet Map
            </NavLink>
          </li>
          <li className='my-12 text-3xl'>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to={`/locations${search}`}
              className={({ isActive }) =>
                isActive
                  ? 'text-light-secondary-color dark:text-dark-secondary-color'
                  : 'text-light-primary-color dark:text-white'
              }
            >
              List of Toilets
            </NavLink>
          </li>
          <li className='my-12 text-3xl'>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to={`/help${search}`}
              className={({ isActive }) =>
                isActive
                  ? 'text-light-secondary-color dark:text-dark-secondary-color'
                  : 'text-light-primary-color dark:text-white'
              }
            >
              Help
            </NavLink>
          </li>
          <li className='my-12 text-3xl'>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to={`/about${search}`}
              className={({ isActive }) =>
                isActive
                  ? 'text-light-secondary-color dark:text-dark-secondary-color'
                  : 'text-light-primary-color dark:text-white'
              }
            >
              About Page
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
