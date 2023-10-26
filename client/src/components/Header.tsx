import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='sticky top-0 z-10'>
      <section className='mx-auto  max-w-4xl  p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-medium'>BRIGHTON & HOVE WC WAYFINDER</h1>
          <div
            className='button relative h-8 w-8 cursor-pointer text-2xl md:hidden'
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
          <input
            type='text'
            name='search'
            id='search'
            placeholder='search location...'
            className='rounded-md px-2'
          />
          <button type='button'>filter</button>
          <button type='button'>Find a toilet near me</button>
        </nav>
      </section>
    </header>
  );
}

export default Header;
