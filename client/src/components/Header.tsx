import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='sticky top-0 z-10'>
      <section className='mx-auto flex max-w-4xl items-center justify-between p-4'>
        <h1 className='text-3xl font-medium'>BRIGHTON & HOVE WC WAYFINDER</h1>
        <nav>
          <NavLink to='/'>home</NavLink>
          <NavLink to='toilets'>toilets</NavLink>
        </nav>
      </section>
    </header>
  );
}

export default Header;
