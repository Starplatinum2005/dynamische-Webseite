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
        <img className="logo" src="/logo.png" alt="Taucher" />
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
            <li><Link to="/Buchung#Schnuppertauchen">Schnuppertauchen</Link></li>
            <li><Link to="/Buchung#Delfintauchen">Delfintauchen</Link></li>
            <li><Link to="/Buchung#Korallentauchen">Korallentauchen</Link></li>
            <li><Link to="/Buchung#Tauchschein">Tauchschein</Link></li>
            <li><Link to="/Buchung#Höhlentauchen">Höhlentauchen</Link></li>
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
    <Link to="/loggedin" className='span'>Willkommen, {username}!</Link>
  ) : (
<Link to="/login" aria-label="LogIn" style={{ fontSize: '1.5rem', color: '#3498db' }}>
  👤
</Link>
  )}
</li>

      </ul>
    </nav>
  );
}