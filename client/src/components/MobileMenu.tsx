import { NavLink } from 'react-router-dom';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};
function MobileMenu({ isMenuOpen, setIsMenuOpen }: Props) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 top-16 transition-all
      duration-200 ease-out ${
        isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
      } `}
      id='mobile-menu-container'
    >
      <nav
        className={`h-full w-full
         bg-black transition-transform
        duration-500 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-label='main navigation'
        id='mobile-menu-nav'
      >
        <ul className='p-4 px-4 text-center'>
          <li className='my-12 text-3xl'>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to='/'
              className={({ isActive }) =>
                isActive ? 'dark:text-dark-secondary-color' : 'dark:text-white'
              }
            >
              Toilet Map
            </NavLink>
          </li>
          <li className='my-12 text-3xl'>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to='toilets'
              className={({ isActive }) =>
                isActive ? 'dark:text-dark-secondary-color' : 'dark:text-white'
              }
            >
              List of Toilets
            </NavLink>
          </li>
          <li className='my-12 text-3xl'>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to='contact'
              className={({ isActive }) =>
                isActive ? 'dark:text-dark-secondary-color' : 'dark:text-white'
              }
            >
              Contact Page
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
