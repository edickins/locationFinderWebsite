import { NavLink } from 'react-router-dom';

type Props = {
  onMenuButtonClick: () => void;
};

function Header({ onMenuButtonClick }: Props) {
  return (
    <header
      className='fixed top-0 z-10 w-full border-b-2 border-solid border-white bg-light-panel dark:bg-dark-panel'
      id='header-container'
    >
      <section className='mx-auto  max-w-6xl p-2 md:p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='xs:text-sm xs:font-normal text-xs  dark:text-dark-secondary-color md:text-xl md:font-semibold'>
            BRIGHTON & HOVE WC WAYFINDER
          </h1>
          <div
            className='button relative cursor-pointer text-xl dark:text-dark-primary-color md:hidden '
            id='hamburger-button'
          >
            <button type='button' onClick={onMenuButtonClick}>
              <i className='fa-solid fa-bars h-full w-full' />
            </button>
          </div>
        </div>
        <nav
          className='hidden items-center justify-between md:flex md:justify-start md:gap-4'
          aria-label='main navigation'
        >
          <NavLink to='/'>home</NavLink>
          <NavLink to='toilets'>toilets</NavLink>
          <NavLink to='contact'>contact</NavLink>
        </nav>
      </section>
    </header>
  );
}

export default Header;
