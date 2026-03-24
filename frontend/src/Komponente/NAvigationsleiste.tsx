import './Navigationsleiste.css'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

export function Header() {
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<number | null>(null)
  const [kurse, setKurse] = useState<any[]>([]);

  useEffect(() => {
    const storedUserStr = localStorage.getItem('user');
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUsername(storedUser.vorname);
      setUserRole(storedUser.rolle);
    } else {
      setUsername(null);
      setUserRole(null);
    }
  }, [location]);

  useEffect(() => {
    const loadKurse = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/kurse`);
        if (response.ok) {
          const data = await response.json();
          setKurse(data);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Kurse:', error);
      }
    };
    loadKurse();
  }, []);

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
            {kurse.length > 0 ? (
              kurse.map((kurs) => (
                <li key={kurs.Kurs_ID}>
                  <Link to={`/Buchung#${kurs.Titel}`}>{kurs.Titel}</Link>
                </li>
              ))
            ) : (
              <li><span>Keine Kurse verfügbar</span></li>
            )}
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
        {userRole === 1 && (
          <li>
            <Link
              to="/admin"
              className={`admin-link ${location.pathname === '/admin' ? 'active' : ''}`}
              aria-label="Admin Dashboard"
              title="Admin Dashboard"
            >
              ⚙️ Admin
            </Link>
          </li>
        )}
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