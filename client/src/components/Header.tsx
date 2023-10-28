import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='sticky top-0 z-10 border-b-2 border-solid border-white  bg-dark-panel'>
      <section className='mx-auto  max-w-4xl  p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-1xl font-semibold dark:text-dark-primary-color'>
            BRIGHTON & HOVE WC WAYFINDER
          </h1>
          <div
            className='button relative h-8 w-8 cursor-pointer text-2xl dark:text-dark-secondary-color md:hidden'
            id='hamburger-button'
          >
            &#9776;
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
