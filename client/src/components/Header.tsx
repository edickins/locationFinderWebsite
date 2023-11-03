import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header
      className='fixed top-0 z-10 w-full border-b-2 border-solid border-white  bg-dark-panel'
      id='header-container'
    >
      <section className='mx-auto  max-w-4xl  p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-1xl font-semibold dark:text-dark-secondary-color'>
            BRIGHTON & HOVE WC WAYFINDER
          </h1>
          <div
            className='button relative  cursor-pointer text-2xl dark:text-dark-primary-color md:hidden'
            id='hamburger-button'
          >
            <i className='fa-solid fa-bars h-full w-full'></i>
          </div>
        </div>
        <nav
          className='hidden items-center justify-between md:flex'
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
