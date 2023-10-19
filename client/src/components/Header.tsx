import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <NavLink to='/'>home</NavLink>
        <NavLink to='toilets'>toilets</NavLink>
      </nav>
    </header>
  );
}

export default Header;
