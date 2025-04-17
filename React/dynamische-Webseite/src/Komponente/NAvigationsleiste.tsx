
import './Navigationsleiste.css'
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <nav className="navbar">
      <Link to="/" aria-label="Startseite">
        <img className="logo" src="/LOGO4.png" alt="Taucher" />
      </Link>

      <ul className="navbar-list">
        <li><Link to="/" aria-label="Startseite">Home</Link></li>
        <li className="dropdown">
          <Link to="/Angebote" className="dropbtn" aria-label="Angebote">Angebote</Link>
          <ul className="dropdown-content">
            <li><Link to="/Angebote">Schnuppertauchen</Link></li>
            <li><Link to="/Angebote">Delfintauchen</Link></li>
            <li><Link to="/Angebote">Korallentauchen</Link></li>
            <li><Link to="/Angebote">Tauchschein</Link></li>
            <li><Link to="/Angebote">Höhlentauchen</Link></li>
          </ul>
        </li>
        <li><Link to="/Shop" aria-label="Shop">Shop</Link></li>
        <li><Link to="/Überuns" aria-label="Über uns">Über Uns</Link></li>
        <li><Link to="/Kontakt" aria-label="Kontakt">Kontakt</Link></li>
      </ul>
    </nav>
  );
}

  
export default Header;