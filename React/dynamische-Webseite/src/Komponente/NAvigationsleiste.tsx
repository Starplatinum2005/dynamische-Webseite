import './Navigationsleiste.css'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


export function Header() {
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    setUsername(storedUser);
  }, [location]);
  
  return (
    <nav className="navbar">
      <Link to="/" aria-label="Startseite">
        <img className="logo" src="/LOGO6.png" alt="Taucher" />
      </Link>

      <ul className="navbar-list">
        <li>
          <Link 
            to="/" 
            aria-label="Startseite"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li className="dropdown">
          <Link 
            to="/Angebote" 
            className={`dropbtn ${location.pathname === '/Angebote' ? 'active' : ''}`}
            aria-label="Angebote"
          >
            Angebote
          </Link>
          <ul className="dropdown-content">
            <li><Link to="/Angebote">Schnuppertauchen</Link></li>
            <li><Link to="/Angebote">Delfintauchen</Link></li>
            <li><Link to="/Angebote">Korallentauchen</Link></li>
            <li><Link to="/Angebote">Tauchschein</Link></li>
            <li><Link to="/Angebote">Höhlentauchen</Link></li>
          </ul>
        </li>
        <li>
          <Link 
            to="/Shop" 
            className={location.pathname === '/Shop' ? 'active' : ''}
            aria-label="Shop"
          >
            Shop
          </Link>
        </li>
        <li>
          <Link 
            to="/uberuns" 
            className={location.pathname === '/uberuns' ? 'active' : ''}
            aria-label="Über uns"
          >
            Über Uns
          </Link>
        </li>
        <li>
          <Link 
            to="/Kontakt" 
            className={location.pathname === '/Kontakt' ? 'active' : ''}
            aria-label="Kontakt"
          >
            Kontakt
          </Link>
        </li>
        <li>
  {username ? (
    <span className='span'>Willkommen, {username}!</span>
  ) : (
    <Link to="/login" aria-label="LogIn">Log In</Link>
  )}
</li>

      </ul>
    </nav>
  );
}